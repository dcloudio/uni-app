import '../../style/framework/base.css'
import '@dcloudio/uni-h5/style/framework/nvue.css'

import { ON_WEBVIEW_READY } from '../constants'
import { UniViewJSBridge } from './bridge'
import { initView } from './framework'
;(window as any).UniViewJSBridge = UniViewJSBridge

function onWebviewReady() {
  initView()
  UniViewJSBridge.publishHandler(ON_WEBVIEW_READY)
}
if (typeof plus !== 'undefined') {
  onWebviewReady()
} else {
  document.addEventListener('plusready', onWebviewReady)
}
