import {
  createScrollListener,
  CreateScrollListenerOptions,
  disableScrollListener,
  updateCssVar,
} from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'
import { PageCreateData } from '../../../../PageAction'

export function onPageCreate({
  route,
  disableScroll,
  onPageScroll,
  onPageReachBottom,
  onReachBottomDistance,
  statusbarHeight,
  windowTop,
  windowBottom,
}: PageCreateData) {
  const pageId = plus.webview.currentWebview().id!
  ;(window as any).__id__ = pageId
  document.title = `${route}[${pageId}]`

  initCssVar(statusbarHeight, windowTop, windowBottom)

  if (disableScroll) {
    document.addEventListener('touchmove', disableScrollListener)
  } else if (onPageScroll || onPageReachBottom) {
    initPageScroll(onPageScroll, onPageReachBottom, onReachBottomDistance)
  }
}

function initCssVar(
  statusbarHeight: number,
  windowTop: number,
  windowBottom: number
) {
  const cssVars = {
    '--window-left': '0px',
    '--window-right': '0px',
    '--window-top': windowTop + 'px',
    '--window-bottom': windowBottom + 'px',
    '--status-bar-height': statusbarHeight + 'px',
  }
  if (__DEV__) {
    console.log(formatLog('initCssVar', cssVars))
  }
  updateCssVar(cssVars)
}

function initPageScroll(
  onPageScroll: boolean,
  onPageReachBottom: boolean,
  onReachBottomDistance: number
) {
  const opts: CreateScrollListenerOptions = {}
  if (onPageScroll) {
    opts.onPageScroll = (scrollTop) => {
      UniViewJSBridge.publishHandler('onPageScroll', { scrollTop })
    }
  }
  if (onPageReachBottom) {
    opts.onReachBottomDistance = onReachBottomDistance
    opts.onReachBottom = () => UniViewJSBridge.publishHandler('onReachBottom')
  }
  // 避免监听太早，直接触发了 scroll
  requestAnimationFrame(() =>
    document.addEventListener('scroll', createScrollListener(opts))
  )
}
