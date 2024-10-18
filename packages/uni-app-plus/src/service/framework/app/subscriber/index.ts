import { getRouteOptions, subscribeServiceMethod } from '@dcloudio/uni-core'
import {
  ON_WXS_INVOKE_CALL_METHOD,
  WEB_INVOKE_APPSERVICE,
  addLeadingSlash,
} from '@dcloudio/uni-shared'
import {
  ON_WEBVIEW_READY,
  VD_SYNC,
  WEBVIEW_INSERTED,
  WEBVIEW_REMOVED,
} from '../../../../constants'
import { onVdSync } from '../../dom'
import { onPlusMessage } from '../initGlobalEvent'
import { subscribeAd } from './ad'
import { subscribeNavigator } from './navigator'
import { subscribeWebviewReady } from './webviewReady'
import { subscribeGetLocation } from '../../../api/location/getLocation'
import { subscribeMapPlaceSearch } from '../../../api/location/LoctaionPickerPage'
import { onWebviewInserted, onWebviewRemoved } from './webviewLifecycle'
import {
  type WebInvokeAppService,
  onWebInvokeAppService,
} from './webInvokeAppService'
import { onWxsInvokeCallMethod } from './wxs'

export function initSubscribeHandlers() {
  const { subscribe, subscribeHandler, publishHandler } = UniServiceJSBridge

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
    subscribe(ON_WXS_INVOKE_CALL_METHOD, onWxsInvokeCallMethod)

    const routeOptions = getRouteOptions(
      addLeadingSlash(__uniConfig.entryPagePath!)
    )
    if (routeOptions && !routeOptions.meta.isNVue) {
      // 防止首页 webview 初始化过早， service 还未开始监听
      publishHandler(ON_WEBVIEW_READY, {}, 1)
    }
    subscribeGetLocation()
    subscribeMapPlaceSearch()
  }
}
