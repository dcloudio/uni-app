import { extend, hasOwn } from '@vue/shared'
import { removePlatformStyle } from '../pages'
import type { AppWindowOptions, PageWindowOptions, TabBar } from './types'

function trimJson(json: Record<string, any>) {
  delete json.maxWidth
  delete json.topWindow
  delete json.leftWindow
  delete json.rightWindow
  if (json.tabBar) {
    delete json.tabBar.matchMedia
  }
  return json
}

function convert(
  to: Record<string, any>,
  from: Record<string, any>,
  map: Record<string, string>
) {
  Object.keys(map).forEach((key) => {
    if (hasOwn(from, map[key])) {
      to[key] = from[map[key]]
    }
  })
  return to
}

export function parseWindowOptions(
  style: UniApp.PagesJsonPageStyle,
  platform: UniApp.PLATFORM,
  windowOptionsMap?: Record<string, string>
): PageWindowOptions | AppWindowOptions {
  if (!style) {
    return {}
  }
  const platformStyle = style[platform] || {}
  removePlatformStyle(trimJson(style) as any)
  const res: PageWindowOptions | AppWindowOptions = {}
  if (windowOptionsMap) {
    return extend(convert(res, style, windowOptionsMap), platformStyle)
  }
  return extend(res, style, platformStyle)
}

function trimTabBarJson(tabBar: UniApp.TabBarOptions) {
  ;(
    [
      'fontSize',
      'height',
      'iconWidth',
      'midButton',
      'selectedIndex',
      'spacing',
    ] as const
  ).forEach((name) => {
    delete tabBar[name]
  })
  return tabBar
}

export function parseTabBar(
  tabBar: UniApp.TabBarOptions,
  platform: UniApp.PLATFORM,
  tabBarOptionsMap?: Record<string, string>,
  tabBarItemOptionsMap?: Record<string, string>
): TabBar {
  const platformStyle = (tabBar as any)[platform] || {}
  removePlatformStyle(trimTabBarJson(tabBar) as any)
  const res = {} as TabBar
  if (tabBarOptionsMap) {
    if (tabBarItemOptionsMap && tabBar.list) {
      tabBar.list = tabBar.list.map((item) => {
        return convert(
          {},
          item,
          tabBarItemOptionsMap
        ) as UniApp.TabBarItemOptions
      })
    }
    convert(res, tabBar, tabBarOptionsMap)
    return extend(res, platformStyle)
  }
  return extend(res, tabBar, platformStyle)
}
