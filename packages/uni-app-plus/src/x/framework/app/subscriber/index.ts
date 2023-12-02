import { getRouteOptions, subscribeServiceMethod } from '@dcloudio/uni-core'
import {
  addLeadingSlash,
  ON_WXS_INVOKE_CALL_METHOD,
  WEB_INVOKE_APPSERVICE,
} from '@dcloudio/uni-shared'
import {
  ON_WEBVIEW_READY,
  VD_SYNC,
  WEBVIEW_INSERTED,
  WEBVIEW_REMOVED,
} from '../../../../constants'
import { subscribeWebviewReady } from './webviewReady'

export function initSubscribeHandlers() {
  // const { subscribe, subscribeHandler, publishHandler } = UniServiceJSBridge

  // onPlusMessage<{ type: string; data: Record<string, any>; pageId: number }>(
  //   'subscribeHandler',
  //   ({ type, data, pageId }) => {
  //     subscribeHandler(type, data, pageId)
  //   }
  // )

  // onPlusMessage<{
  //   data: Parameters<WebInvokeAppService>[0]
  //   webviewIds: string[]
  // }>(WEB_INVOKE_APPSERVICE, ({ data, webviewIds }) => {
  //   onWebInvokeAppService(data, webviewIds)
  // })

  // subscribe(ON_WEBVIEW_READY, subscribeWebviewReady)
  // subscribe(VD_SYNC, onVdSync)
  // subscribeServiceMethod()
  // subscribeAd()
  // subscribeNavigator()
  // subscribe(WEBVIEW_INSERTED, onWebviewInserted)
  // subscribe(WEBVIEW_REMOVED, onWebviewRemoved)
  // subscribe(ON_WXS_INVOKE_CALL_METHOD, onWxsInvokeCallMethod)

  // publishHandler(ON_WEBVIEW_READY, {}, 1)
  subscribeWebviewReady({}, '1')
}
