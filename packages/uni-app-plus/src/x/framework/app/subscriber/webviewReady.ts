import { getRouteOptions } from '@dcloudio/uni-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { $navigateTo } from '../../../api/route/navigateTo'
import { $switchTab } from '../../../api/route/switchTab'

let isLaunchWebviewReady = false // 目前首页双向确定 ready，可能会导致触发两次 onWebviewReady(主要是 Android)
export function subscribeWebviewReady(_data: unknown, pageId: string) {
  const isLaunchWebview = pageId === '1'
  if (isLaunchWebview && isLaunchWebviewReady) {
    if (__DEV__) {
      console.log('[uni-app] onLaunchWebviewReady.prevent')
    }
    return
  }
  if (isLaunchWebview) {
    // 首页
    isLaunchWebviewReady = true
  }

  isLaunchWebview && onLaunchWebviewReady()
}

function onLaunchWebviewReady() {
  // TODO uni-app x
  // const { autoclose, alwaysShowBeforeRender } = __uniConfig.splashscreen
  // if (autoclose && !alwaysShowBeforeRender) {
  //   plus.navigator.closeSplashscreen()
  // }
  const entryPagePath = addLeadingSlash(__uniConfig.entryPagePath!)
  const routeOptions = getRouteOptions(entryPagePath)!

  const args = {
    url: entryPagePath + (__uniConfig.entryPageQuery || ''),
    openType: 'appLaunch',
  }
  const handler = { resolve() {}, reject() {} }
  if (routeOptions.meta.isTabBar) {
    return $switchTab(args, handler)
  }
  return $navigateTo(args, handler)
}

export function clearWebviewReady() {
  isLaunchWebviewReady = false
}
