import {
  isPlainObject
}
  from 'uni-shared'

import {
  parseWebviewStyle
} from './parser/webview-style-parser'

import {
  parseNavigationBar
} from './parser/navigation-bar-parser'

let id = 2

const WEBVIEW_LISTENERS = {
  'pullToRefresh': 'onPullDownRefresh',
  'titleNViewSearchInputChanged': 'onNavigationBarSearchInputChanged',
  'titleNViewSearchInputConfirmed': 'onNavigationBarSearchInputConfirmed',
  'titleNViewSearchInputClicked': 'onNavigationBarSearchInputClicked'
}

export function createWebview (path, instanceContext, routeOptions) {
  const webviewId = id++
  const webviewStyle = parseWebviewStyle(
    webviewId,
    path,
    routeOptions,
    instanceContext
  )
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] createWebview`, webviewId, path, webviewStyle)
  }
  const webview = instanceContext.plus.webview.create('', String(webviewId), webviewStyle)

  webview.$navigationBar = parseNavigationBar(webviewStyle)

  return webview
}

export function initWebview (webview, instanceContext, routeOptions) {
  if (isPlainObject(routeOptions)) {
    const webviewStyle = parseWebviewStyle(
      parseInt(webview.id),
      '',
      routeOptions,
      instanceContext
    )
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] updateWebview`, webviewStyle)
    }

    webview.$navigationBar = parseNavigationBar(webviewStyle)

    webview.setStyle(webviewStyle)
  }
  // TODO subNVues
  Object.keys(WEBVIEW_LISTENERS).forEach(name => {
    webview.addEventListener(name, (e) => {
      instanceContext.UniServiceJSBridge.emit(WEBVIEW_LISTENERS[name], e, parseInt(webview.id))
    })
  })

  instanceContext.UniServiceJSBridge.on(webview.id + '.stopPullDownRefresh', () => {
    webview.endPullToRefresh()
  })

  return webview
}
