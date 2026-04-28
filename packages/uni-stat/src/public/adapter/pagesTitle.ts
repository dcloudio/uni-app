/**
 * pages.json 导航栏标题解析（ttpj 数据源）。
 *
 * 私有版在 `utils/pageInfo.js` 构建阶段把 `pages.json` 各页的
 * `style.navigationBarTitleText` / `style.navigationBar.titleText` 扫进 `titleJsons`，
 * 运行时 `get_page_name(routepath)` 按路由 path 取值写入 `_navigationBarTitle.config`，
 * 最终在 request 拼进上行 `ttpj`。
 *
 * 公有版走同一构建注入：`uni:stat` 插件（`src/plugin/index.ts`）生成
 * `process.env.UNI_STAT_TITLE_JSON`（JSON 字符串），键为 `parsePagesJson().pages[].path`，
 * 值为导航标题文案。本模块在运行时解析并做路由 key 归一化（有无前导 `/`、是否带 query）。
 */

/** 懒加载缓存；`undefined` 表示尚未解析。 */
let titleMapCache: Record<string, string> | undefined

/**
 * 解析并缓存 `UNI_STAT_TITLE_JSON`；解析失败或缺失时得到空表，避免重复 JSON.parse。
 */
function getTitleMap(): Record<string, string> {
  if (titleMapCache) return titleMapCache
  titleMapCache = {}
  try {
    const env =
      typeof process !== 'undefined' && process.env
        ? (process.env as Record<string, string | undefined>)
        : {}
    const raw = env.UNI_STAT_TITLE_JSON
    if (typeof raw !== 'string' || !raw) return titleMapCache
    const parsed = JSON.parse(raw) as unknown
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      titleMapCache = parsed as Record<string, string>
    }
  } catch {
    titleMapCache = {}
  }
  return titleMapCache
}

/**
 * 按当前页路由取 pages.json 中的导航栏标题，供 `setConfigTitle` → 上行 `ttpj`。
 *
 * @param routePath `getCurrentRoute()` 的典型返回值（一般无前导 `/`，与插件写入的 key 对齐）；允许含 query。
 * @returns 未配置或查找不到时返回空串（与私有版 `get_page_name` 一致）。
 */
export function getPagesJsonNavigationTitle(routePath: string): string {
  if (!routePath || typeof routePath !== 'string') return ''
  const pathOnly = routePath.split('?')[0].trim()
  if (!pathOnly) return ''
  const map = getTitleMap()
  const keys: string[] = [pathOnly]
  if (pathOnly.startsWith('/')) {
    keys.push(pathOnly.slice(1))
  } else {
    keys.push(`/${pathOnly}`)
  }
  for (const k of keys) {
    const v = map[k]
    if (typeof v === 'string' && v.length > 0) return v
  }
  return ''
}

/** 单测专用：清空解析缓存，模拟切换构建产物或 env。 */
export function __resetPagesTitleCache(): void {
  titleMapCache = undefined
}
