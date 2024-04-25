import { useI18n } from '@dcloudio/uni-core'
import {
  API_SET_LOCALE,
  ON_WEBVIEW_READY,
  VD_SYNC,
} from '@dcloudio/uni-app-plus/constants'
import { onVdSync } from '../dom'

export function initSubscribeHandlers() {
  const { subscribe } = UniViewJSBridge
  subscribe(VD_SYNC, onVdSync)
  subscribe(API_SET_LOCALE, (local) => useI18n().setLocale(local))
  subscribe(ON_WEBVIEW_READY, onWebviewReady)
}

// service 主动会发起检测
function onWebviewReady() {
  UniViewJSBridge.publishHandler(ON_WEBVIEW_READY)
}
