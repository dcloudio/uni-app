import fs from 'fs'
import path from 'path'
import { extend, hasOwn, isArray, isPlainObject } from '@vue/shared'
import {
  TABBAR_HEIGHT,
  addLeadingSlash,
  normalizeTitleColor,
  once,
} from '@dcloudio/uni-shared'
import { isNormalCompileTarget, normalizePath, removeExt } from '../utils'
import { parseJson } from './json'
import { isVueSfcFile } from '../vue/utils'
import { parseVueRequest } from '../vite'
import { EXTNAME_VUE_RE, TEXT_STYLE } from '../constants'
import { initTheme, normalizeThemeConfigOnce } from './theme'
import { getPlatformManifestJsonOnce } from './manifest'

export const pagesCacheSet: Set<string> = new Set()

export function isUniPageFile(
  file: string,
  inputDir: string = process.env.UNI_INPUT_DIR
) {
  if (inputDir && path.isAbsolute(file)) {
    file = normalizePath(path.relative(inputDir, file.split('?')[0]))
  }
  return pagesCacheSet.has(removeExt(file))
}

export function isUniPageSetupAndUts(file: string) {
  const { filename, query } = parseVueRequest(file)
  return !!(
    query.vue &&
    query.setup &&
    hasOwn(query, 'lang.uts') &&
    EXTNAME_VUE_RE.test(filename)
  )
}

export function isUniPageSetupAndTs(file: string) {
  const { filename, query } = parseVueRequest(file)
  return !!(
    query.vue &&
    query.setup &&
    hasOwn(query, 'lang.ts') &&
    EXTNAME_VUE_RE.test(filename)
  )
}

export function isUniPageSfcFile(
  file: string,
  inputDir: string = process.env.UNI_INPUT_DIR
) {
  return isVueSfcFile(file) && isUniPageFile(file, inputDir)
}
/**
 * 小程序平台慎用，因为该解析不支持 subpackages
 * @param inputDir
 * @param platform
 * @param normalize
 * @returns
 */
export const parsePagesJson = (
  inputDir: string,
  platform: UniApp.PLATFORM,
  normalize: boolean = true
) => {
  const pagesFilename = path.join(inputDir, 'pages.json')
  if (!fs.existsSync(pagesFilename)) {
    if (!isNormalCompileTarget()) {
      return {
        pages: [],
        globalStyle: { navigationBar: {} },
      } as UniApp.PagesJson
    }
  }
  const jsonStr = fs.readFileSync(pagesFilename, 'utf8')
  if (normalize) {
    return normalizePagesJson(jsonStr, platform)
  }
  return parseJson(jsonStr, true, pagesFilename) as UniApp.PagesJson
}
/**
 * 该方法解析出来的是不支持 subpackages，会被合并入 pages
 */
export const parsePagesJsonOnce = once(parsePagesJson)
/**
 * 目前 App 和 H5 使用了该方法
 * @param jsonStr
 * @param platform
 * @param param2
 * @returns
 */
export function normalizePagesJson(
  jsonStr: string,
  platform: UniApp.PLATFORM,
  {
    subpackages,
  }: {
    subpackages: boolean
  } = { subpackages: false }
) {
  let pagesJson: UniApp.PagesJson = {
    pages: [],
    globalStyle: {
      navigationBar: {},
    },
  }
  // preprocess
  try {
    pagesJson = parseJson(jsonStr, true, 'pages.json')
  } catch (e) {
    console.error(`[vite] Error: pages.json parse failed.\n`, jsonStr, e)
  }
  // pages
  validatePages(pagesJson, jsonStr)
  pagesJson.subPackages = pagesJson.subPackages || pagesJson.subpackages
  delete pagesJson.subpackages
  // subpackages
  if (pagesJson.subPackages) {
    if (subpackages) {
      pagesJson.subPackages.forEach(({ pages }) => {
        pages && normalizePages(pages, platform)
      })
    } else {
      pagesJson.pages.push(...normalizeSubpackages(pagesJson.subPackages))
      delete pagesJson.subPackages
    }
  } else {
    delete pagesJson.subPackages
  }
  // pageStyle
  normalizePages(pagesJson.pages, platform)
  // globalStyle
  pagesJson.globalStyle = normalizePageStyle(
    null,
    pagesJson.globalStyle!,
    platform
  )
  // tabBar
  if (pagesJson.tabBar) {
    const tabBar = normalizeTabBar(pagesJson.tabBar!, platform)
    if (tabBar) {
      pagesJson.tabBar = tabBar
    } else {
      delete pagesJson.tabBar
    }
  }

  // 过滤平台page
  filterPlatformPages(platform, pagesJson)

  // 缓存页面列表
  pagesCacheSet.clear()
  pagesJson.pages.forEach((page) => pagesCacheSet.add(page.path))

  const manifestJsonPlatform = getPlatformManifestJsonOnce()
  if (!manifestJsonPlatform.darkmode) {
    const { pages, globalStyle, tabBar } = initTheme(
      manifestJsonPlatform,
      pagesJson
    )
    extend(pagesJson, { pages, globalStyle, tabBar })
  }

  return pagesJson
}

export function validatePages(pagesJson: Record<string, any>, jsonStr: string) {
  if (!isArray(pagesJson.pages)) {
    pagesJson.pages = []
    console.error(`[uni-app] Error: pages.json->pages parse failed.`)
    process.exit(0)
  } else if (!pagesJson.pages.length) {
    console.error(
      `[uni-app] Error: pages.json->pages must contain at least 1 page.`
    )
    process.exit(0)
  } else {
    const pages: string[] = []
    pagesJson.pages.forEach((page) => {
      if (pages.indexOf(page.path) !== -1) {
        console.error(`[uni-app] Error: pages.json->${page.path} duplication.`)
        process.exit(0)
      }
      pages.push(page.path)
    })
  }
}

function normalizePages(
  pages: UniApp.PagesJsonPageOptions[],
  platform: UniApp.PLATFORM
) {
  pages.forEach((page) => {
    page.style = normalizePageStyle(page.path, page.style!, platform)
    if (platform === 'app-harmony') {
      // 鸿蒙下强制 isNVue 为 false，增加额外的 isNVueStyle 来标记样式处理
      // 因为已有的代码里太多根据 isNVue 来处理的逻辑，这些逻辑在鸿蒙都不适用
      // 鸿蒙仅需要将 nvue 当做 vue，并补充 css 即可
      if (page.style.isNVue) {
        page.style.isNVue = false
        ;(page.style as any).isNVueStyle = true
      }
    }
  })
  if (platform !== 'app') {
    return
  }
  const subNVuePages: UniApp.PagesJsonPageOptions[] = []
  // subNVues
  pages.forEach(({ style: { subNVues } }) => {
    if (!isArray(subNVues)) {
      return
    }
    subNVues.forEach((subNVue) => {
      if (subNVue && subNVue.path) {
        subNVuePages.push({
          path: subNVue.path,
          style: { isSubNVue: true, isNVue: true, navigationBar: {} },
        })
      }
    })
  })
  if (subNVuePages.length) {
    pages.push(...subNVuePages)
  }
}

function normalizeSubpackages(
  subpackages?: UniApp.PagesJsonSubpackagesOptions[]
) {
  const pages: UniApp.PagesJsonPageOptions[] = []
  if (isArray(subpackages)) {
    subpackages.forEach(({ root, pages: subPages }) => {
      if (root && subPages.length) {
        subPages.forEach((subPage) => {
          subPage.path = normalizePath(path.join(root, subPage.path))
          subPage.style = normalizeSubpackageSubNVues(root, subPage.style)
          pages.push(subPage)
        })
      }
    })
  }
  return pages
}

function normalizeSubpackageSubNVues(
  root: string,
  style: UniApp.PagesJsonPageStyle = { navigationBar: {} }
) {
  const platformStyle = style['app'] || style['app-plus']
  if (!platformStyle) {
    return style
  }
  if (isArray(platformStyle.subNVues)) {
    platformStyle.subNVues.forEach((subNVue) => {
      if (subNVue.path) {
        subNVue.path = normalizePath(path.join(root, subNVue.path))
      }
    })
  }
  return style
}

function normalizePageStyle(
  pagePath: string | null,
  pageStyle: UniApp.PagesJsonPageStyle | undefined,
  platform: UniApp.PLATFORM
) {
  let isNVue: boolean | undefined = false
  if (process.env.UNI_APP_X === 'true') {
    isNVue = undefined
  } else {
    const hasNVue =
      pagePath &&
      process.env.UNI_INPUT_DIR &&
      fs.existsSync(path.join(process.env.UNI_INPUT_DIR, pagePath + '.nvue'))
        ? true
        : undefined

    if (hasNVue) {
      const hasVue = fs.existsSync(
        path.join(process.env.UNI_INPUT_DIR, pagePath + '.vue')
      )
      if (hasVue) {
        if (platform === 'app') {
          if (process.env.UNI_NVUE_COMPILER !== 'vue') {
            isNVue = true
          }
        }
      } else {
        isNVue = true
      }
    }
  }

  if (pageStyle) {
    if (platform === 'h5') {
      extend(
        pageStyle,
        pageStyle['app'] || pageStyle['app-plus'],
        pageStyle['web'] || pageStyle['h5']
      )
    } else if (platform === 'app') {
      extend(pageStyle, pageStyle['app'] || pageStyle['app-plus'])
    } else {
      extend(pageStyle, pageStyle[platform])
    }
    if (['h5', 'app', 'app-harmony'].includes(platform)) {
      pageStyle.navigationBar = normalizeNavigationBar(pageStyle)
      if (isEnablePullDownRefresh(pageStyle)) {
        pageStyle.enablePullDownRefresh = true
        pageStyle.pullToRefresh = normalizePullToRefresh(pageStyle)
      }
      if (platform === 'app') {
        pageStyle.disableSwipeBack === true
          ? (pageStyle.popGesture = 'none')
          : delete pageStyle.popGesture
        delete pageStyle.disableSwipeBack
      }
    }
    pageStyle.isNVue = isNVue
    removePlatformStyle(pageStyle)
    return pageStyle
  }
  return { navigationBar: {}, isNVue }
}

const navigationBarMaps = {
  navigationBarBackgroundColor: 'backgroundColor',
  navigationBarTextStyle: 'textStyle',
  navigationBarTitleText: 'titleText',
  navigationStyle: 'style',
  titleImage: 'titleImage',
  titlePenetrate: 'titlePenetrate',
  transparentTitle: 'transparentTitle',
}

function normalizeNavigationBar(
  pageStyle: Record<string, any>
): UniApp.PageNavigationBar {
  const navigationBar = Object.create(null) as UniApp.PageNavigationBar

  Object.keys(navigationBarMaps).forEach((name) => {
    if (hasOwn(pageStyle, name)) {
      navigationBar[navigationBarMaps[name] as keyof UniApp.PageNavigationBar] =
        pageStyle[name]
      delete pageStyle[name]
    }
  })

  navigationBar.type = navigationBar.type || 'default'

  const { titleNView } = pageStyle
  if (isPlainObject(titleNView)) {
    extend(navigationBar, titleNView)
    delete pageStyle.titleNView
  } else if (titleNView === false) {
    navigationBar.style = 'custom'
  }

  if (hasOwn(navigationBar, 'transparentTitle')) {
    const transparentTitle = (navigationBar as any).transparentTitle as
      | 'none'
      | 'auto'
      | 'always'
    if (transparentTitle === 'always') {
      navigationBar.style = 'custom'
      navigationBar.type = 'float'
    } else if (transparentTitle === 'auto') {
      navigationBar.type = 'transparent'
    } else {
      navigationBar.type = 'default'
    }
    delete (navigationBar as any).transparentTitle
  }

  if (navigationBar.titleImage && navigationBar.titleText) {
    delete navigationBar.titleText
  }

  if (!navigationBar.titleColor && hasOwn(navigationBar, 'textStyle')) {
    const textStyle = (navigationBar as any).textStyle as string
    if (TEXT_STYLE.includes(textStyle)) {
      navigationBar.titleColor = normalizeTitleColor(textStyle)
    } else {
      navigationBar.titleColor = (navigationBar as any).textStyle
    }
    delete (navigationBar as any).textStyle
  }

  if (
    pageStyle.navigationBarShadow &&
    pageStyle.navigationBarShadow.colorType
  ) {
    navigationBar.shadowColorType = pageStyle.navigationBarShadow.colorType
    delete pageStyle.navigationBarShadow
  }

  const parsedNavigationBar = initTheme(
    getPlatformManifestJsonOnce(),
    navigationBar
  )

  if (isArray(navigationBar.buttons)) {
    navigationBar.buttons = navigationBar.buttons.map((btn) =>
      normalizeNavigationBarButton(
        btn,
        navigationBar.type,
        parsedNavigationBar.titleColor!
      )
    )
  }
  if (isPlainObject(navigationBar.searchInput)) {
    navigationBar.searchInput = normalizeNavigationBarSearchInput(
      navigationBar.searchInput
    )
  }
  if (navigationBar.type === 'transparent') {
    navigationBar.coverage = navigationBar.coverage || '132px'
  }
  return navigationBar
}

function normalizeNavigationBarButton(
  btn: UniApp.PageNavigationBarButton,
  type: UniApp.PageNavigationBar['type'],
  titleColor: UniApp.PageNavigationBar['titleColor']
) {
  btn.color = btn.color || titleColor!
  if (!btn.fontSize) {
    btn.fontSize =
      type === 'transparent' || (btn.text && /\\u/.test(btn.text))
        ? '22px'
        : '27px'
  } else if (/\d$/.test(btn.fontSize)) {
    btn.fontSize += 'px'
  }
  btn.text = btn.text || ''
  return btn
}

function normalizeNavigationBarSearchInput(
  searchInput: UniApp.PageNavigationBarSearchInput
) {
  return extend(
    {
      autoFocus: false,
      align: 'center',
      color: '#000',
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderRadius: '0px',
      placeholder: '',
      placeholderColor: '#CCCCCC',
      disabled: false,
    },
    searchInput
  )
}

const DEFAULT_TAB_BAR: Partial<UniApp.TabBarOptions> = {
  position: 'bottom',
  color: '#999',
  selectedColor: '#007aff',
  borderStyle: 'black',
  blurEffect: 'none',
  fontSize: '10px',
  iconWidth: '24px',
  spacing: '3px',
  height: TABBAR_HEIGHT + 'px',
  list: [],
}

function normalizeTabBar(
  tabBar: UniApp.TabBarOptions,
  platform: UniApp.PLATFORM
) {
  const { midButton } = tabBar
  tabBar = extend({}, DEFAULT_TAB_BAR, tabBar)
  tabBar.list.forEach((item) => {
    if (item.iconPath) {
      item.iconPath = normalizeFilepath(item.iconPath)
    }
    if (item.selectedIconPath) {
      item.selectedIconPath = normalizeFilepath(item.selectedIconPath)
    }
  })
  if (midButton && midButton.backgroundImage) {
    midButton.backgroundImage = normalizeFilepath(midButton.backgroundImage)
  }
  tabBar.selectedIndex = 0
  tabBar.shown = true
  return tabBar
}
const SCHEME_RE = /^([a-z-]+:)?\/\//i
const DATA_RE = /^data:.*,.*/
function normalizeFilepath(filepath: string) {
  const themeConfig = normalizeThemeConfigOnce()['light'] || {}
  if (themeConfig[filepath.replace('@', '')]) return filepath
  if (
    !(SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) &&
    filepath.indexOf('/') !== 0
  ) {
    return addLeadingSlash(filepath)
  }
  return filepath
}

const platforms = ['h5', 'app', 'mp-', 'quickapp', 'web']

export function removePlatformStyle(pageStyle: Record<string, any>) {
  Object.keys(pageStyle).forEach((name) => {
    if (platforms.find((prefix) => name.startsWith(prefix))) {
      delete pageStyle[name as UniApp.PLATFORM]
    }
  })
  return pageStyle
}

export function normalizePagesRoute(
  pagesJson: UniApp.PagesJson
): UniApp.UniRoute[] {
  const firstPagePath = pagesJson.pages[0].path
  const tabBarList = (pagesJson.tabBar && pagesJson.tabBar.list) || []
  return pagesJson.pages.map((pageOptions) => {
    const pagePath = pageOptions.path
    const isEntry = firstPagePath === pagePath ? true : undefined
    const tabBarIndex = tabBarList.findIndex(
      (tabBarPage: { pagePath: string }) => tabBarPage.pagePath === pagePath
    )
    const isTabBar = tabBarIndex !== -1 ? true : undefined
    let windowTop = 0
    const meta = extend(
      {
        isQuit: isEntry || isTabBar ? true : undefined,
        isEntry: isEntry || undefined,
        isTabBar: isTabBar || undefined,
        tabBarIndex: isTabBar ? tabBarIndex : undefined,
        windowTop: windowTop || undefined,
      },
      pageOptions.style
    ) as UniApp.PageRouteMeta
    return {
      path: pageOptions.path,
      meta,
    }
  })
}

function isEnablePullDownRefresh(pageStyle: Record<string, any>) {
  return pageStyle.enablePullDownRefresh || pageStyle.pullToRefresh?.support
}

function normalizePullToRefresh(
  pageStyle: Record<string, any>
): UniApp.PageRefreshOptions | undefined {
  return pageStyle.pullToRefresh
}

function parseSubpackagesRoot(inputDir: string, platform: UniApp.PLATFORM) {
  const pagesJson = parsePagesJson(inputDir, platform, false)
  const subpackages = pagesJson.subPackages || pagesJson.subpackages
  const roots: string[] = []
  if (isArray(subpackages)) {
    subpackages.forEach(({ root }) => {
      if (root) {
        roots.push(root)
      }
    })
  }
  return roots
}

export const parseSubpackagesRootOnce = once(parseSubpackagesRoot)

let isInvalidPagesWarned = false
export function filterPlatformPages(
  platform: UniApp.PLATFORM,
  pagesJson: UniApp.PagesJson
) {
  const invalidPages: string[] = []
  pagesJson.pages = pagesJson.pages.filter(({ path }) => {
    if (isPlatformPage(platform, path)) {
      return true
    }
    invalidPages.push(path)
    return false
  })
  if (pagesJson.subPackages) {
    pagesJson.subPackages.forEach((subPackage) => {
      if (subPackage.pages) {
        subPackage.pages = subPackage.pages.filter(({ path }) => {
          const pagePath = subPackage.root + '/' + path
          if (isPlatformPage(platform, pagePath)) {
            return true
          }
          invalidPages.push(pagePath)
          return false
        })
      }
    })
  }
  if (pagesJson.subpackages) {
    pagesJson.subpackages.forEach((subPackage) => {
      if (subPackage.pages) {
        subPackage.pages = subPackage.pages.filter(({ path }) => {
          const pagePath = subPackage.root + '/' + path
          if (isPlatformPage(platform, pagePath)) {
            return true
          }
          invalidPages.push(pagePath)
          return false
        })
      }
    })
  }
  // 目前仅启动的时候警告一次，该方法可能会被调用很多次
  if (invalidPages.length) {
    if (!isInvalidPagesWarned) {
      isInvalidPagesWarned = true
      console.log(
        `已忽略页面：${invalidPages.join(
          '、'
        )}。详见：https://uniapp.dcloud.net.cn/tutorial/platform.html#platforms`
      )
    }
  }
}

function isPlatformPage(platform: UniApp.PLATFORM, pagePath: string) {
  if (pagePath.startsWith('platforms/')) {
    if (platform === 'app' || platform === 'app-plus') {
      return (
        pagePath.startsWith('platforms/app/') ||
        pagePath.startsWith('platforms/app-plus/')
      )
    } else if (platform === 'h5' || platform === 'web') {
      return (
        pagePath.startsWith('platforms/h5/') ||
        pagePath.startsWith('platforms/web/')
      )
    }
    return pagePath.startsWith('platforms/' + platform + '/')
  }
  return true
}
