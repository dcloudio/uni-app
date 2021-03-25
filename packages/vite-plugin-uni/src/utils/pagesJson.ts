import path from 'path'
import slash from 'slash'
import { hasOwn, isPlainObject } from '@vue/shared'
import { parseJson } from '@dcloudio/uni-cli-shared'

export function normalizePagesJson(jsonStr: string, platform: UniApp.PLATFORM) {
  let pagesJson: UniApp.PagesJson = {
    pages: [],
  }
  // preprocess
  try {
    pagesJson = parseJson(jsonStr, true)
  } catch (e) {
    console.error(`[vite] Error: pages.json parse failed.\n`, jsonStr, e)
  }
  // pages
  validatePages(pagesJson, jsonStr)
  // subpackages
  pagesJson.pages.push(
    ...normalizeSubpackages(pagesJson.subPackages || pagesJson.subpackages)
  )
  // pageStyle
  normalizePages(pagesJson.pages, platform)
  // globalStyle
  pagesJson.globalStyle = normalizePageStyle(pagesJson.globalStyle!, platform)
  return pagesJson
}

function validatePages(pagesJson: Record<string, any>, jsonStr: string) {
  if (!Array.isArray(pagesJson.pages)) {
    pagesJson.pages = []
    console.error(`[uni-app] Error: pages.json->pages parse failed.\n`, jsonStr)
  } else if (!pagesJson.pages.length) {
    console.error(
      `[uni-app] Error: pages.json->pages must contain at least 1 page.\n`,
      jsonStr
    )
  }
}

function normalizePages(
  pages: UniApp.PagesJsonPageOptions[],
  platform: UniApp.PLATFORM
) {
  pages.forEach((page) => {
    page.style = normalizePageStyle(page.style!, platform)
  })
  return pages
}

function normalizeSubpackages(
  subpackages?: UniApp.PagesJsonSubpackagesOptions[]
) {
  const pages: UniApp.PagesJsonPageOptions[] = []
  if (Array.isArray(subpackages)) {
    subpackages.forEach(({ root, pages: subPages }) => {
      if (root && subPages.length) {
        subPages.forEach((subPage) => {
          subPage.path = slash(path.join(root, subPage.path))
          pages.push(subPage)
        })
      }
    })
  }
  return pages
}

function normalizePageStyle(
  pageStyle: UniApp.PagesJsonPageStyle,
  platform: UniApp.PLATFORM
) {
  if (pageStyle) {
    if (platform === 'h5') {
      Object.assign(pageStyle, pageStyle['app-plus'] || {})
    }
    Object.assign(pageStyle, pageStyle[platform] || {})
    if (['h5', 'app-plus'].includes(platform)) {
      pageStyle.navigationBar = normalizeNavigationBar(pageStyle)
    }
    return removePlatformStyle(pageStyle)
  }
  return { navigationBar: {} }
}

const navigationBarMaps = {
  navigationBarBackgroundColor: 'backgroundColor',
  navigationBarTextStyle: 'textStyle',
  navigationBarTitleText: 'titleText',
  navigationStyle: 'style',
  titleImage: 'titleImage',
  titlePenetrate: 'titlePenetrate',
}

function normalizeNavigationBar(
  pageStyle: Record<string, any>
): UniApp.PageNavigationBar {
  const navigationBar = Object.create(null) as UniApp.PageNavigationBar
  Object.keys(navigationBarMaps).forEach((name) => {
    if (hasOwn(pageStyle, name)) {
      // @ts-ignore
      navigationBar[navigationBarMaps[name]] = pageStyle[name]
      delete pageStyle[name]
    }
  })
  if (
    pageStyle.navigationBarShadow &&
    pageStyle.navigationBarShadow.colorType
  ) {
    navigationBar.shadowColorType = pageStyle.navigationBarShadow.colorType
    delete pageStyle.navigationBarShadow
  }
  const { titleNView } = pageStyle
  if (isPlainObject(titleNView)) {
    Object.assign(navigationBar, titleNView)
  }
  return navigationBar
}

const platforms = ['h5', 'app-plus', 'mp-', 'quickapp']

function removePlatformStyle(pageStyle: UniApp.PagesJsonPageStyle) {
  Object.keys(pageStyle).forEach((name) => {
    if (platforms.find((prefix) => name.startsWith(prefix))) {
      delete pageStyle[name as UniApp.PLATFORM]
    }
  })
  return pageStyle
}
