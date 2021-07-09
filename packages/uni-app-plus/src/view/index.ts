import '../../style/framework/base.css'
import '@dcloudio/uni-h5/style/framework/nvue.css'

import { ON_WEBVIEW_READY } from '../constants'
import { UniViewJSBridge } from './bridge'
import { initView } from './framework'
import * as uni from './api'
;(window as any).uni = uni
;(window as any).UniViewJSBridge = UniViewJSBridge
;(window as any).rpx2px = uni.upx2px

function onWebviewReady() {
  initView()
  UniViewJSBridge.publishHandler(ON_WEBVIEW_READY)
}
if (typeof plus !== 'undefined') {
  onWebviewReady()
} else {
  document.addEventListener('plusready', onWebviewReady)
}
