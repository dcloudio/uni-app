/**
 * 会话 ID 生成器。
 *
 * 形如（与典型调试示例一致）：
 *   - 有 did（uuid）：`${did}-${8位base36}-${4位base36}`，例如 `1777261806777339018-moih1mhr-40gn`
 *   - 无 did：先生成与兜底 did 同形的数字主体，再拼同样后缀（避免 `anon-` 前缀）。
 *
 * 设计要点：
 *   1. 长度可控，避免上报字段超限。
 *   2. 仅依赖 `Math.random` 与 `Date.now`，不引入 crypto。
 */

import { nowMs } from './time'

const SUFFIX_HEAD_LEN = 8
const SUFFIX_TAIL_LEN = 4

/**
 * 生成 base36 随机串。
 *
 * @param len 期望长度；不足时用 '0' 左填充以保证视觉与碰撞概率稳定。
 */
function randomPart(len: number): string {
  const r = Math.random()
    .toString(36)
    .slice(2, 2 + len)
  return r.length >= len ? r : r.padEnd(len, '0')
}

/**
 * 会话实例后缀：`xxxxxxxx-xxxx`（与常见上报示例形态一致）。
 */
function sessionInstanceSuffix(): string {
  return `${randomPart(SUFFIX_HEAD_LEN)}-${randomPart(SUFFIX_TAIL_LEN)}`
}

/**
 * 无设备 id 时的数字主体（与 device 兜底 did 生成规则对齐，避免引入循环依赖故略重复）。
 */
function anonNumericBody(): string {
  const ms = nowMs()
  const rnd = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0')
  return `${ms}${rnd}`
}

/**
 * 生成会话 ID。`uuid` 为空字符串 / undefined 时退化为「数字主体 + 后缀」。
 */
export function genSid(uuid: string | undefined): string {
  if (uuid && uuid.length > 0) {
    return `${uuid}-${sessionInstanceSuffix()}`
  }
  return `${anonNumericBody()}-${sessionInstanceSuffix()}`
}
