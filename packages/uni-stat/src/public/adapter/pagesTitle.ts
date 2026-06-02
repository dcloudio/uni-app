/**
 * pages.json 导航栏标题解析（ttpj 数据源）。
 *
 * 与私有版 `utils/pageInfo.js` 对齐，按 Vue 版本分两套构建期数据源：
 *   - VUE3：`uni:stat` 插件注入 `process.env.UNI_STAT_TITLE_JSON`（JSON 字符串）；
 *   - VUE2：`require('uni-pages?{"type":"style"}')` 在应用打包阶段解析 pages.json（公有版 dist
 *     拷贝进 Vue2 工程后无法依赖 define 注入，须与私有版同路径）。
 *
 * 运行时 `getPagesJsonNavigationTitle` 等价私有版 `get_page_name`。
 */

/** VUE3 懒加载缓存；`undefined` 表示尚未解析。 */
let titleMapCache: Record<string, string> | undefined

/**
 * VUE2 构建期：由 `uni-pages` 虚拟模块解析出的 path → title 表（模块加载时即确定）。
 */
// #ifndef VUE3
function buildVue2TitleMapFromUniPages(): Record<string, string> {
  const titleMap: Record<string, string> = {}
  try {
    // eslint-disable-next-line no-restricted-globals
    const pagesTitle = require('uni-pages?{"type":"style"}').default as {
      pages?: Record<string, Record<string, unknown>>
    }
    const pagesData = pagesTitle?.pages
    if (!pagesData || typeof pagesData !== 'object') return titleMap
    for (const path in pagesData) {
      const style = pagesData[path]
      const navigationBar = style.navigationBar as
        | Record<string, unknown>
        | undefined
      const titleText =
        (style.navigationBarTitleText as string) ||
        (style.defaultTitle as string) ||
        (navigationBar?.titleText as string) ||
        ''
      if (titleText) {
        titleMap[path] = titleText
      }
    }
  } catch {
    // uni-pages 不可用时（单测、非 uni 打包上下文）保持空表
  }
  return titleMap
}

const vue2TitleMap = buildVue2TitleMapFromUniPages()
// #endif

/**
 * VUE3：解析并缓存 `UNI_STAT_TITLE_JSON`；解析失败或缺失时得到空表，避免重复 JSON.parse。
 */
// #ifdef VUE3
function getVue3TitleMap(): Record<string, string> {
  if (titleMapCache) return titleMapCache
  titleMapCache = {}
  try {
    // 必须直接读 process.env.UNI_STAT_TITLE_JSON；勿包 typeof process（小程序无 process 时 define 内联字面量会被三元式丢弃，见 install#readManifestStatConfig）。
    const raw = process.env.UNI_STAT_TITLE_JSON
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
// #endif

/**
 * 取当前编译目标下的标题映射表。
 */
function getTitleMap(): Record<string, string> {
  let map: Record<string, string> = {}
  // #ifndef VUE3
  map = vue2TitleMap
  // #endif
  // #ifdef VUE3
  map = getVue3TitleMap()
  // #endif
  return map
}

/**
 * 按当前页路由取 pages.json 中的导航栏标题，供 `setConfigTitle` → 上行 `ttpj`。
 *
 * @param routePath `getCurrentRoute()` 的典型返回值（一般无前导 `/`）；允许含 query。
 * @returns 未配置或查找不到时返回空串（与私有版 `get_page_name` 一致）。
 */
export function getPagesJsonNavigationTitle(routePath: string): string {
  if (!routePath || typeof routePath !== 'string') return ''
  const pathOnly = routePath.split('?')[0].trim()
  if (!pathOnly) return ''

  const map = getTitleMap()
  let result = ''

  // #ifndef VUE3
  const direct = map[pathOnly]
  result = typeof direct === 'string' && direct.length > 0 ? direct : ''
  // #endif

  // #ifdef VUE3
  const keys: string[] = [pathOnly]
  if (pathOnly.startsWith('/')) {
    keys.push(pathOnly.slice(1))
  } else {
    keys.push(`/${pathOnly}`)
  }
  for (const k of keys) {
    const v = map[k]
    if (typeof v === 'string' && v.length > 0) {
      result = v
      break
    }
  }
  // #endif

  return result
}

/** 单测专用：清空 VUE3 解析缓存，模拟切换构建产物或 env。 */
export function __resetPagesTitleCache(): void {
  titleMapCache = undefined
}
