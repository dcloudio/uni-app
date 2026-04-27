/**
 * 会话 ID 生成器。
 *
 * 形如：
 *   - 有 uuid：`${uuid}-${base36(now)}-${4字符 random}`
 *   - 无 uuid：`anon-${base36(now)}-${8字符 random}`
 *
 * 设计要点：
 *   1. 长度可控（典型 < 64 字符），避免上报字段超限。
 *   2. 仅依赖 `Math.random` 与 `Date.now`，不引入 crypto；同一毫秒并发碰撞概率
 *      ≈ 1/(36^4) ≈ 6e-7，对统计采集足够。
 */

import { nowMs } from './time'

const RANDOM_LEN_WITH_UUID = 4
const RANDOM_LEN_WITHOUT_UUID = 8

/**
 * 生成会话 ID。`uuid` 为空字符串 / undefined 时退化为 anon 模式。
 */
export function genSid(uuid: string | undefined): string {
  const ts = nowMs().toString(36)
  if (uuid && uuid.length > 0) {
    return `${uuid}-${ts}-${randomPart(RANDOM_LEN_WITH_UUID)}`
  }
  return `anon-${ts}-${randomPart(RANDOM_LEN_WITHOUT_UUID)}`
}

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
