import {
  WEBVIEW_READY,
  WEBVIEW_UI_EVENT
} from '../../constants'

import {
  preloadWebview,
  setPreloadWebview,
  consumeWebviewReady
} from './webview'

import {
  registerPlusMessage
} from './plus-message'

import {
  perf
} from './perf'

function onWebviewReady (data, pageId) {
  const isLaunchWebview = pageId === '1'
  if (isLaunchWebview) { // 首页
    setPreloadWebview(plus.webview.getLaunchWebview())
  } else if (!preloadWebview) { // preloadWebview 不存在，重新加载一下
    setPreloadWebview(plus.webview.getWebviewById(pageId))
  }
  if (preloadWebview.id !== pageId) {
    return console.error(`webview[${pageId}] not found`)
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

const webviewUIEvents = Object.create(null)

export function registerWebviewUIEvent (pageId, callback) {
  (webviewUIEvents[pageId] || (webviewUIEvents[pageId] = [])).push(callback)
}

export function removeWebviewUIEvent (pageId) {
  delete webviewUIEvents[pageId]
}

function onWebviewUIEvent ({
  data,
  options
}, pageId) {
  const {
    cid,
    nid
  } = options
  const handlers = webviewUIEvents[pageId]
  if (Array.isArray(handlers)) {
    handlers.forEach(handler => {
      handler(cid, nid, data)
    })
  } else {
    console.error(`events[${pageId}] not found`)
  }
}

export function initSubscribeHandlers () {
  const {
    subscribe,
    subscribeHandler
  } = UniServiceJSBridge

  registerPlusMessage('subscribeHandler', (data) => {
    subscribeHandler(data.type, data.data, data.pageId)
  })
  // TODO 检测目标 preloadWebview 是否已准备好，因为 preloadWebview 准备好时，此处代码还没执行
  subscribe(WEBVIEW_READY, onWebviewReady)
  subscribe(WEBVIEW_UI_EVENT, onWebviewUIEvent)
}
