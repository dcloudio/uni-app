import {
  preloadWebview,
  createPreloadWebview,
  registerWebviewReady
} from './webview'

export const navigatorStack = []

export function navigate (path, callback) {
  let isReady = true
  if (navigatorStack.length) { // 已存在路由跳转
    isReady = false
  } else {
    callback.nvue = __uniConfig.page[path.slice(1)].nvue // 设置 nvue 标记
    // 非 nvue 且 preloadWebview 未准备好
    if (!callback.nvue && (!preloadWebview || !preloadWebview.loaded)) {
      isReady = false
    }
  }
  isReady ? callback() : navigatorStack.push(callback)
}

export function navigateStack (webview) {
  if (!navigatorStack.length) {
    return (!webview.nvue && createPreloadWebview())
  }
  const navigate = navigatorStack.shift()
  if (navigate.nvue) {
    navigate()
  } else {
    const preloadWebview = createPreloadWebview()
    preloadWebview.loaded ? navigate() : registerWebviewReady(preloadWebview.id, navigate)
  }
}
