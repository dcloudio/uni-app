const webviewIds = []

const UNIAPP_SERVICE_NVUE_ID = '__uniapp__service'
const WEB_INVOKE_APPSERVICE = 'WEB_INVOKE_APPSERVICE'

const publish = function (method, params) {
  const paramsObj = {
    options: {
      timestamp: +new Date()
    },
    name: method,
    arg: params
  }
  if (!window.plus) { // h5
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
  const paramsString = JSON.stringify(paramsObj)
  if (plus.webview.getWebviewById(UNIAPP_SERVICE_NVUE_ID)) {
    plus.webview.postMessageToUniNView({
      type: WEB_INVOKE_APPSERVICE,
      args: {
        data: paramsObj,
        webviewIds
      }
    }, UNIAPP_SERVICE_NVUE_ID)
  } else {
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
    if (window.plus) {
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
