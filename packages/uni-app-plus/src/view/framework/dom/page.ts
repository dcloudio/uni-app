import {
  createScrollListener,
  CreateScrollListenerOptions,
  disableScrollListener,
  updateCssVar,
} from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'
import { PageCreateData } from '../../../PageAction'
import { createElement } from './elements'

export function onPageCreated() {}

export function onPageCreate({
  css,
  route,
  disableScroll,
  onPageScroll,
  onPageReachBottom,
  onReachBottomDistance,
  statusbarHeight,
  windowTop,
  windowBottom,
}: PageCreateData) {
  // 初始化页面容器元素
  initPageElement()

  if (css) {
    initPageCss(route)
  }

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

function initPageElement() {
  createElement(0, 'div').$ = document.getElementById('app')!
}

function initPageCss(route: string) {
  const element = document.createElement('link')
  element.type = 'text/css'
  element.rel = 'stylesheet'
  element.href = route + '.css'
  document.head.appendChild(element)
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
