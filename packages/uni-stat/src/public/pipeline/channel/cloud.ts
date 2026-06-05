/**
 * 2.0 通道：uniCloud importObject 上报。
 *
 * 与私有版协议 1:1：
 *   `uni.__stat_uniCloud_space.importObject('uni-stat-receiver', { customUI: true }).report(payload)`
 *
 * 与私有版差异（修复点）：
 *   - 私有版 `sendRequest` 仅在 1.0 通道有 `_retry` 重试，2.0 通道**完全没有重试**，
 *     云函数偶发抖动会直接丢数据。本实现统一接入 `withRetry`（指数退避）。
 *   - 私有版直接读全局 `uni.__stat_uniCloud_space`，无法测试。本实现支持依赖注入
 *     `uniCloudSpace`（测试） / `getUniCloudSpace()`（运行时）。
 *   - `available()` 在 `space.importObject` 不可用时返回 false，调用方据此决定是否
 *     回退到 1.0 通道（由 selector 决策，本通道自身不做回退）。
 */

import { CLOUD_MAX_RETRIES, RETRY_BASE_DELAY_MS } from '../../config'
import { logger } from '../../infra/logger'
import { resolveUniRuntime } from '../../infra/uniRuntime'
import { withRetry } from '../../infra/safe'

import type { Channel, ReportPayload } from '../types'

/** uniCloud space 的最小化接口（只需要 importObject）。 */
interface UniCloudSpace {
  importObject: (
    name: string,
    opts?: { customUI?: boolean }
  ) => UniCloudReceiver
}

/** uni-stat-receiver 云对象暴露的方法。 */
interface UniCloudReceiver {
  report: (payload: ReportPayload) => Promise<unknown>
}

/**
 * 解析当前可用的 uniCloud space。
 *
 * 优先级：opts.uniCloudSpace > uni.__stat_uniCloud_space（`uni` 解析见 `infra/uniRuntime`）。
 * 都不可用返回 undefined，由 `available()` / `send()` 自行处理。
 */
/**
 * 校验云对象返回值是否表示业务失败。**只识别 uniCloud 标准失败约定，默认成功**，
 * 以避免把成功返回误判为失败而触发无谓重试：
 *   - `success === false`（显式布尔失败）
 *   - `errCode` 为非 0 的 number（uniCloud 云对象错误码约定；0 / 缺省 = 成功）
 *
 * **刻意不判断通用 `code` 字段**：部分接口用 `code: 200` 表示成功，若按「非 0 即失败」
 * 处理会把成功误判为失败、误入重试队列。未知返回形态一律视为成功（保守）。
 *
 * 命中失败约定时抛错，交由 `withRetry` / collector 走重试链路。
 */
function assertCloudResultOk(res: unknown): void {
  if (!res || typeof res !== 'object') return
  const r = res as Record<string, unknown>
  if (r.success === false) {
    throw new Error('cloud receiver reported success=false')
  }
  if (typeof r.errCode === 'number' && r.errCode !== 0) {
    throw new Error('cloud receiver reported errCode=' + String(r.errCode))
  }
}

function resolveSpace(injected?: UniCloudSpace): UniCloudSpace | undefined {
  if (injected) return injected
  const raw = resolveUniRuntime()
  const u =
    raw != null && typeof raw === 'object'
      ? (raw as { __stat_uniCloud_space?: UniCloudSpace })
      : undefined
  return u?.__stat_uniCloud_space
}

interface CloudChannelOptions {
  /** 显式注入 uniCloud space（测试用）。 */
  uniCloudSpace?: UniCloudSpace
  /** 云对象名称，默认 'uni-stat-receiver'，多租户可覆盖。 */
  receiverName?: string
  /** 总重试次数（含首次）。 */
  maxRetries?: number
  /** 注入 sleep（测试用，避免 fake timer）。 */
  sleep?: (ms: number) => Promise<void>
}

export function createCloudChannel(opts: CloudChannelOptions = {}): Channel {
  const receiverName = opts.receiverName ?? 'uni-stat-receiver'
  const maxRetries = opts.maxRetries ?? CLOUD_MAX_RETRIES

  function getReceiver(): UniCloudReceiver | undefined {
    const space = resolveSpace(opts.uniCloudSpace)
    if (!space || typeof space.importObject !== 'function') return undefined
    try {
      return space.importObject(receiverName, { customUI: true })
    } catch (e) {
      logger.warn('[uni统计 2.0] cloud importObject threw', e)
      return undefined
    }
  }

  function once(payload: ReportPayload): Promise<void> {
    const receiver = getReceiver()
    if (!receiver || typeof receiver.report !== 'function') {
      return Promise.reject(new Error('uniCloud space unavailable'))
    }
    return Promise.resolve(receiver.report(payload)).then((res) => {
      // 云对象未 throw 但**业务结果显式失败**时，仍按失败处理以触发重试，
      // 避免"resolve 即成功"漏掉服务端拒收。仅识别明确的失败约定，默认视为成功，
      // 防止把未知返回形态误判为失败（保守）。
      assertCloudResultOk(res)
    })
  }

  return {
    name: '2.0',
    available(): boolean {
      const space = resolveSpace(opts.uniCloudSpace)
      return !!(space && typeof space.importObject === 'function')
    },
    async send(payload: ReportPayload): Promise<void> {
      try {
        await withRetry(() => once(payload), {
          times: maxRetries,
          baseDelayMs: RETRY_BASE_DELAY_MS,
          sleep: opts.sleep,
        })
      } catch (e) {
        logger.warn('[uni统计 2.0] 统计上报失败（云函数已重试）', e)
        throw e
      }
    },
  }
}
