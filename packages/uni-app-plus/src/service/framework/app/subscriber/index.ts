import { subscribeServiceMethod } from '@dcloudio/uni-core'
import {
  ON_WEBVIEW_READY,
  VD_SYNC,
  WEBVIEW_INSERTED,
  WEBVIEW_REMOVED,
  WEB_INVOKE_APPSERVICE,
} from '../../../../constants'
import { onVdSync } from '../../dom'
import { onPlusMessage } from '../initGlobalEvent'
import { subscribeAd } from './ad'
import { subscribeNavigator } from './navigator'
import { subscribeWebviewReady } from './webviewReady'
import { onWebviewInserted, onWebviewRemoved } from './webviewLifeCycle'
import {
  onWebInvokeAppService,
  WebInvokeAppService,
} from '../../../onWebInvokeAppService'

export function initSubscribeHandlers() {
  const { subscribe, subscribeHandler } = UniServiceJSBridge

  onPlusMessage<{ type: string; data: Record<string, any>; pageId: number }>(
    'subscribeHandler',
    ({ type, data, pageId }) => {
      subscribeHandler(type, data, pageId)
    }
  )

  onPlusMessage<{
    data: Parameters<WebInvokeAppService>[0]
    webviewIds: string[]
  }>(WEB_INVOKE_APPSERVICE, ({ data, webviewIds }) => {
    onWebInvokeAppService(data, webviewIds)
  })

  if (__uniConfig.renderer !== 'native') {
    // 非纯原生
    subscribe(ON_WEBVIEW_READY, subscribeWebviewReady)
    subscribe(VD_SYNC, onVdSync)
    subscribeServiceMethod()
    subscribeAd()
    subscribeNavigator()
    subscribe(WEBVIEW_INSERTED, onWebviewInserted)
    subscribe(WEBVIEW_REMOVED, onWebviewRemoved)
  }
}
