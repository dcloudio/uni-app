import initSubscribe from 'uni-core/service/bridge/subscribe'

import {
  VD_SYNC,
  VD_SYNC_CALLBACK,
  INVOKE_API,
  WEBVIEW_READY,
  WEB_INVOKE_APPSERVICE,
  WEBVIEW_INSERTED,
  WEBVIEW_REMOVED
} from '../../../constants'

import {
  registerPlusMessage
} from '../plus-message'

import onWebviewReady from './on-webview-ready'

import onVdSync from './on-vd-sync'
import onVdSyncCallback from './on-vd-sync-callback'

import onInvokeApi from './on-invoke-api'
import onWebInvokeAppService from './on-web-invoke-app-service'
import onWxsInvokeCallMethod from './on-wxs-invoke-call-method'

import {
  onWebviewInserted,
  onWebviewRemoved
} from './on-webview-lifecycle'

export function initSubscribeHandlers () {
  const {
    on,
    emit,
    subscribe,
    publishHandler,
    subscribeHandler
  } = UniServiceJSBridge

  initSubscribe(subscribe, {
    getApp,
    getCurrentPages
  })

  registerPlusMessage('subscribeHandler', (data) => {
    subscribeHandler(data.type, data.data, data.pageId)
  })

  subscribe(WEBVIEW_READY, onWebviewReady)

  const entryPagePath = '/' + __uniConfig.entryPagePath
  const routeOptions = __uniRoutes.find(route => route.path === entryPagePath)
  if (!routeOptions.meta.isNVue) { // 首页是 vue
    // 防止首页 webview 初始化过早， service 还未开始监听
    publishHandler(WEBVIEW_READY, Object.create(null), [1])
  }
  // 应该使用subscribe，兼容老版本先用 on api 吧
  on('api.' + WEB_INVOKE_APPSERVICE, function (data, webviewIds) {
    emit('onWebInvokeAppService', data, webviewIds)
  })

  on('onWebInvokeAppService', onWebInvokeAppService)

  subscribe('onWxsInvokeCallMethod', onWxsInvokeCallMethod)

  subscribe(VD_SYNC, onVdSync)
  subscribe(VD_SYNC_CALLBACK, onVdSyncCallback)

  subscribe(INVOKE_API, onInvokeApi)

  subscribe(WEBVIEW_INSERTED, onWebviewInserted)
  subscribe(WEBVIEW_REMOVED, onWebviewRemoved)
}
