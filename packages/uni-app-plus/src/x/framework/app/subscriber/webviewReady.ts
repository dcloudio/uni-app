import { getRouteOptions } from '@dcloudio/uni-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { $navigateTo } from '../../../api/route/navigateTo'
import { $switchTab } from '../../../api/route/switchTab'
import { dispatchAppRouteNotFound } from '../../../api/route/appRoute'

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
  let entryPagePath = addLeadingSlash(__uniConfig.entryPagePath!)
  let routeOptions = getRouteOptions(entryPagePath)
  let isEntryPageNotFound = false
  if (!routeOptions) {
    isEntryPageNotFound = true
    dispatchAppRouteNotFound(
      entryPagePath + (__uniConfig.entryPageQuery || ''),
      'appLaunch'
    )
    if (__uniRoutes.length > 0) {
      entryPagePath = __uniRoutes[0].path
      routeOptions = getRouteOptions(addLeadingSlash(entryPagePath))
    } else {
      console.error('未匹配到路由，请检查配置')
      return
    }
  }

  const args = {
    url: entryPagePath + (__uniConfig.entryPageQuery || ''),
    openType: 'appLaunch',
  }
  const handler = { resolve() {}, reject() {} }
  if (routeOptions?.meta?.isTabBar) {
    return $switchTab(args, handler, 'appLaunch', !isEntryPageNotFound)
  }
  return $navigateTo(args, handler, 'appLaunch', !isEntryPageNotFound)
}

export function clearWebviewReady() {
  isLaunchWebviewReady = false
}
