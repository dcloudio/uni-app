const webviewIds = []

const UNIAPP_SERVICE_NVUE_ID = '__uniapp__service'
const WEB_INVOKE_APPSERVICE = 'WEB_INVOKE_APPSERVICE'

function isNvue () {
  return (window.__dcloud_weex_postMessage || window.__dcloud_weex_)
}

function isUvue () {
  return (window.__uniapp_x_postMessage || window.__uniapp_x_)
}

const publish = function (method, params) {
  const paramsObj = {
    options: {
      timestamp: +new Date()
    },
    name: method,
    arg: params
  }

  if (isUvue()) { // uvue web-view
    if (method === 'postMessage') {
      const message = {
        data: params
      }
      if (window.__uniapp_x_postMessage) {
        return window.__uniapp_x_postMessage(message)
      } else {
        return window.__uniapp_x_.postMessage(JSON.stringify(message))
      }
    }

    const serviceMessage = {
      type: WEB_INVOKE_APPSERVICE,
      args: {
        data: paramsObj,
        webviewIds
      }
    }
    if (window.__uniapp_x_postMessage) {
      window.__uniapp_x_postMessageToService(serviceMessage)
    } else {
      window.__uniapp_x_.postMessageToService(JSON.stringify(serviceMessage))
    }
    return
  }

  if (isNvue()) { // nvue web-view
    if (method === 'postMessage') {
      const message = {
        data: [params]
      }
      if (window.__dcloud_weex_postMessage) {
        return window.__dcloud_weex_postMessage(message)
      } else {
        return window.__dcloud_weex_.postMessage(JSON.stringify(message))
      }
    }

    const serviceMessage = {
      type: WEB_INVOKE_APPSERVICE,
      args: {
        data: paramsObj,
        webviewIds
      }
    }
    if (window.__dcloud_weex_postMessage) {
      window.__dcloud_weex_postMessageToService(serviceMessage)
    } else {
      window.__dcloud_weex_.postMessageToService(JSON.stringify(serviceMessage))
    }
    return
  }

  if (!window.plus) { // h5 web-view
    return window.parent.postMessage({
      type: WEB_INVOKE_APPSERVICE,
      data: paramsObj,
      pageId: ''
    }, '*')
  }

  // app-plus
  if (webviewIds.length === 0) {
    const currentWebview = plus.webview.currentWebview()
    if (!currentWebview) {
      throw new Error('plus.webview.currentWebview() is undefined')
    }
    const parentWebview = currentWebview.parent()
    let webviewId = ''
    if (!parentWebview) {
      webviewId = currentWebview.id
      // throw new Error('plus.webview.currentWebview().parent() is undefined')
    } else {
      webviewId = parentWebview.id
    }
    webviewIds.push(webviewId)
  }
  if (plus.webview.getWebviewById(UNIAPP_SERVICE_NVUE_ID)) {
    plus.webview.postMessageToUniNView({
      type: WEB_INVOKE_APPSERVICE,
      args: {
        data: paramsObj,
        webviewIds
      }
    }, UNIAPP_SERVICE_NVUE_ID)
  } else {
    const paramsString = JSON.stringify(paramsObj)
    plus.webview.getLaunchWebview().evalJS(
      `UniPlusBridge.subscribeHandler("${WEB_INVOKE_APPSERVICE}",${paramsString},${JSON.stringify(webviewIds)});`
    )
  }
}

export default {
  navigateTo ({
    url
  } = {}) {
    publish('navigateTo', {
      url: encodeURI(url)
    })
  },
  navigateBack ({
    delta
  } = {}) {
    publish('navigateBack', {
      delta: parseInt(delta) || 1
    })
  },
  switchTab ({
    url
  } = {}) {
    publish('switchTab', {
      url: encodeURI(url)
    })
  },
  reLaunch ({
    url
  } = {}) {
    publish('reLaunch', {
      url: encodeURI(url)
    })
  },
  redirectTo ({
    url
  } = {}) {
    publish('redirectTo', {
      url: encodeURI(url)
    })
  },
  getEnv (callback) {
    /* eslint-disable standard/no-callback-literal */
    if (isUvue()) {
      // uniapp 环境中runtime-harmony 注入 __uniapp_x_ 变量，错误返回了 uvue:true
      // 不影响线上用户，目前增加 harmony:true 仅在 Uniapp+harmony 中返回
      const isUniapp = navigator.userAgent.includes('uni-app')
      const isHarmony = navigator.userAgent.includes('OpenHarmony')
      const obj = {
        uvue: true
      }
      if (isUniapp && isHarmony) {
        obj.harmony = true
      }
      callback(obj)
    } else if (isNvue()) {
      callback({
        nvue: true
      })
    } else if (window.plus) {
      callback({
        plus: true
      })
    } else {
      callback({
        h5: true
      })
    }
  },
  postMessage (params = {}) {
    publish('postMessage', params.data || {})
  }
}
