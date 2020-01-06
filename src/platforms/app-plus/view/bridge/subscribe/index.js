import {
  supportsPassive
} from 'uni-shared'

import {
  disableScroll as disableScrollListener,
  createScrollListener
} from 'uni-core/view/bridge/subscribe/scroll'

import {
  ON_PAGE_CREATE
} from '../../constants'

import {
  WEBVIEW_READY
} from '../../../constants'

const passiveOptions = supportsPassive ? {
  passive: false
} : false

function onCssVar ({
  statusbarHeight,
  windowTop,
  windowBottom
}) {
  global.__WINDOW_TOP = windowTop
  global.__WINDOW_BOTTOM = windowBottom
  if (uni.canIUse('css.var')) {
    const style = document.documentElement.style
    style.setProperty('--window-top', windowTop + 'px')
    style.setProperty('--window-bottom', windowBottom + 'px')
    style.setProperty('--status-bar-height', statusbarHeight + 'px')
    if (process.env.NODE_ENV !== 'production') {
      console.log(`--status-bar-height=${statusbarHeight}`)
      console.log(`--window-top=${windowTop}`)
      console.log(`--window-bottom=${windowBottom}`)
    }
  }
}

function onPageCreate ({
  statusbarHeight,
  windowTop,
  windowBottom,
  disableScroll,
  onPageScroll,
  onPageReachBottom,
  onReachBottomDistance
}, pageId) {
  onCssVar({
    statusbarHeight,
    windowTop,
    windowBottom
  })

  if (disableScroll) {
    document.addEventListener('touchmove', disableScrollListener, passiveOptions)
  } else if (onPageScroll || onPageReachBottom) {
    requestAnimationFrame(function () { // 避免监听太早，直接触发了 scroll
      document.addEventListener('scroll', createScrollListener(pageId, {
        enablePageScroll: onPageScroll,
        enablePageReachBottom: onPageReachBottom,
        onReachBottomDistance
      }))
    })
  }
}

function onWebviewReady () { // service 主动发起检测
  UniViewJSBridge.publishHandler('webviewReady')
}

export default function initSubscribe (subscribe) {
  subscribe(WEBVIEW_READY, onWebviewReady)
  subscribe(ON_PAGE_CREATE, onPageCreate)
}
