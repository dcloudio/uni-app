import '../../style/framework/base.css'
import '@dcloudio/uni-h5/style/framework/nvue.css'
import '@dcloudio/uni-components/style/resize-sensor.css'
import { initView } from '@dcloudio/uni-core'
import { formatAppLog } from '@dcloudio/uni-app'
import { ON_WEBVIEW_READY } from '../constants'
import { UniViewJSBridge } from './bridge'
import * as uni from './api'
import { preventDoubleTap } from './framework/gesture'
import { initSubscribeHandlers } from './framework/subscriber'
import { $ } from './framework/dom/page'
import { initViewMethods } from './framework/viewMethods'
import { normalizeStyleName, normalizeStyleValue } from './utils'
;(window as any).uni = uni
;(window as any).UniViewJSBridge = UniViewJSBridge
;(window as any).rpx2px = uni.upx2px
;(window as any).normalizeStyleName = normalizeStyleName
;(window as any).normalizeStyleValue = normalizeStyleValue
;(window as any).__$__ = $
;(window as any).__f__ = formatAppLog

function onWebviewReady() {
  initView()
  initViewMethods()
  initSubscribeHandlers()
  preventDoubleTap()
  UniViewJSBridge.publishHandler(ON_WEBVIEW_READY)
}
if (typeof plus !== 'undefined') {
  onWebviewReady()
} else {
  document.addEventListener('plusready', onWebviewReady)
}
