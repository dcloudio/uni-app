import { isArray } from '@vue/shared'
import { addLeadingSlash, formatLog } from '@dcloudio/uni-shared'
import { getRouteOptions } from '@dcloudio/uni-core'

export function isTabBarPage(path = '') {
  if (!(__uniConfig.tabBar && isArray(__uniConfig.tabBar.list))) {
    return false
  }
  try {
    if (!path) {
      const pages = getCurrentPages()
      if (!pages.length) {
        return false
      }
      const page = pages[pages.length - 1]
      if (!page) {
        return false
      }
      return page.$page.meta.isTabBar
    }
    if (!/^\//.test(path)) {
      path = addLeadingSlash(path)
    }
    const route = getRouteOptions(path)
    return route && route.meta.isTabBar
  } catch (e) {
    if (__DEV__) {
      console.error(formatLog('isTabBarPage', e))
    }
  }
  return false
}
