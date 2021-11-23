import { getCurrentPage } from '@dcloudio/uni-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { ComponentPublicInstance } from 'vue'

export function getCurrentWebview() {
  const page = getCurrentPage()
  if (page) {
    return (page as ComponentPublicInstance).$getAppWebview!()
  }
  return null
}

export function getWebview(page?: ComponentPublicInstance) {
  if (page) {
    return page.$getAppWebview!()
  }
  return getCurrentWebview()
}

let pullDownRefreshWebview: PlusWebviewWebviewObject | null = null

export function getPullDownRefreshWebview() {
  return pullDownRefreshWebview
}

export function setPullDownRefreshWebview(
  webview: PlusWebviewWebviewObject | null
) {
  pullDownRefreshWebview = webview
}

export function isTabBarPage(path = '') {
  if (!(__uniConfig.tabBar && Array.isArray(__uniConfig.tabBar.list))) {
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
    const route = __uniRoutes.find((route) => route.path === path)
    return route && route.meta.isTabBar
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getCurrentPages is not ready')
    }
  }
  return false
}
