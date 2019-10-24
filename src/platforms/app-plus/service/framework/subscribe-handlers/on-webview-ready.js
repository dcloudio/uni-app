import {
  preloadWebview,
  setPreloadWebview,
  consumeWebviewReady
} from '../webview'

import {
  perf
} from '../perf'

export default function onWebviewReady (data, pageId) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[uni-app] onWebviewReady.preloadWebview' + (preloadWebview && preloadWebview.id))
  }
  const isLaunchWebview = pageId === '1'
  if (isLaunchWebview) { // 首页
    setPreloadWebview(plus.webview.getLaunchWebview())
  } else if (!preloadWebview) { // preloadWebview 不存在，重新加载一下
    setPreloadWebview(plus.webview.getWebviewById(pageId))
  }
  if (preloadWebview.id !== pageId) {
    return console.error(`webviewReady[${preloadWebview.id}][${pageId}] not match`)
  }
  preloadWebview.loaded = true // 标记已 ready

  consumeWebviewReady(pageId)

  if (isLaunchWebview) {
    const entryPagePath = '/' + __uniConfig.entryPagePath
    const routeOptions = __uniRoutes.find(route => route.path === entryPagePath)
    if (!routeOptions.meta.isNVue) { // 非 nvue 首页，需要主动跳转
      const navigateType = routeOptions.meta.isTabBar ? 'switchTab' : 'navigateTo'
      process.env.NODE_ENV !== 'production' && perf(`${entryPagePath} navigateTo`)
      return uni[navigateType]({
        url: entryPagePath
      })
    }
  }
}
