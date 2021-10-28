import fs from 'fs'
import path from 'path'
import { extend, hasOwn } from '@vue/shared'
import { parseJson } from '../json'
import { validatePages } from '../pages'
import { AppJson, NetworkTimeout, PageWindowOptions } from './types'
import { parseTabBar, parseWindowOptions } from './utils'
import { normalizePath } from '../../utils'

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
  return parsePagesJson(jsonStr, platform, options)
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
  }: ParsePagesJsonOptions = {
    subpackages: false,
  }
) {
  const appJson: AppJson = {
    pages: [],
  }
  const pageJsons: Record<string, PageWindowOptions> = {}
  const nvuePages: string[] = []
  // preprocess
  const pagesJson = parseJson(jsonStr, true) as UniApp.PagesJson
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
    pageJsons[pagePath] = extend(
      {
        component: true,
      },
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
      appJson.subPackages = pagesJson.subPackages.map(({ root, pages }) => {
        return {
          root,
          pages: pages.map((page) => {
            addPageJson(normalizePath(path.join(root, page.path)), page.style)
            return page.path
          }),
        }
      })
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
    appJson.window = parseWindowOptions(
      pagesJson.globalStyle,
      platform,
      windowOptionsMap
    )
  }

  // tabBar
  if (pagesJson.tabBar) {
    const tabBar = parseTabBar(pagesJson.tabBar!, platform)
    if (tabBar) {
      appJson.tabBar = tabBar
    }
  }
  ;['preloadRule', 'workers', 'usingComponents'].forEach((name) => {
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
  if (darkmode) {
    appJson.darkmode = true
    appJson.themeLocation = 'theme.json'
  }
  return {
    appJson,
    pageJsons,
    nvuePages,
  }
}
