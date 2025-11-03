import { getRouteOptions } from '@dcloudio/uni-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { ON_WEBVIEW_READY } from '../../../../constants'
import { $navigateTo } from '../../../api/route/navigateTo'
import { $switchTab } from '../../../api/route/switchTab'
import { preloadWebview, setPreloadWebview } from '../../webview'

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
    setPreloadWebview(plus.webview.getLaunchWebview())
  } else if (!preloadWebview) {
    // preloadWebview 不存在，重新加载一下
    setPreloadWebview(plus.webview.getWebviewById(pageId))
  }
  // 仅当 preloadWebview 未 loaded 时处理 （iOS崩溃也会继续走到这里，此时 preloadWebview 通常是 loaded 的，且两者 id 肯定不一样）
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
  const { autoclose, alwaysShowBeforeRender } = __uniConfig.splashscreen
  if (autoclose && !alwaysShowBeforeRender) {
    plus.navigator.closeSplashscreen()
  }
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
  if (!routeOptions?.meta?.isNVue) {
    // 非 nvue 首页，需要主动跳转
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
}
