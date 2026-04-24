/**
 * 通道选择器：根据**统计版本**与**运行环境**返回最合适的 Channel。
 *
 * 选择规则（与私有版 `__STAT_VERSION__` 行为对齐）：
 *   - `version === '2'`：优先 cloud；cloud 不可用时**降级**到 http（私有版无降级，
 *     直接 console.error 后丢数据；本实现选择降级以提高可用性，仍保留警告日志）。
 *   - `version === '1'`：始终 http。
 *
 * 选择是**幂等无副作用**的：调用方每次发送前调用 `selectChannel()` 即可，
 * channel 自身不缓存可用性，便于运行时（例如 uniCloud 初始化后）即时生效。
 */

import { logger } from '../../infra/logger'

import type { Channel } from '../types'

export type StatVersion = '1' | '2'

export interface SelectChannelOptions {
  /** 当前统计版本，默认 '2'。 */
  version?: StatVersion
  /** 1.0 通道实例（必须由调用方传入，selector 不负责构造）。 */
  http: Channel
  /** 2.0 通道实例（version === '2' 时必传；否则可省略）。 */
  cloud?: Channel
  /**
   * 当 cloud 不可用时是否回退到 http。
   * 默认 `true`（提高可用性）。设为 `false` 时返回 undefined，调用方应丢弃当批数据。
   */
  fallbackToHttp?: boolean
}

/**
 * 根据策略挑选当前应使用的 channel。
 *
 * @returns 选中的 channel；若没有可用通道返回 `undefined`。
 */
export function selectChannel(opts: SelectChannelOptions): Channel | undefined {
  const version: StatVersion = opts.version ?? '2'
  const fallback = opts.fallbackToHttp !== false

  if (version === '1') {
    return opts.http.available() ? opts.http : undefined
  }

  if (opts.cloud && opts.cloud.available()) return opts.cloud

  if (!fallback) {
    logger.warn(
      '[uni-stat] cloud channel unavailable and fallback disabled, drop batch'
    )
    return undefined
  }

  if (opts.http.available()) {
    logger.warn(
      '[uni-stat] cloud channel unavailable, fallback to http channel'
    )
    return opts.http
  }

  logger.warn('[uni-stat] no channel available')
  return undefined
}
