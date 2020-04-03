import {
  stringifyQuery
} from 'uni-shared'

import {
  parseWebviewStyle
} from './parser/webview-style-parser'

import {
  initSubNVues
} from './parser/sub-nvue-parser'

import {
  VIEW_WEBVIEW_PATH
} from '../../constants'

import {
  onWebviewClose
} from './on-webview-close'

import {
  onWebviewResize
} from './on-webview-resize'

import {
  onWebviewRecovery
} from './on-webview-recovery'

import {
  onWebviewPopGesture
} from './on-webview-pop-gesture'

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

function noop (str) {
  return str
}

function getUniPageUrl (path, query) {
  const queryString = query ? stringifyQuery(query, noop) : ''
  return {
    path: path.substr(1),
    query: queryString ? queryString.substr(1) : queryString
  }
}

function getDebugRefresh (path, query, routeOptions) {
  const queryString = query ? stringifyQuery(query, noop) : ''
  return {
    isTab: routeOptions.meta.isTabBar,
    arguments: JSON.stringify({
      path: path.substr(1),
      query: queryString ? queryString.substr(1) : queryString
    })
  }
}

export function createWebview (path, routeOptions, query) {
  if (routeOptions.meta.isNVue) {
    const webviewId = id++
    const webviewStyle = parseWebviewStyle(
      webviewId,
      path,
      routeOptions
    )
    webviewStyle.uniPageUrl = getUniPageUrl(path, query)
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

export function initWebview (webview, routeOptions, path, query) {
  // 首页或非 nvue 页面
  if (webview.id === '1' || !routeOptions.meta.isNVue) {
    const webviewStyle = parseWebviewStyle(
      parseInt(webview.id),
      '',
      routeOptions
    )

    webviewStyle.uniPageUrl = getUniPageUrl(path, query)

    if (!routeOptions.meta.isNVue) {
      webviewStyle.debugRefresh = getDebugRefresh(path, query, routeOptions)
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] updateWebview`, webviewStyle)
    }

    webview.setStyle(webviewStyle)
  }

  const {
    on,
    emit
  } = UniServiceJSBridge

  initSubNVues(routeOptions, webview)

  Object.keys(WEBVIEW_LISTENERS).forEach(name => {
    webview.addEventListener(name, (e) => {
      emit(WEBVIEW_LISTENERS[name], e, parseInt(webview.id))
    })
  })

  onWebviewClose(webview)
  onWebviewResize(webview)

  if (plus.os.name === 'iOS') {
    !webview.nvue && onWebviewRecovery(webview, routeOptions)
    onWebviewPopGesture(webview)
  }

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
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] preloadWebview[${preloadWebview.id}]`)
    }
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
