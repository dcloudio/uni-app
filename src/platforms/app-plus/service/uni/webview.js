const WEBVIEW_LISTENERS = [
  'close',
  'resize',
  'popGesture',
  'pullToRefresh',
  'titleNViewSearchInputChanged',
  'titleNViewSearchInputConfirmed',
  'titleNViewSearchInputClicked'
]

let id = 1

function parseWebviewStyle (path, windowOptions = {}) {
  return {
    titleNView: {
      autoBackButton: true,
      titleText: 'titleText'
    },
    uniNView: {
      path
    }
  }
}

function parseWindowOptions (windowOptions = {}, globalWindowOptions = {}) {
  // TODO
  return windowOptions
}

export function createWebview (path, {
  plus,
  __uniConfig
}, windowOptions) {
  return plus.webview.create(
    '',
    String(id++),
    parseWebviewStyle(
      path,
      parseWindowOptions(windowOptions, __uniConfig.window)
    ))
}

export function initWebview (webview, {
  UniJSServiceBridge
}) {
  // TODO subNVues
  WEBVIEW_LISTENERS.forEach(listener => {
    webview.addEventListener(listener, (e) => {
      UniJSServiceBridge.emit(listener, e)
    })
  })
}
