/**
 * 入口页（entry page）记忆与 `iey / ppiey` 计算。
 *
 * 设计文档：`03-公有版架构设计.md` §4 与 `04-字段字典与平台获取矩阵.md`。
 *
 * 字段含义：
 *   - `iey` (is entry yes)：当前页是否为本会话**入口页**。`1` = 是，`0` = 否。
 *   - `ppiey` (previous page is entry yes)：**上一页**是否为入口页。
 *
 * 写入时机：
 *   - 新会话第一次 `pageShow` 时调用 `markEntryPage(currentRoute)`，把当前路径登记为
 *     entry，并写入 `__stat:session:entryRoute`。
 *   - 同一会话内后续 page 切换不再标记 entry。
 *   - session 切换（cst=1/2/3）时由 collector 调 `clearEntry()`，等待新会话 first pageShow。
 *
 * 模块**不持有** lastRoute；ppiey 由调用方传入"上一页"，避免和 `adapter/route` 的
 * 当前路由职责耦合。
 */

import { storage } from '../../infra/storage'

const KEY_ENTRY = 'session:entryRoute'

let cached: string | undefined

/**
 * 标记当前页为入口页。
 *
 * 行为：
 *   - 已存在 entry 时直接 noop（保证一会话一 entry）。
 *   - route 为空字符串 / undefined 时 noop（不污染 storage）。
 */
export function markEntryPage(route: string | undefined): void {
  if (!route) return
  const existing = getEntryRoute()
  if (existing) return
  storage.set(KEY_ENTRY, route)
  cached = route
}

/**
 * 当前会话的入口路径；从内存优先取，未命中读 storage。
 */
export function getEntryRoute(): string | undefined {
  if (cached !== undefined) return cached || undefined
  const r = storage.safeRead<string>(KEY_ENTRY)
  if (!r.ok) return undefined
  if (typeof r.value === 'string' && r.value.length > 0) {
    cached = r.value
    return r.value
  }
  // 标注已查过，避免下次再 IO
  cached = ''
  return undefined
}

/**
 * 当前路径是否为入口页。
 *
 * route 为空时返回 false；尚未 mark 时返回 false（不会把"未知"误判为入口）。
 */
export function isEntry(route: string | undefined): boolean {
  if (!route) return false
  const entry = getEntryRoute()
  return entry === route
}

/**
 * session 切换时调用：清掉 entry，等待新会话第一次 pageShow 重新登记。
 */
export function clearEntry(): void {
  cached = ''
  storage.remove(KEY_ENTRY)
}

/** 仅供测试。 */
export function __resetState(): void {
  cached = undefined
}
