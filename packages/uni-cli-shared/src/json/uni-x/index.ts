import path from 'path'
import { extend, isArray } from '@vue/shared'

import { parseJson } from '../json'
import {
  filterPlatformPages,
  isUniPageFile,
  pagesCacheSet,
  removePlatformStyle,
  validatePages,
} from '../pages'
import { normalizePath } from '../../utils'
import { normalizeAppUniRoutes } from '../app/pages/uniRoutes'
import { normalizeAppXUniConfig } from './uniConfig'
import { preUVueJson } from '../../preprocess'
import { checkPagesJson } from '../utils'

export * from './manifest'

export function normalizeUniAppXAppPagesJson(jsonStr: string) {
  // 先条件编译
  jsonStr = preUVueJson(jsonStr, 'pages.json')
  checkPagesJson(jsonStr, process.env.UNI_INPUT_DIR)
  const pagesJson: UniApp.PagesJson = {
    pages: [],
    globalStyle: {} as UniApp.PagesJson['globalStyle'],
  }
  let userPagesJson: UniApp.PagesJson = {
    pages: [],
    globalStyle: {} as UniApp.PagesJson['globalStyle'],
  }
  try {
    // 此处不需要条件编译了
    userPagesJson = parseJson(jsonStr, false, 'pages.json')
  } catch (e) {
    console.error(`[vite] Error: pages.json parse failed.\n`, jsonStr, e)
  }
  // pages
  validatePages(userPagesJson, jsonStr)
  userPagesJson.subPackages =
    userPagesJson.subPackages || userPagesJson.subpackages
  // subPackages
  if (userPagesJson.subPackages) {
    userPagesJson.pages.push(...normalizeSubPackages(userPagesJson.subPackages))
  }
  pagesJson.pages = userPagesJson.pages

  // pageStyle
  normalizePages(pagesJson.pages)
  // globalStyle
  pagesJson.globalStyle = normalizePageStyle(userPagesJson.globalStyle) as any
  // tabBar
  if (userPagesJson.tabBar) {
    pagesJson.tabBar = userPagesJson.tabBar
  }
  // condition
  if (userPagesJson.condition) {
    pagesJson.condition = userPagesJson.condition
  }
  // uniIdRouter
  if (userPagesJson.uniIdRouter) {
    pagesJson.uniIdRouter = userPagesJson.uniIdRouter
  }
  // 是否应该用 process.env.UNI_UTS_PLATFORM
  filterPlatformPages(process.env.UNI_PLATFORM, pagesJson)

  // 缓存页面列表
  pagesCacheSet.clear()
  pagesJson.pages.forEach((page) => pagesCacheSet.add(page.path))

  return pagesJson
}

function normalizeSubPackages(
  subPackages?: UniApp.PagesJsonSubpackagesOptions[]
) {
  const pages: UniApp.PagesJsonPageOptions[] = []
  if (isArray(subPackages)) {
    subPackages.forEach(({ root, pages: subPages }) => {
      if (root && subPages.length) {
        subPages.forEach((subPage) => {
          subPage.path = normalizePath(path.join(root, subPage.path))
          subPage.style = subPage.style
          pages.push(subPage)
        })
      }
    })
  }
  return pages
}

function normalizePages(pages: UniApp.PagesJsonPageOptions[]) {
  pages.forEach((page) => {
    page.style = normalizePageStyle(page.style) as any
  })
}

function normalizePageStyle(
  pageStyle: UniApp.PagesJsonPageStyle | undefined
): Record<string, any> {
  if (pageStyle) {
    extend(pageStyle, pageStyle['app'])
    removePlatformStyle(pageStyle)
    return pageStyle
  }
  return {}
}

/**
 * TODO 应该闭包，通过globalThis赋值？
 * @param pagesJson
 * @param manifestJson
 * @returns
 */
export function normalizeUniAppXAppConfig(
  pagesJson: UniApp.PagesJson,
  manifestJson: Record<string, any>
) {
  const uniConfig = normalizeAppXUniConfig(pagesJson, manifestJson)
  const tabBar = uniConfig.tabBar
  delete uniConfig.tabBar
  let appConfigJs = `const __uniConfig = ${JSON.stringify(uniConfig)};
__uniConfig.getTabBarConfig = () =>  {return ${
    tabBar ? JSON.stringify(tabBar) : 'undefined'
  }};
__uniConfig.tabBar = __uniConfig.getTabBarConfig();
const __uniRoutes = ${normalizeAppUniRoutes(
    pagesJson
  )}.map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute)).concat(typeof __uniSystemRoutes !== 'undefined' ? __uniSystemRoutes : []);

`
  if (process.env.UNI_UTS_PLATFORM === 'app-harmony') {
    appConfigJs += `globalThis.__uniConfig = __uniConfig;
globalThis.__uniRoutes = __uniRoutes;`
  }
  return appConfigJs
}

export function isUniXPageFile(
  source: string,
  importer: string,
  inputDir = process.env.UNI_INPUT_DIR
) {
  if (source.startsWith('@/')) {
    return isUniPageFile(source.slice(2), inputDir)
  }
  if (source.startsWith('.')) {
    return isUniPageFile(path.resolve(path.dirname(importer), source), inputDir)
  }
  return false
}

export function getUniXPagePaths() {
  if (process.env.UNI_COMPILE_EXT_API_PAGE_PATHS) {
    return JSON.parse(process.env.UNI_COMPILE_EXT_API_PAGE_PATHS)
  }
  return Array.from(pagesCacheSet)
}
