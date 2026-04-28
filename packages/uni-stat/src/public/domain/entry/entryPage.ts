/**
 * 入口页（entry page）记忆与 `iey / ppiey` 计算。
 *
 * 设计文档：`03-公有版架构设计.md` §4 与 `04-字段字典与平台获取矩阵.md`。
 *
 * 上行出口：
 *   - **仅 `lt=11` 携带 `iey` / `ppiey`（0/1）**；`lt=1` / `lt=3` 等事件不含入口字段。
 * 字段含义（`lt=11` 在**下一页 onShow** 采集，描述**刚离开的上一页**）：
 *   - `iey`：离开页是否为本会话**入口页**。
 *   - `ppiey`：`urlref` 指向页（再上一层来源）是否入口页。
 *
 * 写入时机（`markEntryPage` 仅维护「本会话入口 path」，供 `isEntry` 与 `lt=11` 使用）：
 *   - 新会话：`clearEntry()` 后立刻 `markEntryPage(route)`（launch / app_show / 首个 page_show），
 *     使首屏/恢复后当前页成为本会话登记入口。
 *   - 同一会话内仅首个 route 生效（一会话一 entry）；后续 `markEntryPage` noop。
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
