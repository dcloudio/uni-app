import { getRouteOptions } from '@dcloudio/uni-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { $navigateTo } from '../../../api/route/navigateTo'
import { $switchTab } from '../../../api/route/switchTab'
import {
  getPreloadWebview,
  setPreloadWebview,
} from '@dcloudio/uni-app-plus/service/framework/webview'
import { ON_WEBVIEW_READY } from '@dcloudio/uni-app-plus/constants'

let isLaunchWebviewReady = false // 目前首页双向确定 ready，可能会导致触发两次 onWebviewReady
export function subscribeWebviewReady(_data: unknown, pageId: string) {
  const isLaunchWebview = pageId === '1'
  if (isLaunchWebview && isLaunchWebviewReady) {
    if (__DEV__) {
      console.log('[uni-app] onLaunchWebviewReady.prevent')
    }
    return
  }
  let preloadWebview = getPreloadWebview()
  if (isLaunchWebview) {
    // 首页
    isLaunchWebviewReady = true
    preloadWebview = setPreloadWebview(plus.webview.getLaunchWebview())
  } else if (!preloadWebview) {
    // preloadWebview 不存在，重新加载一下
    preloadWebview = setPreloadWebview(plus.webview.getWebviewById(pageId))
  }
  // 仅当 preloadWebview 未 loaded 时处理
  if (!preloadWebview.loaded) {
    if (preloadWebview.id !== pageId) {
      return console.error(
        `webviewReady[${preloadWebview.id}][${pageId}] not match`
      )
    }
    ;(preloadWebview as any).loaded = true // 标记已 ready
  }
  UniServiceJSBridge.emit(ON_WEBVIEW_READY + '.' + pageId)
  isLaunchWebview && onLaunchWebviewReady()
}

function onLaunchWebviewReady() {
  // TODO closeSplashscreen
  let entryPagePath = addLeadingSlash(__uniConfig.entryPagePath!)
  let routeOptions = getRouteOptions(entryPagePath)
  if (!routeOptions) {
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
    return $switchTab(args, handler)
  }
  return $navigateTo(args, handler)
}
