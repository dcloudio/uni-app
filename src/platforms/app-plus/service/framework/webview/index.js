import {
  parseWebviewStyle
} from './parser/webview-style-parser'

import {
  initSubNVues
} from './parser/sub-nvue-parser'

import {
  publish
} from '../../bridge'

import {
  VIEW_WEBVIEW_PATH
} from '../../constants'

import {
  WEBVIEW_READY
} from '../../../constants'

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

function onWebviewResize (webview) {
  webview.addEventListener('resize', ({
    width,
    height
  }) => {
    const landscape = Math.abs(plus.navigator.getOrientation()) === 90
    const res = {
      deviceOrientation: landscape ? 'landscape' : 'portrait',
      size: {
        windowWidth: Math.ceil(width),
        windowHeight: Math.ceil(height)
      }
    }
    publish('onViewDidResize', res) // API
    UniServiceJSBridge.emit('onResize', res, parseInt(webview.id)) // Page lifecycle
  })
}

function onWebviewRecovery (webview, routeOptions) {
  const {
    subscribe,
    unsubscribe
  } = UniServiceJSBridge

  const id = webview.id
  const onWebviewRecoveryReady = function (data, pageId) {
    if (id !== pageId) {
      return
    }
    unsubscribe(WEBVIEW_READY, onWebviewRecoveryReady)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`UNIAPP[webview][${this.id}]:onWebviewRecoveryReady ready`)
    }
    // 恢复目标页面
    pageId = parseInt(pageId)
    const page = getCurrentPages(true).find(page => page.$page.id === pageId)
    if (!page) {
      return console.error(`Page[${pageId}] not found`)
    }
    page.$vm._$vd.restore()
  }

  webview.addEventListener('recovery', e => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`UNIAPP[webview][${this.id}].recovery.reload:` + JSON.stringify({
        path: routeOptions.path,
        webviewId: id
      }))
    }
    subscribe(WEBVIEW_READY, onWebviewRecoveryReady)
  })
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

  initSubNVues(routeOptions, webview)

  // TODO 优化相关依赖性
  // webview.addEventListener('popGesture', e => {
  //   if (e.type === 'start') {
  //     // 开始拖拽,还原状态栏前景色
  //     this.restoreStatusBarStyle()
  //   } else if (e.type === 'end' && !e.result) {
  //     // 拖拽未完成,设置为当前状态栏前景色
  //     this.setStatusBarStyle()
  //   } else if (e.type === 'end' && e.result) {
  //     removeWebview(this.id)
  //     const lastWebview = getLastWebview()
  //     if (lastWebview) {
  //       publish('onAppRoute', {
  //         path: lastWebview.page.replace('.html', ''),
  //         query: {},
  //         openType: 'navigateBack',
  //         webviewId: lastWebview.id
  //       })
  //     }
  //   }
  // })

  webview.addEventListener('close', () => {
    if (webview.popupSubNVueWebviews) { // 移除所有 popupSubNVueWebview
      Object.keys(webview.popupSubNVueWebviews).forEach(id => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(
            `UNIAPP[webview][${webview.id}]:popupSubNVueWebview[${id}].close`
          )
        }
        webview.popupSubNVueWebviews[id].close('none')
      })
    }
  })

  Object.keys(WEBVIEW_LISTENERS).forEach(name => {
    webview.addEventListener(name, (e) => {
      emit(WEBVIEW_LISTENERS[name], e, parseInt(webview.id))
    })
  })

  onWebviewResize(webview)

  if (plus.os.name === 'iOS' && webview.nvue) {
    onWebviewRecovery(webview, routeOptions)
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
