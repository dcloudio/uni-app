/**
 * Collector：domain 与 pipeline 的编排层。
 *
 * 职责（与 runtime/lifecycleHooks 配合）：
 *   1. `report(input)`：把外部输入（lt + 事件上下文）转成 statData 并入队；
 *      自动填充 session 快照、seq、pid（首次新会话事件携带）。
 *   2. `flush(force?)`：从 queue 取快照 → serializer → 选 channel → 发送；
 *      成功调用 `visit.commit(now)`；失败 `queue.rollback` + `retry.persist`。
 *   3. `recoverRetry()`：冷启动时由 runtime 触发，把上次未送达的 payload 重试。
 *
 * 设计原则：
 *   - 依赖全部注入；本模块不直接 import 任何 adapter，便于测试与多端切换。
 *   - 不持有业务字段；所有 statData 字段由 `domain/statData.builder` 拼装。
 *   - 错误吞掉 + 日志：collector 层异常**不应**抛回到生命周期回调，避免污染业务页面。
 */

import {
  logCollect,
  logNoChannel,
  logRecoverItem,
  logRecoverStart,
  logReportFailure,
  logReportStart,
  logReportSuccess,
} from '../infra/debugLog'
import { logger } from '../infra/logger'
import { tryRun } from '../infra/safe'

import type { Bucket } from './queue'
import type { Channel, ReportPayload } from './types'
import type { EventContext, StatData } from '../domain/statData'
import type { LTValue } from '../domain/eventTypes'
import type { SessionSnapshot } from '../domain/session/machine'

/** 外部传入的事件输入；与 EventContext 同构，但 lt 必填、t/session/seq/pid 由 collector 填。 */
export interface ReportInput
  extends Omit<EventContext, 't' | 'session' | 'pid'> {
  lt: LTValue
  /** 可选覆盖：不传则用 deps.nowSec()。 */
  t?: number
}

export interface CollectorDeps {
  /** 构建 statData。 */
  builder: { build: (ctx: EventContext) => StatData }
  /** 队列。 */
  queue: {
    enqueue: (data: StatData) => void
    flush: () => Bucket | undefined
    rollback: (snapshot: Bucket) => void
    shouldFlush: (force?: boolean) => boolean
  }
  /** 序列化器。 */
  serializer: { handleData: (bucket: Bucket) => string }
  /** 通道选择（每次发送前重新选，避免缓存可用性）。 */
  selectChannel: () => Channel | undefined
  /** 重试落盘。 */
  retry: {
    persist: (payload: ReportPayload) => string | undefined
    loadAll: () => ReportPayload[]
    ack: (id: string) => void
    markAttempt?: (id: string) => void
  }
  /** 访问字段 commit/rollback；由 collector 在 ack 后调用。 */
  visit: {
    commitVisitOnAck: (now: number) => void
    rollbackPendingVisit: () => void
  }
  /** 会话操作。 */
  session: {
    getSnapshot: () => SessionSnapshot | null
    nextSeq: () => number
    consumePrevId: () => string | undefined
  }
  /** 报文版本。 */
  config: { usv: string }
  /** ms 时间戳。 */
  nowMs: () => number
  /** 秒时间戳。 */
  nowSec: () => number
  /** 生成 payload _id 的可选函数；缺省用 'p-<base36(now)>-<rand4>'。 */
  genPayloadId?: () => string
}

export interface CollectorAPI {
  /** 入队一条事件；若达到 flush 阈值，自动触发非强制 flush。 */
  report: (input: ReportInput) => void
  /** 取队列快照并发送。 */
  flush: (force?: boolean) => Promise<void>
  /** 冷启续传未送达的 retry payload。 */
  recoverRetry: () => Promise<void>
}

/**
 * 默认 payload id 生成；与 retry.ts 的 genId 风格一致但前缀不同，便于日志区分。
 */
function defaultGenPayloadId(nowMs: number): string {
  return (
    'p-' + nowMs.toString(36) + '-' + Math.random().toString(36).slice(2, 6)
  )
}

/**
 * 构建 collector。返回 API 对象，所有方法绑定 deps 闭包。
 */
export function createCollector(deps: CollectorDeps): CollectorAPI {
  /**
   * 构造 EventContext 并入队。
   *
   * pid 仅在 `consumePrevId` 命中时附加（即新会话第一条事件）；其它事件 pid 留空。
   */
  function report(input: ReportInput): void {
    tryRun(() => {
      const t = typeof input.t === 'number' ? input.t : deps.nowSec()
      const snap = deps.session.getSnapshot()
      let sessionForCtx: SessionSnapshot | undefined
      if (snap) {
        const seq = deps.session.nextSeq()
        sessionForCtx = Object.assign({}, snap, { seq })
      }
      const pid = deps.session.consumePrevId()
      const ctx: EventContext = Object.assign({}, input, {
        t,
        session: sessionForCtx,
        pid,
      }) as EventContext
      const data = deps.builder.build(ctx)
      deps.queue.enqueue(data)
      logCollect(data)
      if (deps.queue.shouldFlush()) {
        flush(false).catch((e) =>
          logger.warn('[uni-stat] auto-flush failed', e)
        )
      }
    }, undefined as void)
  }

  /**
   * 真正发送：取快照、序列化、挑通道、发送、根据结果 commit/rollback/persist。
   *
   * @param force 强制 flush（忽略节流阈值）。
   */
  async function flush(force = false): Promise<void> {
    if (!deps.queue.shouldFlush(force)) return
    const snapshot = deps.queue.flush()
    if (!snapshot) return

    const channel = deps.selectChannel()
    if (!channel) {
      logger.warn('[uni-stat] no channel available, rollback batch')
      logNoChannel({ bucket: snapshot })
      deps.queue.rollback(snapshot)
      return
    }

    const requests = deps.serializer.handleData(snapshot)
    const payload: ReportPayload = {
      usv: deps.config.usv,
      t: deps.nowSec(),
      requests,
      _id: (deps.genPayloadId ?? (() => defaultGenPayloadId(deps.nowMs())))(),
    }

    // 统计本批事件数与计时基准；用于 success / failure 日志的"用时 / 条数"展示。
    let count = 0
    for (const lt of Object.keys(snapshot)) {
      const arr = snapshot[lt]
      if (Array.isArray(arr)) count += arr.length
    }
    const startMs = deps.nowMs()
    logReportStart({
      channel: channel.name,
      bucket: snapshot,
      payloadId: payload._id,
    })

    try {
      await channel.send(payload)
      tryRun(
        () => deps.visit.commitVisitOnAck(deps.nowSec()),
        undefined as void
      )
      logReportSuccess({
        channel: channel.name,
        count,
        elapsedMs: deps.nowMs() - startMs,
        payloadId: payload._id,
      })
    } catch (e) {
      logger.warn('[uni-stat] channel send failed; persist for retry', e)
      tryRun(() => deps.visit.rollbackPendingVisit(), undefined as void)
      const id = deps.retry.persist(payload)
      if (!id) {
        logger.warn('[uni-stat] retry.persist returned no id, drop batch')
      }
      logReportFailure({
        channel: channel.name,
        count,
        elapsedMs: deps.nowMs() - startMs,
        error: e,
        payloadId: payload._id,
        persistedId: id,
      })
    }
  }

  /**
   * 把上次进程留在 storage 中的 retry 队列依次重放。
   *
   * 串行执行，失败的条目保留在队列里（不动 _id），调用方会在下次冷启再次重放。
   */
  async function recoverRetry(): Promise<void> {
    const items = deps.retry.loadAll()
    if (items.length === 0) return
    const channel = deps.selectChannel()
    if (!channel) {
      logger.warn('[uni-stat] recoverRetry: no channel available')
      return
    }
    logRecoverStart(items.length)
    let i = 0
    for (const payload of items) {
      i++
      try {
        await channel.send(payload)
        if (payload._id) deps.retry.ack(payload._id)
        logRecoverItem({
          index: i,
          total: items.length,
          payloadId: payload._id,
          ok: true,
        })
      } catch (e) {
        if (payload._id && deps.retry.markAttempt) {
          deps.retry.markAttempt(payload._id)
        }
        logger.warn(
          '[uni-stat] recoverRetry item failed, will retry next launch',
          e
        )
        logRecoverItem({
          index: i,
          total: items.length,
          payloadId: payload._id,
          ok: false,
          error: e,
        })
      }
    }
  }

  return { report, flush, recoverRetry }
}
