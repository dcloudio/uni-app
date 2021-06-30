import { ON_WEBVIEW_READY } from 'packages/uni-app-plus/src/constants'
import { registerPlusMessage } from '../plusMessage'
import { onWebviewReady } from './onWebviewReady'

export function initSubscribeHandlers() {
  const { subscribe, subscribeHandler } = UniServiceJSBridge
  registerPlusMessage('subscribeHandler', (data) => {
    subscribeHandler(data.type, data.data, data.pageId)
  })

  if (__uniConfig.renderer !== 'native') {
    // 非纯原生
    subscribe(ON_WEBVIEW_READY, onWebviewReady)
  }
}
