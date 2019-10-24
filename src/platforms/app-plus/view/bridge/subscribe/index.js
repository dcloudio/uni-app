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

function onPageCreate ({
  disableScroll,
  onPageScroll,
  onPageReachBottom,
  onReachBottomDistance
}, pageId) {
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
