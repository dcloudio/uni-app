import '@dcloudio/uni-app-plus/style/framework/base.css'
import '@dcloudio/uni-components/style/resize-sensor.css'
import { initView } from '@dcloudio/uni-core'
import { formatAppLog } from '@dcloudio/uni-app'
import { ON_WEBVIEW_READY } from '@dcloudio/uni-app-plus/constants'
import { UniViewJSBridge } from './bridge'
import * as uni from './api'
import { initSubscribeHandlers } from './framework/subscriber'
import { $ } from './framework/dom/page'
import { initViewMethods } from '@dcloudio/uni-app-plus/view/framework/viewMethods'
import {
  normalizeStyleName,
  normalizeStyleValue,
} from '@dcloudio/uni-app-plus/view/utils'
import plus from './plus'
;(window as any).plus = plus
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
  UniViewJSBridge.publishHandler(ON_WEBVIEW_READY)
}
if (typeof plus !== 'undefined') {
  onWebviewReady()
} else {
  document.addEventListener('plusready', onWebviewReady)
}
