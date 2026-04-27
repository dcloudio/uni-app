/**
 * 上报体序列化（重写私有版 `utils/pageInfo.js#handle_data`）。
 *
 * 修复缺陷 #4：私有版用 `for...in` 拿到的 key 永远是字符串，写成 `i === 0` 与 `i === 3`
 * 导致两条边界分支从未命中：`lt=3`（应用进入后台）应排最后用于服务端 session 闭合——被混入中间。
 *
 * 公有版严格契约：
 *   1. 输出顺序固定：`1 → 11 → 21 → 31 → 101 → 3`（可在 `LT_ORDER` 中扩展）。
 *      `lt=0` 已废弃（参考 `domain/eventTypes.ts` 头注释），不再参与排序。
 *   2. 同一 lt 内事件按 push 顺序保留（稳定排序）。
 *   3. 纯函数：不读 storage、不调 console、不依赖 `__STAT_VERSION__`。
 *   4. 输入桶为空 → 返回 `'[]'`，调用方应在外层判空。
 *
 * 数据形状（公有版只支持 v2 协议，元素为 JSON 对象；不再走 v1 的 `key=val&...` 字符串）：
 *   `JSON.stringify([{...stat1}, {...stat2}])`
 */

import type { StatData } from '../domain/statData'

/**
 * 上报顺序权重表。值越小越靠前；未知 lt 落到最末（靠近 lt=3 之前），同时打 warn。
 *
 * 顺序设计依据：
 *   - lt=1：会话日志（含 sid/cst/fvts/lvts/tvc），最先；
 *   - lt=11/21/31/101：按事件类型轻重排开；
 *   - lt=3：应用进入后台，永远最后，用于服务端归一会话停留时长。
 */
const LT_ORDER: Record<string, number> = {
  '1': 1,
  '11': 2,
  '21': 3,
  '31': 4,
  '101': 5,
  '3': 100,
}

const UNKNOWN_LT_WEIGHT = 50

/**
 * 桶结构：`{ '<lt>': StatData[] }`。collector 通过 `bucket[lt].push(...)` 累积。
 */
export type Buckets = Record<string, StatData[]>

/**
 * 拉平 + 排序 + 序列化。
 *
 * @param buckets 按 lt 分组的事件桶。
 * @returns 上行 `requests` 字段的 JSON 字符串（`'[{...}]'`）。
 */
export function handleData(buckets: Buckets): string {
  return JSON.stringify(flatten(buckets))
}

/**
 * 仅做拉平 + 排序，便于 collector 在不需要 stringify 的场景下做断言或二次处理（如分片）。
 *
 * 排序规则：
 *   - 主键：`LT_ORDER[lt] ?? UNKNOWN_LT_WEIGHT`。
 *   - 次键：原始 push 顺序（依靠 Array.prototype.sort 在 Node 11+ 已稳定）。
 *
 * 修复缺陷 #4 关键断言：`lt='3'` 必落最后；`lt='1'` 必落最前。
 */
export function flatten(buckets: Buckets): StatData[] {
  const ltKeys = Object.keys(buckets)
  ltKeys.sort((a, b) => weightOf(a) - weightOf(b))
  const out: StatData[] = []
  for (let i = 0; i < ltKeys.length; i++) {
    const lt = ltKeys[i]
    const list = buckets[lt]
    if (!list || list.length === 0) continue
    for (let j = 0; j < list.length; j++) out.push(list[j])
  }
  return out
}

function weightOf(lt: string): number {
  const w = LT_ORDER[lt]
  return typeof w === 'number' ? w : UNKNOWN_LT_WEIGHT
}

/** 仅供调试/测试，导出权重表本身（避免外部硬编码 magic number）。 */
export const __LT_ORDER__ = LT_ORDER
