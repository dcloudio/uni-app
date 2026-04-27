/**
 * 通道选择器：根据**统计版本**与**运行环境**返回最合适的 Channel。
 *
 * 选择规则（公有版默认 image）：
 *   - `version === 'image'`（默认）：优先 image；image 不可用时按 fallback 决策走 http；
 *     image 通道未注入 → 静默走 http（公有版默认场景）。
 *   - `version === '2'`：优先 cloud；cloud 不可用时按 fallback 决策走 http（私有版兼容）。
 *   - `version === '1'`：始终 http。
 *
 * 注意：
 *   - 公有版**不会**主动构造 cloud channel（StatApp 仅在 version='2' 才创建），
 *     因此默认运行路径不会再触发"cloud channel unavailable"警告。
 *   - 选择是**幂等无副作用**的：调用方每次发送前调用 `selectChannel()` 即可，
 *     channel 自身不缓存可用性。
 */

import { logger } from '../../infra/logger'

import type { Channel } from '../types'

export type StatVersion = '1' | '2' | 'image'

export interface SelectChannelOptions {
  /** 当前统计版本，默认 'image'（公有版）。 */
  version?: StatVersion
  /** 1.0 通道实例（HTTP 兜底，可选）。 */
  http?: Channel
  /** 2.0 通道实例（version === '2' 时必传；否则可省略）。 */
  cloud?: Channel
  /** image 通道实例（version === 'image' 时必传）。 */
  image?: Channel
  /**
   * 主通道不可用时是否回退到 http。
   * 默认 `true`（提高可用性）；设为 `false` 时返回 undefined，调用方应丢弃当批数据。
   */
  fallbackToHttp?: boolean
}

/**
 * 根据策略挑选当前应使用的 channel。
 *
 * @returns 选中的 channel；若没有可用通道返回 `undefined`。
 */
export function selectChannel(opts: SelectChannelOptions): Channel | undefined {
  const version: StatVersion = opts.version ?? 'image'
  const fallback = opts.fallbackToHttp !== false

  if (version === '1') {
    if (opts.http && opts.http.available()) return opts.http
    return undefined
  }

  if (version === '2') {
    if (opts.cloud && opts.cloud.available()) return opts.cloud
    if (!fallback) {
      logger.warn(
        '[uni-stat] cloud channel unavailable and fallback disabled, drop batch'
      )
      return undefined
    }
    if (opts.http && opts.http.available()) {
      logger.warn(
        '[uni-stat] cloud channel unavailable, fallback to http channel'
      )
      return opts.http
    }
    logger.warn('[uni-stat] no channel available')
    return undefined
  }

  // image（默认）：image > http
  if (opts.image && opts.image.available()) return opts.image
  if (!fallback) {
    if (opts.image) {
      // 仅在 image 已构造但失效时给出警告，便于排查；未构造视为正常的"未启用"
      logger.warn(
        '[uni-stat] image channel unavailable and fallback disabled, drop batch'
      )
    }
    return undefined
  }
  if (opts.http && opts.http.available()) {
    if (opts.image) {
      // 同上，仅在 image 已构造但失效时打印降级日志
      logger.warn(
        '[uni-stat] image channel unavailable, fallback to http channel'
      )
    }
    return opts.http
  }
  logger.warn('[uni-stat] no channel available')
  return undefined
}
