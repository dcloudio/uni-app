import {
  consumeWebviewReady,
  preloadWebview,
  setPreloadWebview,
} from '../../webview'

let isLaunchWebviewReady = false // 目前首页双向确定 ready，可能会导致触发两次 onWebviewReady(主要是 Android)
export function onWebviewReady(_data: unknown, pageId: string) {
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
  if (preloadWebview.id !== pageId) {
    return console.error(
      `webviewReady[${preloadWebview.id}][${pageId}] not match`
    )
  }
  ;(preloadWebview as any).loaded = true // 标记已 ready
  consumeWebviewReady(pageId)
  if (!isLaunchWebview) {
    return
  }
  const entryPagePath = '/' + __uniConfig.entryPagePath
  const routeOptions = __uniRoutes.find(
    (route) => route.path === entryPagePath
  )!
  if (!routeOptions.meta.isNVue) {
    // 非 nvue 首页，需要主动跳转
    const navigateType = routeOptions.meta.isTabBar ? 'switchTab' : 'navigateTo'
    return uni[navigateType]({
      url: entryPagePath + (__uniConfig.entryPageQuery || ''),
      openType: 'appLaunch',
    } as any)
  }
}
