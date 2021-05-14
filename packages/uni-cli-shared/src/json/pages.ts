import fs from 'fs'
import path from 'path'
import slash from 'slash'
import { extend, hasOwn, isArray, isPlainObject } from '@vue/shared'
import { once, TABBAR_HEIGHT } from '@dcloudio/uni-shared'

import { parseJson } from './json'

export const parsePagesJson = (
  inputDir: string,
  platform: UniApp.PLATFORM,
  normalize: boolean = true
) => {
  const jsonStr = fs.readFileSync(path.join(inputDir, 'pages.json'), 'utf8')
  if (normalize) {
    return normalizePagesJson(jsonStr, platform)
  }
  return parseJson(jsonStr, true) as UniApp.PagesJson
}

export const parsePagesJsonOnce = once(parsePagesJson)

export function normalizePagesJson(jsonStr: string, platform: UniApp.PLATFORM) {
  let pagesJson: UniApp.PagesJson = {
    pages: [],
    globalStyle: {
      navigationBar: {},
    },
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
  // tabBar
  if (pagesJson.tabBar) {
    const tabBar = normalizeTabBar(pagesJson.tabBar!)
    if (tabBar) {
      pagesJson.tabBar = tabBar
    } else {
      delete pagesJson.tabBar
    }
  }
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
      Object.assign(pageStyle, pageStyle['app'] || {})
    }
    Object.assign(pageStyle, pageStyle[platform] || {})
    if (['h5', 'app'].includes(platform)) {
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

  const { titleNView } = pageStyle
  if (isPlainObject(titleNView)) {
    Object.assign(navigationBar, titleNView)
    delete pageStyle.titleNView
  }
  if (!navigationBar.titleColor && hasOwn(navigationBar, 'textStyle')) {
    navigationBar.titleColor =
      (navigationBar as any).textStyle === 'black' ? '#000' : '#fff'
    delete (navigationBar as any).textStyle
  }

  if (
    pageStyle.navigationBarShadow &&
    pageStyle.navigationBarShadow.colorType
  ) {
    navigationBar.shadowColorType = pageStyle.navigationBarShadow.colorType
    delete pageStyle.navigationBarShadow
  }

  if (isArray(navigationBar.buttons)) {
    navigationBar.buttons = navigationBar.buttons.map((btn) =>
      normalizeNavigationBarButton(
        btn,
        navigationBar.type,
        navigationBar.titleColor!
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
  titleColor: '#000' | '#fff'
) {
  btn.color = type === 'transparent' ? '#fff' : btn.color || titleColor
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
  return Object.assign(
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
}

function normalizeTabBar(tabBar: UniApp.TabBarOptions) {
  const { list, midButton } = tabBar
  if (!list || !list.length) {
    return
  }
  tabBar = extend({}, DEFAULT_TAB_BAR, tabBar)
  const len = list.length
  if (len % 2 === 0 && isPlainObject(midButton)) {
    list.splice(
      Math.floor(len / 2),
      0,
      extend(
        {
          type: 'midButton',
          width: '50px',
          height: '50px',
          iconWidth: '24px',
        },
        midButton
      )
    )
  } else {
    delete tabBar.midButton
  }
  list.forEach((item) => {
    if (item.iconPath) {
      item.iconPath = normalizeFilepath(item.iconPath)
    }
    if (item.selectedIconPath) {
      item.selectedIconPath = normalizeFilepath(item.selectedIconPath)
    }
    if (item.type === 'midButton' && item.backgroundImage) {
      item.backgroundImage = normalizeFilepath(item.backgroundImage)
    }
  })
  tabBar.selectedIndex = 0
  tabBar.shown = true
  return tabBar
}
const SCHEME_RE = /^([a-z-]+:)?\/\//i
const DATA_RE = /^data:.*,.*/
function normalizeFilepath(filepath: string) {
  if (
    !(SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) &&
    filepath.indexOf('/') !== 0
  ) {
    return '/' + filepath
  }
  return filepath
}

const platforms = ['h5', 'app', 'mp-', 'quickapp']

function removePlatformStyle(pageStyle: UniApp.PagesJsonPageStyle) {
  Object.keys(pageStyle).forEach((name) => {
    if (platforms.find((prefix) => name.startsWith(prefix))) {
      delete pageStyle[name as UniApp.PLATFORM]
    }
  })
  return pageStyle
}
