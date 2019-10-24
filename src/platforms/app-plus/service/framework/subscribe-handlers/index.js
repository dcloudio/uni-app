import {
  VD_SYNC,
  VD_SYNC_CALLBACK,
  WEBVIEW_READY
} from '../../../constants'

import {
  registerPlusMessage
} from '../plus-message'

import onWebviewReady from './on-webview-ready'

import onVdSync from './on-vd-sync'
import onVdSyncCallback from './on-vd-sync-callback'

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
