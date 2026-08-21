/**
 * App 渠道包标识适配（对齐私有版 `utils/pageInfo.js#get_channel`）。
 *
 * VDOM App 读取 `plus.runtime.channel`；Vapor App 不提供 plus，改读
 * `uni.getAppBaseInfo().channel`。
 *
 * 职责：
 *   - App 端按 VDOM / Vapor 选择对应渠道 API。
 *   - 若构建期平台变量缺失但运行时已存在 `plus.runtime`，也信任原生运行时作为 App 信号。
 *   - 任意 API 缺失 / 抛错 → 降级 `''`，不阻断 install。
 *   - 返回值统一为 `string`（原生偶发返回数字时转为字符串）。
 */

import {
  getGlobalObject,
  isVaporStatRuntime,
  resolveUniRuntime,
} from '../infra/uniRuntime'
import { tryRun } from '../infra/safe'

import { isApp } from './platform'

interface PlusRuntimeLike {
  channel?: unknown
}

/**
 * 将原生渠道值规范为上行用的字符串。
 *
 * @param value `plus.runtime.channel` 原值。
 * @returns 非空字符串；无法识别时返回 `''`。
 */
function normalizeChannelValue(value: unknown): string {
  if (typeof value === 'string') return value
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return ''
}

/**
 * 读取 App 渠道包标识。
 *
 * 与私有版 `get_channel()` 对齐：仅原生 App 有意义；小程序 / H5 恒为 `''`。
 *
 * @returns 渠道字符串；未配置或读取失败时为 `''`。
 */
export function getAppChannel(): string {
  if (isVaporStatRuntime()) {
    if (!isApp()) return ''
    const u = resolveUniRuntime() as
      | { getAppBaseInfo?: () => { channel?: unknown } }
      | undefined
    return normalizeChannelValue(
      tryRun(() => u?.getAppBaseInfo?.().channel, undefined)
    )
  }
  const plus = getGlobalObject().plus as
    | { runtime?: PlusRuntimeLike }
    | undefined
  if (!isApp() && !plus?.runtime) return ''
  const raw = tryRun(() => plus?.runtime?.channel, undefined)
  return normalizeChannelValue(raw)
}
