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
 * 优先级：opts.uniCloudSpace > globalThis.uni.__stat_uniCloud_space。
 * 都不可用返回 undefined，由 `available()` / `send()` 自行处理。
 */
function resolveSpace(injected?: UniCloudSpace): UniCloudSpace | undefined {
  if (injected) return injected
  const u = (
    globalThis as unknown as {
      uni?: { __stat_uniCloud_space?: UniCloudSpace }
    }
  ).uni
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
      logger.warn('[uni-stat] cloud importObject threw', e)
      return undefined
    }
  }

  function once(payload: ReportPayload): Promise<void> {
    const receiver = getReceiver()
    if (!receiver || typeof receiver.report !== 'function') {
      return Promise.reject(new Error('uniCloud space unavailable'))
    }
    return Promise.resolve(receiver.report(payload)).then(() => undefined)
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
        logger.warn('[uni-stat] cloud channel send failed after retries', e)
        throw e
      }
    },
  }
}
