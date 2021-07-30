import { ComponentPublicInstance } from 'vue'
import { hasOwn } from '@vue/shared'
import {
  formatLog,
  NAVBAR_HEIGHT,
  ON_REACH_BOTTOM_DISTANCE,
  PageNodeOptions,
} from '@dcloudio/uni-shared'
import { initPageInternalInstance, initPageVm } from '@dcloudio/uni-core'

import { initEntry } from '../app/initEntry'
import { initRouteOptions } from './routeOptions'
import { createWebview, initWebview } from '../webview'
import { createPage } from './define'
import { getStatusbarHeight } from '../../../helpers/statusBar'
import tabBar from '../app/tabBar'
import { addCurrentPage } from './getCurrentPages'
import { getBaseSystemInfo } from '../../api/base/getBaseSystemInfo'
import { preloadWebviews, PreloadWebviewObject } from './preLoad'

interface RegisterPageOptions {
  url: string
  path: string
  query: Record<string, string>
  openType: UniApp.OpenType
  webview?: PlusWebviewWebviewObject
  vm?: ComponentPublicInstance // nvue vm instance
  // eventChannel: unknown
}

export function registerPage({
  url,
  path,
  query,
  openType,
  webview,
  vm,
}: RegisterPageOptions) {
  // fast 模式，nvue 首页时，会在nvue中主动调用registerPage并传入首页webview，此时初始化一下首页（因为此时可能还未调用registerApp）
  if (webview) {
    initEntry()
  }

  if (preloadWebviews[url]) {
    webview = preloadWebviews[url]
    const _webview = webview as PreloadWebviewObject
    if (_webview.__page__) {
      // 该预载页面已处于显示状态,不再使用该预加载页面,直接新开
      if (getCurrentPages().find((page) => page === _webview.__page__)) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(
            `[uni-app] preloadWebview(${path},${_webview.id}) already in use`
          )
        }
        webview = undefined
      } else {
        // TODO eventChannel
        addCurrentPage(_webview.__page__)
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[uni-app] reuse preloadWebview(${path},${_webview.id})`)
        }
        return _webview
      }
    }
  }

  const routeOptions = initRouteOptions(path, openType)

  if (!webview) {
    webview = createWebview({ path, routeOptions, query })
  } else {
    webview = plus.webview.getWebviewById(webview.id)
    ;(webview as any).nvue = routeOptions.meta.isNVue
  }

  routeOptions.meta.id = parseInt(webview.id!)

  const isTabBar = !!routeOptions.meta.isTabBar
  if (isTabBar) {
    tabBar.append(webview)
  }

  if (__DEV__) {
    console.log(formatLog('registerPage', path, webview.id))
  }

  initWebview(webview, path, query, routeOptions.meta)

  const route = path.substr(1)
  ;(webview as any).__uniapp_route = route

  const pageInstance = initPageInternalInstance(
    openType,
    url,
    query,
    routeOptions.meta
  )

  if (!(webview as any).nvue) {
    createPage(
      parseInt(webview.id!),
      route,
      query,
      pageInstance,
      initPageOptions(routeOptions)
    )
  } else {
    initPageVm(vm!, pageInstance)
    addCurrentPage(vm!)

    if ((webview as any).__preload__) {
      ;(webview as any).__page__ = vm
    }
  }
  return webview
}

function initPageOptions({ meta }: UniApp.UniRoute): PageNodeOptions {
  const statusbarHeight = getStatusbarHeight()
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo()
  return {
    css: true,
    route: meta.route,
    version: 1,
    locale: '',
    platform,
    pixelRatio,
    windowWidth,
    disableScroll: meta.disableScroll === true,
    onPageScroll: false,
    onPageReachBottom: false,
    onReachBottomDistance: hasOwn(meta, 'onReachBottomDistance')
      ? meta.onReachBottomDistance!
      : ON_REACH_BOTTOM_DISTANCE,
    statusbarHeight,
    windowTop:
      meta.navigationBar.type === 'float' ? statusbarHeight + NAVBAR_HEIGHT : 0,
    windowBottom:
      tabBar.indexOf(meta.route) >= 0 && tabBar.cover ? tabBar.height : 0,
  }
}
