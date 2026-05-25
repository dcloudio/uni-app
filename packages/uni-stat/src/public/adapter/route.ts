/**
 * 页面路由适配。
 *
 * 私有版痛点（参考 `pageInfo.js#get_route / get_page_route / get_page_vm`）：
 *   - `get_page_route` 失败兜底用 `uni.getStorageSync('_STAT_LAST_PAGE_ROUTE')`，
 *     但这个 key 写入位置散落在 `report.js` 多处，时序复杂、容易脏。
 *   - 百度小程序 `_self.$mp.page.is` 取页面路由，逻辑硬编码在 `get_route` 里，
 *     新平台进来必须改这一处主流程。
 *   - `get_page_vm` 直接调 `getCurrentPages()`：在 `onHide` 之后窗口栈可能为空。
 *
 * 公有版职责：
 *   1. `getCurrentRoute()`：稳定获取当前页 path，支持显式传入 pageVm 与多端兜底。
 *   2. `getCurrentRouteWithQuery()`：取带 query 的完整 fullPath。
 *   3. `parseQuery()`：解析 query string 为对象（不依赖 url-search-params，nvue 兼容）。
 *   4. 全部 try/catch，永远返回 `string` / `object`，不返回 undefined。
 *
 * 与私有版兼容：上行字段 `url`（不含 query）/ `urlref`（前页 url）等仍由
 * `domain/statData` 拼装，本层只提供原料。
 */

import { tryRun } from '../infra/safe'

import { getPlatform } from './platform'

interface PageVmLike {
  route?: string
  mpType?: string
  $mpType?: string
  $options?: { mpType?: string }
  $page?: { route?: string; fullPath?: string }
  $mp?: { mpType?: string; page?: { route?: string; is?: string } }
  $scope?: {
    route?: string
    is?: string
    $page?: { route?: string; fullPath?: string }
  }
}

export type PageVmType = 'page' | 'app' | null

/**
 * 判定当前 vm 是页面还是应用（对齐私有版 `pageInfo.js#get_page_types`）。
 *
 * Vue2 下应用前后台走 mixin 的 App `onShow` / `onHide`，不能仅靠 `uni.onAppShow`。
 */
export function getPageVmType(vm?: PageVmLike): PageVmType {
  if (!vm) return null
  const internalMpType =
    (vm as { $?: { type?: { mpType?: string } }; type?: { mpType?: string } }).$
      ?.type?.mpType ?? (vm as { type?: { mpType?: string } }).type?.mpType
  if (
    vm.mpType === 'page' ||
    vm.$mpType === 'page' ||
    vm.$mp?.mpType === 'page' ||
    vm.$options?.mpType === 'page' ||
    internalMpType === 'page'
  ) {
    return 'page'
  }
  if (
    vm.mpType === 'app' ||
    vm.$mpType === 'app' ||
    vm.$mp?.mpType === 'app' ||
    vm.$options?.mpType === 'app' ||
    internalMpType === 'app'
  ) {
    return 'app'
  }
  return null
}

interface PageEntry {
  $vm?: PageVmLike
  route?: string
  $page?: { route?: string; fullPath?: string }
}

declare const getCurrentPages: () => PageEntry[]

/**
 * 取栈顶页面实例（vm）。
 *
 * 优先 `getCurrentPages()`；若不可用或栈为空返回 `undefined`。
 */
export function getTopPageVm(): PageVmLike | undefined {
  const fn = (globalThis as unknown as { getCurrentPages?: () => PageEntry[] })
    .getCurrentPages
  if (typeof fn !== 'function') return undefined
  const pages = tryRun(() => fn(), [] as PageEntry[]) || []
  if (!Array.isArray(pages) || pages.length === 0) return undefined
  const top = pages[pages.length - 1]
  return top?.$vm ?? (top as unknown as PageVmLike)
}

/**
 * 取当前页面路径（不含 query）。
 *
 * 取值顺序：
 *   1. 显式 pageVm 优先（mixin 收到的 self/this）。
 *   2. 百度小程序：`vm.$mp.page.is` / `vm.$scope.is`。
 *   3. 通用：`vm.route` → `vm.$scope.route` → `vm.$mp.page.route`。
 *   4. 取栈顶 page 兜底。
 *   5. 全失败返回 ''。
 */
export function getCurrentRoute(pageVm?: PageVmLike): string {
  const vm = pageVm ?? getTopPageVm()
  if (!vm) return ''
  if (getPlatform() === 'bd') {
    const r = vm.$mp?.page?.is ?? vm.$scope?.is ?? ''
    if (r) return r
  }
  return vm.route ?? vm.$scope?.route ?? vm.$mp?.page?.route ?? ''
}

/**
 * 取当前页 fullPath（含 query）；无 query 返回与 `getCurrentRoute` 一致。
 *
 * 取值顺序：vm.$page.fullPath → vm.$scope.$page.fullPath → 退化 route。
 * 与私有版一致：fullPath === '/' 时退到 route，避免根路径 query 丢失。
 */
export function getCurrentRouteWithQuery(pageVm?: PageVmLike): string {
  const vm = pageVm ?? getTopPageVm()
  if (!vm) return ''
  const page = vm.$page ?? vm.$scope?.$page
  if (page) {
    if (page.fullPath && page.fullPath !== '/') return page.fullPath
    if (page.route) return page.route
  }
  return getCurrentRoute(vm)
}

/**
 * 解析 query string（无 `?` 前缀也兼容）。
 *
 * 与私有版 `get_query` 区别：
 *   - 不依赖 `URLSearchParams`（nvue 不可用）。
 *   - 重复 key 取最后一个值（与浏览器 URLSearchParams.get 行为一致）。
 *   - 失败返回 `{}`，不抛。
 */
export function parseQuery(
  input: string | undefined | null
): Record<string, string> {
  if (!input || typeof input !== 'string') return {}
  const idx = input.indexOf('?')
  const qs = idx >= 0 ? input.slice(idx + 1) : input
  if (!qs) return {}
  const out: Record<string, string> = {}
  for (const pair of qs.split('&')) {
    if (!pair) continue
    const eq = pair.indexOf('=')
    const k = eq >= 0 ? pair.slice(0, eq) : pair
    const v = eq >= 0 ? pair.slice(eq + 1) : ''
    const dk = tryRun(() => decodeURIComponent(k), k)
    const dv = tryRun(() => decodeURIComponent(v), v)
    if (dk) out[dk] = dv
  }
  return out
}

/**
 * 取当前页 query（对象形式）。优先 vm.$page.options，其次解析 fullPath query。
 */
export function getCurrentQuery(pageVm?: PageVmLike): Record<string, string> {
  const vm = pageVm ?? getTopPageVm()
  if (!vm) return {}
  const page = vm.$page ?? vm.$scope?.$page
  const opts = (page as unknown as { options?: Record<string, string> })
    ?.options
  if (opts && typeof opts === 'object') {
    const out: Record<string, string> = {}
    for (const k of Object.keys(opts)) out[k] = String(opts[k] ?? '')
    return out
  }
  const fp = page?.fullPath ?? ''
  return parseQuery(fp)
}
