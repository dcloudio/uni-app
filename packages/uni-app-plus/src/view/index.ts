import '../../style/framework/base.css'
import '@dcloudio/uni-h5/style/framework/nvue.css'
import { initView } from '@dcloudio/uni-core'
import { ON_WEBVIEW_READY } from '../constants'
import { UniViewJSBridge } from './bridge'
import * as uni from './api'
import { preventDoubleTap } from './framework/gesture'
import { initSubscribeHandlers } from './framework/subscriber'
;(window as any).uni = uni
;(window as any).UniViewJSBridge = UniViewJSBridge
;(window as any).rpx2px = uni.upx2px

function onWebviewReady() {
  initView()
  initSubscribeHandlers()
  preventDoubleTap()
  UniViewJSBridge.publishHandler(ON_WEBVIEW_READY)
}
if (typeof plus !== 'undefined') {
  onWebviewReady()
} else {
  document.addEventListener('plusready', onWebviewReady)
}
