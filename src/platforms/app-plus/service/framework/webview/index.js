import {
  isPlainObject
}
  from 'uni-shared'

import {
  parseWebviewStyle
} from './parser/webview-style-parser'

import {
  publish
} from '../../bridge'

let id = 2

const WEBVIEW_LISTENERS = {
  'pullToRefresh': 'onPullDownRefresh',
  'titleNViewSearchInputChanged': 'onNavigationBarSearchInputChanged',
  'titleNViewSearchInputConfirmed': 'onNavigationBarSearchInputConfirmed',
  'titleNViewSearchInputClicked': 'onNavigationBarSearchInputClicked'
}

export function createWebview (path, routeOptions) {
  const webviewId = id++
  const webviewStyle = parseWebviewStyle(
    webviewId,
    path,
    routeOptions
  )
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] createWebview`, webviewId, path, webviewStyle)
  }
  const webview = plus.webview.create('', String(webviewId), webviewStyle)

  return webview
}

export function initWebview (webview, routeOptions) {
  if (isPlainObject(routeOptions)) {
    const webviewStyle = parseWebviewStyle(
      parseInt(webview.id),
      '',
      routeOptions
    )
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] updateWebview`, webviewStyle)
    }

    webview.setStyle(webviewStyle)
  }

  const {
    on,
    emit
  } = UniServiceJSBridge

  // TODO subNVues
  Object.keys(WEBVIEW_LISTENERS).forEach(name => {
    webview.addEventListener(name, (e) => {
      emit(WEBVIEW_LISTENERS[name], e, parseInt(webview.id))
    })
  })

  webview.addEventListener('resize', ({
    width,
    height
  }) => {
    const res = {
      size: {
        windowWidth: Math.ceil(width),
        windowHeight: Math.ceil(height)
      }
    }
    publish('onViewDidResize', res)
    emit('onResize', res, parseInt(webview.id))
  })

  // TODO 应该结束之前未完成的下拉刷新
  on(webview.id + '.startPullDownRefresh', () => {
    webview.beginPullToRefresh()
  })

  on(webview.id + '.stopPullDownRefresh', () => {
    webview.endPullToRefresh()
  })

  return webview
}
