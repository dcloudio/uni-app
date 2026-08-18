import { getRouteOptions } from '@dcloudio/uni-core'
import { addLeadingSlash, parseUrl } from '@dcloudio/uni-shared'
import { $navigateTo } from '../../../api/route/navigateTo'
import { $switchTab } from '../../../api/route/switchTab'
import {
  dispatchAppRouteNotFound,
  resolveAppRoute,
} from '../../../api/route/appRoute'

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
  let entryPageUrl =
    addLeadingSlash(__uniConfig.entryPagePath!) +
    (__uniConfig.entryPageQuery || '')
  let routeOptions = getRouteOptions(parseUrl(entryPageUrl).path)
  const appRoute = resolveAppRoute(entryPageUrl, 'appLaunch', !routeOptions)
  const isEntryPageNotFound = appRoute.context.event.notFound
  if (isEntryPageNotFound) {
    dispatchAppRouteNotFound(entryPageUrl, appRoute.context)
    if (__uniRoutes.length > 0) {
      entryPageUrl =
        addLeadingSlash(__uniRoutes[0].path) +
        (__uniConfig.entryPageQuery || '')
      routeOptions = getRouteOptions(parseUrl(entryPageUrl).path)
    } else {
      console.error('未匹配到路由，请检查配置')
      return
    }
  } else {
    entryPageUrl = appRoute.url
    routeOptions = getRouteOptions(parseUrl(entryPageUrl).path)
  }

  const args = {
    url: entryPageUrl,
    openType: 'appLaunch',
  }
  const handler = { resolve() {}, reject() {} }
  if (routeOptions?.meta?.isTabBar) {
    return $switchTab(
      args,
      handler,
      'appLaunch',
      !isEntryPageNotFound,
      isEntryPageNotFound ? undefined : appRoute
    )
  }
  return $navigateTo(
    args,
    handler,
    'appLaunch',
    !isEntryPageNotFound,
    isEntryPageNotFound ? undefined : appRoute
  )
}

export function clearWebviewReady() {
  isLaunchWebviewReady = false
}
