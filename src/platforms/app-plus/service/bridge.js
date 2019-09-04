import {
  decode
} from 'base64-arraybuffer'

export {
  pack,
  unpack,
  invoke
} from 'uni-core/service/bridge'

export function requireNativePlugin (name) {
  return uni.requireNativePlugin(name)
}

/**
 * 触发 service 层，与 onMethod 对应
 */
export function publish (name, res) {
  return UniServiceJSBridge.emit('api.' + name, res)
}

let lastStatusBarStyle

export function setStatusBarStyle (statusBarStyle) {
  if (!statusBarStyle) {
    const pages = getCurrentPages()
    if (!pages.length) {
      return
    }
    statusBarStyle = pages[pages.length - 1].$page.meta.statusBarStyle
    if (!statusBarStyle || statusBarStyle === lastStatusBarStyle) {
      return
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] setStatusBarStyle`, statusBarStyle)
  }

  lastStatusBarStyle = statusBarStyle

  plus.navigator.setStatusBarStyle(statusBarStyle)
}

export function isTabBarPage (path = '') {
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
    const route = __uniRoutes.find(route => route.path.slice(1) === path)
    return route && route.meta.isTabBar
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getCurrentPages is not ready')
    }
  }
  return false
}

export function base64ToArrayBuffer (data) {
  return decode(data)
}
