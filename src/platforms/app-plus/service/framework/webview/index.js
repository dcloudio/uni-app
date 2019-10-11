import {
  parseWebviewStyle
} from './parser/webview-style-parser'

import {
  publish
} from '../../bridge'

import {
  VIEW_WEBVIEW_PATH
} from '../../constants'

export let preloadWebview

let id = 2

const WEBVIEW_LISTENERS = {
  'pullToRefresh': 'onPullDownRefresh',
  'titleNViewSearchInputChanged': 'onNavigationBarSearchInputChanged',
  'titleNViewSearchInputConfirmed': 'onNavigationBarSearchInputConfirmed',
  'titleNViewSearchInputClicked': 'onNavigationBarSearchInputClicked'
}

export function setPreloadWebview (webview) {
  preloadWebview = webview
}

export function createWebview (path, routeOptions) {
  if (routeOptions.meta.isNVue) {
    const webviewId = id++
    const webviewStyle = parseWebviewStyle(
      webviewId,
      path,
      routeOptions
    )
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] createWebview`, webviewId, path, webviewStyle)
    }
    return plus.webview.create('', String(webviewId), webviewStyle, {
      nvue: true
    })
  }
  if (id === 2) { // 如果首页非 nvue，则直接返回 Launch Webview
    return plus.webview.getLaunchWebview()
  }
  const webview = preloadWebview
  return webview
}

export function initWebview (webview, routeOptions) {
  // 首页或非 nvue 页面
  if (webview.id === '1' || !routeOptions.meta.isNVue) {
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

export function createPreloadWebview () {
  if (!preloadWebview || preloadWebview.__uniapp_route) { // 不存在，或已被使用
    preloadWebview = plus.webview.create(VIEW_WEBVIEW_PATH, String(id++))
  }
  return preloadWebview
}

const webviewReadyCallbacks = {}

export function registerWebviewReady (pageId, callback) {
  (webviewReadyCallbacks[pageId] || (webviewReadyCallbacks[pageId] = [])).push(callback)
}

export function consumeWebviewReady (pageId) {
  const callbacks = webviewReadyCallbacks[pageId]
  Array.isArray(callbacks) && callbacks.forEach(callback => callback())
  delete webviewReadyCallbacks[pageId]
}
