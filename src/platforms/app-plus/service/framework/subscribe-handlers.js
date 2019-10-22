import {
  VD_SYNC,
  VD_SYNC_CALLBACK,
  WEBVIEW_READY
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

const vdSyncHandlers = Object.create(null)

export function registerVdSync (pageId, callback) {
  (vdSyncHandlers[pageId] || (vdSyncHandlers[pageId] = [])).push(callback)
}

export function removeVdSync (pageId) {
  delete vdSyncHandlers[pageId]
}

function onVdSync ({
  data,
  options
}, pageId) {
  const handlers = vdSyncHandlers[pageId]
  if (Array.isArray(handlers)) {
    handlers.forEach(handler => {
      handler(data)
    })
  } else {
    console.error(`vdSync[${pageId}] not found`)
  }
}

export const vdSyncCallbacks = [] // 数据同步 callback

function onVdSyncCallback () {
  const copies = vdSyncCallbacks.slice(0)
  vdSyncCallbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
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

  subscribe(VD_SYNC, onVdSync)
  subscribe(VD_SYNC_CALLBACK, onVdSyncCallback)
}
