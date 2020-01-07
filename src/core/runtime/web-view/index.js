import {
  initWebviewApi as initAppplusWebviewApi
} from 'uni-platforms/app-plus/runtime/web-view'
import {
  initWebviewApi as initH5WebviewApi
} from 'uni-platforms/h5/runtime/web-view'
import {
  initWebviewApi as initAlipayWebviewApi
} from 'uni-platforms/mp-alipay/runtime/web-view'
import {
  initWebviewApi as initBaiduWebviewApi
} from 'uni-platforms/mp-baidu/runtime/web-view'
import {
  initWebviewApi as initQQWebviewApi
} from 'uni-platforms/mp-qq/runtime/web-view'
import {
  initWebviewApi as initToutiaoWebviewApi
} from 'uni-platforms/mp-toutiao/runtime/web-view'
import {
  initWebviewApi as initWeixinWebviewApi
} from 'uni-platforms/mp-weixin/runtime/web-view'

const UniAppJSBridgeReady = function () {
  window.UniAppJSBridge = true
  document.dispatchEvent(new CustomEvent('UniAppJSBridgeReady', {
    bubbles: true,
    cancelable: true
  }))
}

const initWebviewApis = [
  initAppplusWebviewApi,
  initWeixinWebviewApi,
  initQQWebviewApi,
  initAlipayWebviewApi,
  initBaiduWebviewApi,
  initToutiaoWebviewApi,
  initH5WebviewApi
]

let webViewApi
for (let i = 0; i < initWebviewApis.length; i++) {
  webViewApi = initWebviewApis[i](UniAppJSBridgeReady)
  if (webViewApi) {
    break
  }
}

if (!webViewApi) {
  webViewApi = {}
}

const api = typeof uni !== 'undefined' ? uni : {}

if (api.navigateTo) {
  api.webView = webViewApi
} else {
  Object.assign(api, webViewApi, {
    webView: webViewApi
  })
}

export default api
