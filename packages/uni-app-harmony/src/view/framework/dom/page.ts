import {
  type CreateScrollListenerOptions,
  createScrollListener,
  disableScrollListener,
  updateCssVar,
} from '@dcloudio/uni-core'
import {
  ON_PAGE_SCROLL,
  ON_REACH_BOTTOM,
  type PageCreateData,
  type UniNodeJSON,
  formatLog,
  scrollTo,
} from '@dcloudio/uni-shared'

import { UniElement } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniElement'
import { UniNode } from '@dcloudio/uni-app-plus/view/framework/dom/elements/UniNode'
import { BuiltInComponents } from './components'
export { $ } from '@dcloudio/uni-app-plus/view/framework/dom/store'
import { setElement } from '@dcloudio/uni-app-plus/view/framework/dom/page'

export function createElement(
  id: number,
  tag: string,
  parentNodeId: number,
  refNodeId: number,
  nodeJson: Partial<UniNodeJSON> = {}
) {
  let element: UniNode
  if (id === 0) {
    // initPageElement
    element = new UniNode(
      id,
      tag as string,
      parentNodeId,
      document.createElement(tag as string)
    )
  } else {
    const Component = BuiltInComponents[tag as keyof typeof BuiltInComponents]
    if (Component) {
      element = new Component(id, parentNodeId, refNodeId, nodeJson)
    } else {
      element = new UniElement(
        id,
        document.createElement(tag),
        parentNodeId,
        refNodeId,
        nodeJson
      )
    }
  }
  setElement(id, element)
  return element
}

const pageReadyCallbacks: (() => void)[] = []
let isPageReady = false
export function onPageReady(callback: () => void) {
  if (isPageReady) {
    return callback()
  }
  pageReadyCallbacks.push(callback)
}

function setPageReady() {
  if (__DEV__) {
    console.log(formatLog('setPageReady', pageReadyCallbacks.length))
  }
  isPageReady = true
  pageReadyCallbacks.forEach((fn) => {
    try {
      fn()
    } catch (e: unknown) {
      console.error(e)
    }
  })
  pageReadyCallbacks.length = 0
}

export function onPageCreated() {}

export function onPageCreate({
  css,
  route,
  platform,
  pixelRatio,
  windowWidth,
  disableScroll,
  // 因为组合式API的提供，不再在create时初始化，而是在监听后，主动通知
  // onPageScroll,
  // onPageReachBottom,
  // onReachBottomDistance,
  statusbarHeight,
  windowTop,
  windowBottom,
  nvueFlexDirection,
}: PageCreateData) {
  initPageInfo(route)
  initSystemInfo(platform, pixelRatio, windowWidth)
  // 初始化页面容器元素
  initPageElement()

  const pageId = plus.webview.currentWebview().id!
  ;(window as any).__id__ = pageId
  document.title = `${route}[${pageId}]`

  initCssVar(statusbarHeight, windowTop, windowBottom)

  if (disableScroll) {
    document.addEventListener('touchmove', disableScrollListener)
  }

  if (nvueFlexDirection) {
    initPageNVueCss(nvueFlexDirection)
  }

  if (css) {
    initPageCss(route)
  } else {
    setPageReady()
  }
}

function initPageInfo(route: string) {
  ;(window as any).__PAGE_INFO__ = {
    route,
  }
}

function initSystemInfo(
  platform: string,
  pixelRatio: number,
  windowWidth: number
) {
  ;(window as any).__SYSTEM_INFO__ = {
    platform,
    pixelRatio,
    windowWidth,
  }
}

function initPageElement() {
  createElement(0, 'div', -1, -1).$ = document.getElementById('app')!
}

function initPageCss(route: string) {
  if (__DEV__) {
    console.log(formatLog('initPageCss', route + '.css'))
  }
  const element = document.createElement('link')
  element.type = 'text/css'
  element.rel = 'stylesheet'
  element.href = route + '.css'
  element.onload = setPageReady
  element.onerror = setPageReady
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

let isPageScrollInited = false

export function initPageScroll(onReachBottomDistance: number) {
  if (isPageScrollInited) {
    return
  }
  isPageScrollInited = true
  // 简单起见，只要监听了onPageScroll，也同时绑定onReachBottom，本身onReachBottom触发不频繁
  const opts: CreateScrollListenerOptions = {
    onReachBottomDistance,
    onPageScroll(scrollTop) {
      UniViewJSBridge.publishHandler(ON_PAGE_SCROLL, { scrollTop })
    },
    onReachBottom() {
      UniViewJSBridge.publishHandler(ON_REACH_BOTTOM)
    },
  }
  // 避免监听太早，直接触发了 scroll
  requestAnimationFrame(() =>
    document.addEventListener('scroll', createScrollListener(opts))
  )
}

export function pageScrollTo(
  {
    scrollTop,
    selector,
    duration,
  }: { selector?: string; scrollTop?: number; duration?: number },
  publish: (err?: string) => void
) {
  scrollTo(selector! || scrollTop! || 0, duration!)
  publish()
}

function initPageNVueCss(nvueFlexDirection: string) {
  const element = document.createElement('style')
  element.innerHTML = nvueCss(nvueFlexDirection)
  document.head.appendChild(element)
}

function nvueCss(nvueFlexDirection: string) {
  return `
uni-view,
uni-label,
uni-swiper-item,
uni-scroll-view {
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;
  align-items: stretch;
  align-content: flex-start;
}

uni-button {
  margin: 0;
}

uni-view,
uni-label,
uni-swiper-item {
  flex-direction: ${nvueFlexDirection};
}

uni-view,
uni-image,
uni-input,
uni-scroll-view,
uni-swiper,
uni-swiper-item,
uni-text,
uni-textarea,
uni-video {
  position: relative;
  border: 0px solid #000000;
  box-sizing: border-box;
}

uni-swiper-item {
  position: absolute;
}
`
}
