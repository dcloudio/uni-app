/**
 * Collector：domain 与 pipeline 的编排层。
 *
 * 职责（与 runtime/lifecycleHooks 配合）：
 *   1. `report(input)`：把外部输入（lt + 事件上下文）转成 statData 并入队；
 *      自动填充 session 快照、seq（仅本地状态使用，不再上行）。
 *   2. `flush(force?)`：从 queue 取快照 → serializer → 选 channel → 发送；
 *      成功调用 `visit.commit(now)`；失败 `queue.rollback` + `retry.persist`。
 *   3. `recoverRetry()`：冷启动时由 runtime 触发，把上次未送达的 payload 重试。
 *
 * 设计原则：
 *   - 依赖全部注入；本模块不直接 import 任何 adapter，便于测试与多端切换。
 *   - 不持有业务字段；所有 statData 字段由 `domain/statData.builder` 拼装。
 *   - 错误吞掉 + 日志：collector 层异常**不应**抛回到生命周期回调，避免污染业务页面。
 */

import { BATCH_MAX_EVENTS, BATCH_REQUESTS_MAX_BYTES } from '../config'
import {
  logCollect,
  logNoChannel,
  logRecoverItem,
  logRecoverStart,
  logReportFailureReason,
  logReportStart,
  logReportSummary,
} from '../infra/debugLog'
import { logger } from '../infra/logger'
import { omitEmptyStringFieldsForUpload } from '../infra/omitEmptyStringFields'
import { tryRun } from '../infra/safe'

import { handleDataChunked } from './serializer'
import { isPermanentChannelError } from './types'

import { LT } from '../domain/eventTypes'

import type { Bucket } from './queue'
import type { Channel, ReportPayload } from './types'
import type { EventContext, StatData } from '../domain/statData'
import type { LTValue } from '../domain/eventTypes'
import type { SessionSnapshot } from '../domain/session/machine'

/** 外部传入的事件输入；与 EventContext 同构，但 lt 必填、t/session 由 collector 填。 */
export interface ReportInput extends Omit<EventContext, 't' | 'session'> {
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
  /** 切片阈值；缺省走 config 默认值。 */
  batchLimits?: { maxEvents?: number; maxBytes?: number }
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
    /**
     * 刷新 `lastActive`（前台无操作超时计时器）。可选：缺省时不刷新（兼容旧测试桩）。
     * collector 在收到用户主动行为事件（lt=21 自定义事件 / 拦截器事件）时调用，
     * 使「前台无操作超时（cst=3）」与文档「无任何 page/event 触达」语义一致。
     */
    touch?: (now: number) => void
  }
  /** 报文版本。 */
  config: { usv: string }
  /** 发送前补齐运行时字段；用于避免安装/入队早于 App 原生渠道就绪。 */
  resolveUploadFields?: () => Partial<StatData>
  /** ms 时间戳。 */
  nowMs: () => number
  /** 秒时间戳。 */
  nowSec: () => number
  /** 生成 payload _id 的可选函数；缺省用 'p-<base36(now)>-<rand4>'。 */
  genPayloadId?: () => string
  /**
   * 进程内**首次**自动 flush（`report` → `shouldFlush`）延迟毫秒数。
   * 仅微信小程序 preload 验证用；`flush(true)` 不受此延迟。`0` 表示不延迟。
   */
  firstFlushDeferMs?: number
  /**
   * 可选：发送前网络门闸。返回 true 表示当前无网，本轮 flush / recoverRetry 应延后，
   * **不**从 queue 取快照，等待 `onNetworkOnline` 后再冲刷。
   * 由 runtime/networkGate 注入；缺省视为有网（兼容旧测试）。
   */
  isNetworkOffline?: () => Promise<boolean>
}

export interface CollectorAPI {
  /** 入队一条事件；若达到 flush 阈值，自动触发非强制 flush。 */
  report: (input: ReportInput) => void
  /** 取队列快照并发送。 */
  flush: (force?: boolean) => Promise<void>
  /** 冷启续传未送达的 retry payload。 */
  recoverRetry: () => Promise<void>
  /**
   * 释放内部资源（取消尚未触发的延迟首 flush 定时器）。
   *
   * 由 `StatApp.uninstall` 在卸载 / 热重载 / 测试 teardown 时调用，避免延迟定时器
   * 在 collector 已被丢弃后仍 fire（幽灵 flush，闭包持有旧 deps）。
   */
  destroy: () => void
}

/**
 * 默认 payload id 生成；与 retry.ts 的 genId 风格一致但前缀不同，便于日志区分。
 */
function defaultGenPayloadId(nowMs: number): string {
  return (
    'p-' + nowMs.toString(36) + '-' + Math.random().toString(36).slice(2, 6)
  )
}

export function createCollector(deps: CollectorDeps): CollectorAPI {
  /** 是否已完成进程内首次 flush（含延迟触发的那一次）。 */
  let firstFlushDone = false
  /** 已安排的延迟 flush 定时器，避免重复 schedule。 */
  let deferredFlushTimer: ReturnType<typeof setTimeout> | null = null
  /** 合并冷启动与网络恢复同时触发的续传，避免同一 payload 重复发送。 */
  let recoveringRetry: Promise<void> | undefined

  /** 取消已安排的延迟首 flush（`flush(true)` 等显式调用前使用）。 */
  function cancelDeferredFlush(): void {
    if (deferredFlushTimer == null) return
    clearTimeout(deferredFlushTimer)
    deferredFlushTimer = null
  }

  /**
   * `report` 达到阈值后的自动 flush 入口；仅此处做冷启动延迟（方案 C）。
   */
  function triggerAutoFlush(): void {
    const deferMs = Math.max(0, Math.floor(deps.firstFlushDeferMs ?? 0))
    if (!firstFlushDone && deferMs > 0) {
      if (deferredFlushTimer != null) return
      deferredFlushTimer = setTimeout(() => {
        deferredFlushTimer = null
        firstFlushDone = true
        void flushImpl(false).catch((e) =>
          logger.warn('[uni统计 2.0] auto-flush failed', e)
        )
      }, deferMs)
      return
    }

    firstFlushDone = true
    void flushImpl(false).catch((e) =>
      logger.warn('[uni统计 2.0] auto-flush failed', e)
    )
  }

  /**
   * 构造 EventContext 并入队。
   *
   * 不再附加 pid（上一会话 sid）：参数文档无该字段，新会话信息由 lt=1 自身的
   * `sid / cst / fvts / lvts / tvc` 表达。
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
      // 用户主动行为事件（lt=21：自定义事件 / login / pay / share 拦截器）刷新
      // 前台无操作计时器，避免用户持续操作却无翻页时被误判「无操作超时」开新会话（cst=3）。
      // 仅 lt=21 视为「用户触达」；lt=1/3/11/31/101 由会话状态机自身管理。
      if (snap && input.lt === LT.Event && deps.session.touch) {
        deps.session.touch(t)
      }
      const ctx: EventContext = Object.assign({}, input, {
        t,
        session: sessionForCtx,
      }) as EventContext
      const data = deps.builder.build(ctx)
      // 调试日志打印完整对象（含空串）；入队发送侧去掉 '' 键以缩短 image URL
      logCollect(data)
      deps.queue.enqueue(omitEmptyStringFieldsForUpload(data))
      if (deps.queue.shouldFlush()) {
        triggerAutoFlush()
      }
    }, undefined as void)
  }

  /**
   * flush 前补运行时字段。
   *
   * 典型场景：App 端首个 Launch 事件入队时 `plus.runtime.channel` 暂不可读，
   * 但真正发送前已经就绪；此时应以发送前的原生运行时值覆盖本批事件的 `ch`。
   */
  function applyUploadFields(bucket: Bucket): void {
    const fields = deps.resolveUploadFields ? deps.resolveUploadFields() : {}
    const keys = Object.keys(fields).filter((key) => {
      const v = fields[key]
      return v !== '' && v !== undefined && v !== null
    })
    if (keys.length === 0) return
    for (const lt of Object.keys(bucket)) {
      const list = bucket[lt]
      if (!Array.isArray(list)) continue
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j]
          item[key] = fields[key]
        }
      }
    }
  }

  function applyUploadFieldsToRequests(requests: string): string {
    const fields = deps.resolveUploadFields ? deps.resolveUploadFields() : {}
    const keys = Object.keys(fields).filter((key) => {
      const v = fields[key]
      return v !== '' && v !== undefined && v !== null
    })
    if (keys.length === 0) return requests
    try {
      const events = JSON.parse(requests)
      if (!Array.isArray(events)) return requests
      for (let i = 0; i < events.length; i++) {
        const item = events[i]
        if (!item || typeof item !== 'object') continue
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j]
          item[key] = fields[key]
        }
      }
      return JSON.stringify(events)
    } catch {
      return requests
    }
  }

  function applyUploadFieldsToPayload(payload: ReportPayload): ReportPayload {
    const requests = applyUploadFieldsToRequests(payload.requests)
    if (requests === payload.requests) return payload
    return Object.assign({}, payload, { requests })
  }

  /**
   * 真正发送：取快照、序列化、挑通道、按双阈值切片、串行发送，根据结果 commit/persist。
   *
   * 切片策略（修复 image url too long 死循环）：
   *   - 用 `handleDataChunked(snapshot, { maxEvents, maxBytes })` 把整桶切成 N 份；
   *   - 单片失败：永久错（`PermanentChannelError`）→ 直接丢弃，不 persist、不影响其他片；
   *     非永久错 → 调用 `retry.persist`，下次冷启 `recoverRetry` 重放该片。
   *   - **任意片失败** → 不 commit visit；**全部片成功** → commit 一次。
   *     切片场景下 `lt=1` 必定落在第一片（serializer 已按 `LT_ORDER` 排序），
   *     若需要更精细的"首批成功就 commit"，下一步迭代再做。
   *   - 通道不可用：依旧整桶 rollback 回 queue（与切片前行为一致）。
   *
   * @param force 强制 flush（忽略节流阈值）。
   */
  async function flushImpl(force = false): Promise<void> {
    if (!deps.queue.shouldFlush(force)) return
    // 无网：不摘队列，等网络恢复后再 flush（公有版门闸）
    if (deps.isNetworkOffline) {
      let offline = false
      try {
        offline = await deps.isNetworkOffline()
      } catch {
        offline = false
      }
      if (offline) {
        logger.warn('[uni统计 2.0] 当前无网络，延后 flush')
        return
      }
    }
    const snapshot = deps.queue.flush()
    if (!snapshot) return

    applyUploadFields(snapshot)

    const channel = deps.selectChannel()
    if (!channel) {
      logger.warn('[uni统计 2.0] 无可用上报线路，本批已回滚队列')
      logNoChannel({ bucket: snapshot })
      deps.queue.rollback(snapshot)
      return
    }

    // 切片阈值 = min(全局配置, 通道物理上限)
    //   - 全局：BATCH_REQUESTS_MAX_BYTES（业务可调）
    //   - 通道：image GET URL 经 encodeURIComponent 膨胀，原文不能按 URL 上限直接用
    //     → 由 image 通道 maxRequestBytes() 反推（见 image.ts）
    // 这样 100 条事件在 image 通道下不会再切出"原文 4KB / encoded 7.5KB"超长片。
    const globalMaxBytes =
      deps.batchLimits?.maxBytes ?? BATCH_REQUESTS_MAX_BYTES
    const channelMaxBytes =
      typeof channel.maxRequestBytes === 'function'
        ? channel.maxRequestBytes()
        : Number.POSITIVE_INFINITY
    const limits = {
      maxEvents: deps.batchLimits?.maxEvents ?? BATCH_MAX_EVENTS,
      maxBytes: Math.min(globalMaxBytes, channelMaxBytes),
    }
    const chunks = handleDataChunked(snapshot, limits)
    if (chunks.length === 0) {
      // 快照已被 flush() 从队列摘除，但切片结果为空（极端：桶内全是空数组 key，
      // 或所有事件 JSON.stringify 失败）。若直接 return 会**静默丢数**，故回滚回队列等待下次。
      logger.warn('[uni统计 2.0] flush 切片结果为空，已回滚队列', snapshot)
      deps.queue.rollback(snapshot)
      return
    }

    const startMs = deps.nowMs()
    let totalCount = 0
    for (const lt of Object.keys(snapshot)) {
      const arr = snapshot[lt]
      if (Array.isArray(arr)) totalCount += arr.length
    }
    logReportStart({ channel: channel.name, bucket: snapshot })

    // 切片是适配 image URL 长度限制 / 全局 batch 字节阈值的内部分批策略，业务方
    // 不应感知。统计维度统一为**事件数**：成功片累计 okEvents、失败片累计 failedEvents
    // + per-slice logReportFailure（保留原因）；末尾由 logReportSummary 输出统一汇总。
    // visit 字段（fvts/lvts/tvc）只随 lt=1 上行，而 serializer 已按 LT_ORDER 把 lt=1
    // 排到最前 → 必定落在第一片（chunks[0]）。因此「访问是否被服务端接收」只取决于
    // 第一片是否成功，与后续 lt=21/31 等切片成败无关。
    //   - 桶内有 lt=1：以 chunks[0] 成功与否决定 commit / rollback（部分成功也可 commit，
    //     避免后续片失败把已被接收的访问回滚，造成本地与服务端口径偏差）。
    //   - 桶内无 lt=1：visit pending 本就为空，commit/rollback 均为 noop；沿用「全部成功才 commit」
    //     的旧语义，保持既有行为与测试稳定。
    const hasLaunch =
      Array.isArray(snapshot['1']) && (snapshot['1'] as unknown[]).length > 0
    let okEvents = 0
    let failedEvents = 0
    let allOk = true
    let firstChunkOk = true
    for (let i = 0; i < chunks.length; i++) {
      const requests = chunks[i]
      const payload: ReportPayload = {
        usv: deps.config.usv,
        t: deps.nowSec(),
        requests,
        _id: (deps.genPayloadId ?? (() => defaultGenPayloadId(deps.nowMs())))(),
      }
      const sliceEvents = countEvents(requests)
      try {
        await channel.send(payload)
        okEvents += sliceEvents
      } catch (e) {
        allOk = false
        if (i === 0) firstChunkOk = false
        failedEvents += sliceEvents
        if (isPermanentChannelError(e)) {
          // 永久错：丢弃本片，不 persist、不污染下次冷启
          logger.warn(
            '[uni统计 2.0] 统计上报失败（本批已丢弃，不可重试）',
            e,
            'sliceBytes=' + requests.length
          )
          logReportFailureReason({ error: e, persistedId: undefined })
          continue
        }
        logger.warn('[uni统计 2.0] 统计上报失败（已暂存，下次启动自动重试）', e)
        const id = deps.retry.persist(payload)
        if (!id) {
          logger.warn(
            '[uni统计 2.0] 统计暂存重试失败（无 retryId），本批已丢弃'
          )
        }
        logReportFailureReason({ error: e, persistedId: id })
      }
    }

    const visitAccepted = hasLaunch ? firstChunkOk : allOk
    if (visitAccepted) {
      tryRun(
        () => deps.visit.commitVisitOnAck(deps.nowSec()),
        undefined as void
      )
    } else {
      tryRun(() => deps.visit.rollbackPendingVisit(), undefined as void)
    }
    // 单批最终汇总：业务方视角只看到"成功/失败/部分失败"，不暴露切片实现。
    // 文案见 debugLog.ts#logReportSummary。
    logReportSummary({
      channel: channel.name,
      okCount: okEvents,
      failedCount: failedEvents,
      elapsedMs: deps.nowMs() - startMs,
    })
  }

  /** 估算一片的事件数（容错：解析失败按 0 计）。仅供日志展示。 */
  function countEvents(requests: string): number {
    try {
      const arr = JSON.parse(requests)
      return Array.isArray(arr) ? arr.length : 0
    } catch {
      return 0
    }
  }

  /**
   * 把上次进程留在 storage 中的 retry 队列依次重放。
   *
   * 串行执行，失败的条目保留在队列里（不动 _id），调用方会在下次冷启再次重放。
   */
  async function recoverRetryImpl(): Promise<void> {
    if (deps.isNetworkOffline) {
      let offline = false
      try {
        offline = await deps.isNetworkOffline()
      } catch {
        offline = false
      }
      if (offline) {
        logger.warn('[uni统计 2.0] 当前无网络，延后续传重试')
        return
      }
    }
    const items = deps.retry.loadAll()
    if (items.length === 0) return
    const channel = deps.selectChannel()
    if (!channel) {
      logger.warn('[uni统计 2.0] 续传重试跳过：当前无可用上报线路')
      return
    }
    logRecoverStart(items.length)
    let i = 0
    for (const payload of items) {
      i++
      const uploadPayload = applyUploadFieldsToPayload(payload)
      try {
        await channel.send(uploadPayload)
        if (payload._id) deps.retry.ack(payload._id)
        logRecoverItem({
          index: i,
          total: items.length,
          payloadId: payload._id,
          ok: true,
        })
      } catch (e) {
        // 永久错：直接 ack 删除死信，避免下次冷启再次重放再次失败
        if (isPermanentChannelError(e)) {
          if (payload._id) deps.retry.ack(payload._id)
          logger.warn(
            '[uni统计 2.0] 续传重试失败（不可重试，已从队列移除）',
            e,
            'id=' + payload._id
          )
          logRecoverItem({
            index: i,
            total: items.length,
            payloadId: payload._id,
            ok: false,
            error: e,
          })
          continue
        }
        if (payload._id && deps.retry.markAttempt) {
          // markAttempt 内部超过 maxAttempts 会自动 ack 兜底（参见 retry.ts）
          deps.retry.markAttempt(payload._id)
        }
        logger.warn('[uni统计 2.0] 续传重试失败（保留队列，下次启动再试）', e)
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

  function recoverRetry(): Promise<void> {
    if (recoveringRetry) return recoveringRetry
    const current = recoverRetryImpl()
    recoveringRetry = current
    const clear = (): void => {
      if (recoveringRetry === current) recoveringRetry = undefined
    }
    void current.then(clear, clear)
    return current
  }

  /**
   * 对外 flush：显式调用（含 `flush(true)`）立即发送，并取消尚未触发的延迟首 flush。
   */
  async function flush(force = false): Promise<void> {
    cancelDeferredFlush()
    firstFlushDone = true
    return flushImpl(force)
  }

  /** 取消延迟首 flush 定时器，防止 collector 被弃后仍触发幽灵 flush。 */
  function destroy(): void {
    cancelDeferredFlush()
    // 置为「已完成首 flush」，即便有残留闭包再次调用 triggerAutoFlush 也不会重排定时器。
    firstFlushDone = true
  }

  return { report, flush, recoverRetry, destroy }
}
