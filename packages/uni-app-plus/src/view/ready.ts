import { ON_WEBVIEW_READY } from '../constants'
import { UniViewJSBridge } from './bridge'
;(window as any).UniViewJSBridge = UniViewJSBridge

function onWebviewReady() {
  UniViewJSBridge.publishHandler(ON_WEBVIEW_READY)
}
if (typeof plus !== 'undefined') {
  onWebviewReady()
} else {
  document.addEventListener('plusready', onWebviewReady)
}
