import { useI18n } from '@dcloudio/uni-core'
import { ON_WEBVIEW_READY, SET_LOCALE_API, VD_SYNC } from '../../../constants'
import { onVdSync } from '../dom'

export function initSubscribeHandlers() {
  const { subscribe } = UniViewJSBridge
  subscribe(VD_SYNC, onVdSync)
  subscribe(SET_LOCALE_API, useI18n().setLocale)
  subscribe(ON_WEBVIEW_READY, onWebviewReady)
}

// service 主动会发起检测
function onWebviewReady() {
  UniViewJSBridge.publishHandler('webviewReady')
}
