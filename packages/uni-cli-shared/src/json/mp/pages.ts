import fs from 'fs'
import path from 'path'
import { extend, hasOwn } from '@vue/shared'
import { parseJson } from '../json'
import { filterPlatformPages, validatePages } from '../pages'
import type { AppJson, NetworkTimeout, PageWindowOptions } from './types'
import { parseTabBar, parseWindowOptions } from './utils'
import { normalizePath } from '../../utils'
import { isMiniProgramProjectJsonKey, projectKeys } from './project'
import { getPlatformManifestJsonOnce } from '../manifest'
import { hasThemeJson, initTheme } from '../theme'
import { checkPagesJson } from '../uni-x'

interface ParsePagesJsonOptions {
  debug?: boolean
  darkmode?: boolean
  subpackages: boolean
  windowOptionsMap?: Record<string, string>
  tabBarOptionsMap?: Record<string, string>
  tabBarItemOptionsMap?: Record<string, string>
  networkTimeout?: NetworkTimeout
}

export function parseMiniProgramPagesJson(
  jsonStr: string,
  platform: UniApp.PLATFORM,
  options: ParsePagesJsonOptions = { subpackages: false }
) {
  if (process.env.UNI_APP_X === 'true') {
    // 目前仅对x开放
    checkPagesJson(jsonStr, process.env.UNI_INPUT_DIR)
  }
  return parsePagesJson(jsonStr, platform, options)
}

const NON_APP_JSON_KEYS = [
  'unipush',
  'secureNetwork',
  'usingComponents',
  'optimization',
  'scopedSlotsCompiler',
  'uniStatistics',
  'mergeVirtualHostAttributes',
  'styleIsolation',
  'enableVirtualHost',
]

export function mergeMiniProgramAppJson(
  appJson: Record<string, any>,
  platformJson: Record<string, any> = {},
  source: Record<string, any> = {}
) {
  Object.keys(source).forEach((key) => {
    if (!projectKeys.includes(key)) {
      projectKeys.push(key)
    }
  })

  Object.keys(platformJson).forEach((name) => {
    if (
      !isMiniProgramProjectJsonKey(name) &&
      !NON_APP_JSON_KEYS.includes(name)
    ) {
      appJson[name] = platformJson[name]
    }
  })
}

function parsePagesJson(
  jsonStr: string,
  platform: UniApp.PLATFORM,
  {
    debug,
    darkmode,
    networkTimeout,
    subpackages,
    windowOptionsMap,
    tabBarOptionsMap,
    tabBarItemOptionsMap,
  }: ParsePagesJsonOptions = {
    subpackages: false,
  }
) {
  let appJson: AppJson = {
    pages: [],
  }
  let pageJsons: Record<string, PageWindowOptions> = {}
  let nvuePages: string[] = []
  // preprocess
  const pagesJson = parseJson(jsonStr, true, 'pages.json') as UniApp.PagesJson
  if (!pagesJson) {
    throw new Error(`[vite] Error: pages.json parse failed.\n`)
  }

  function addPageJson(pagePath: string, style: UniApp.PagesJsonPageStyle) {
    const filename = path.join(process.env.UNI_INPUT_DIR, pagePath)
    if (
      fs.existsSync(filename + '.nvue') &&
      !fs.existsSync(filename + '.vue')
    ) {
      nvuePages.push(pagePath)
    }
    const windowOptions: PageWindowOptions = {}
    if (platform === 'mp-baidu') {
      // 仅百度小程序需要页面配置 component:true
      // 快手小程序反而不能配置 component:true，故不能统一添加，目前硬编码处理
      windowOptions.component = true
    }
    pageJsons[pagePath] = extend(
      windowOptions,
      parseWindowOptions(style, platform, windowOptionsMap) as PageWindowOptions
    )
  }
  // pages
  validatePages(pagesJson, jsonStr)

  pagesJson.pages.forEach((page) => {
    appJson.pages.push(page.path)
    addPageJson(page.path, page.style)
  })

  // subpackages
  pagesJson.subPackages = pagesJson.subPackages || pagesJson.subpackages
  if (pagesJson.subPackages) {
    if (subpackages) {
      appJson.subPackages = pagesJson.subPackages.map(
        ({ root, pages, ...rest }) => {
          return extend(
            {
              root,
              pages: pages.map((page) => {
                addPageJson(
                  normalizePath(path.join(root, page.path)),
                  page.style
                )
                return page.path
              }),
            },
            rest
          )
        }
      )
    } else {
      pagesJson.subPackages.forEach(({ root, pages }) => {
        pages.forEach((page) => {
          const pagePath = normalizePath(path.join(root, page.path))
          appJson.pages.push(pagePath)
          addPageJson(pagePath, page.style)
        })
      })
    }
  }

  // window
  if (pagesJson.globalStyle) {
    const windowOptions = parseWindowOptions(
      pagesJson.globalStyle,
      platform,
      windowOptionsMap
    )
    const { usingComponents } = windowOptions as PageWindowOptions
    if (usingComponents) {
      delete (windowOptions as PageWindowOptions).usingComponents
      appJson.usingComponents = usingComponents
    } else {
      delete appJson.usingComponents
    }
    appJson.window = windowOptions
  }

  // tabBar
  if (pagesJson.tabBar) {
    const tabBar = parseTabBar(
      pagesJson.tabBar!,
      platform,
      tabBarOptionsMap,
      tabBarItemOptionsMap
    )
    if (tabBar) {
      appJson.tabBar = tabBar
    }
  }

  filterPlatformPages(platform, pagesJson)
  ;['preloadRule', 'workers', 'plugins', 'entryPagePath'].forEach((name) => {
    if (hasOwn(pagesJson, name)) {
      appJson[name] = pagesJson[name]
    }
  })
  if (debug) {
    appJson.debug = debug
  }
  if (networkTimeout) {
    appJson.networkTimeout = networkTimeout
  }
  const manifestJson = getPlatformManifestJsonOnce()
  if (!darkmode) {
    const { pages, window, tabBar } = initTheme(manifestJson, appJson)
    extend(appJson, JSON.parse(JSON.stringify({ pages, window, tabBar })))
    delete appJson.darkmode
    delete appJson.themeLocation
    pageJsons = initTheme(manifestJson, pageJsons)
  } else {
    const themeLocation = manifestJson.themeLocation || 'theme.json'
    if (hasThemeJson(path.join(process.env.UNI_INPUT_DIR, themeLocation)))
      appJson.themeLocation = themeLocation
  }
  return {
    appJson,
    pageJsons,
    nvuePages,
  }
}
