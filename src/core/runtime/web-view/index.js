import {
  hasOwn
} from 'uni-shared'

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
import {
  initWebviewApi as initQuickappWebviewApi
} from 'uni-platforms/quickapp-webview/runtime/web-view'
import {
  initWebviewApi as initKuaishouWebviewApi
} from 'uni-platforms/mp-kuaishou/runtime/web-view'
import {
  initWebviewApi as initLarkWebviewApi
} from 'uni-platforms/mp-lark/runtime/web-view'
import {
  initWebviewApi as initJDWebviewApi
} from 'uni-platforms/mp-jd/runtime/web-view'
import {
  initWebviewApi as initXhsWebviewApi
} from 'uni-platforms/mp-xhs/runtime/web-view'

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
  initQuickappWebviewApi,
  initKuaishouWebviewApi,
  initLarkWebviewApi,
  initJDWebviewApi,
  initXhsWebviewApi,
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

if (!api.navigateTo) {
  for (const key in webViewApi) {
    if (hasOwn(webViewApi, key)) {
      api[key] = webViewApi[key]
    }
  }
}
api.webView = webViewApi

export default api
