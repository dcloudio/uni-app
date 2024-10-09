import type { ComponentPublicInstance } from 'vue'
import { hasOwn } from '@vue/shared'
import {
  EventChannel,
  NAVBAR_HEIGHT,
  ON_HIDE,
  ON_REACH_BOTTOM_DISTANCE,
  ON_SHOW,
  type PageNodeOptions,
  formatLog,
} from '@dcloudio/uni-shared'
import {
  initPageInternalInstance,
  initPageVm,
  invokeHook,
} from '@dcloudio/uni-core'

import { initEntry } from '../app/initEntry'
import { initRouteOptions } from './routeOptions'
import { createWebview, initWebview } from '../webview'
import { createVuePage } from './define'
import { getStatusbarHeight } from '../../../helpers/statusBar'
import tabBar from '../app/tabBar'
import {
  addCurrentPage,
  getAllPages,
  getCurrentBasePages,
  getPage$BasePage,
} from './getCurrentPages'
import { getBaseSystemInfo } from '../../api/base/getBaseSystemInfo'
import { type PreloadWebviewObject, preloadWebviews } from './preLoad'
import { navigateFinish } from '../../api/route/utils'
import { initScope } from './setup'

export interface RegisterPageOptions {
  url: string
  path: string
  query: Record<string, string>
  openType: UniApp.OpenType
  webview?: PlusWebviewWebviewObject
  nvuePageVm?: ComponentPublicInstance
  eventChannel?: EventChannel
}

export function registerPage({
  url,
  path,
  query,
  openType,
  webview,
  nvuePageVm,
  eventChannel,
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
      if (getCurrentBasePages().find((page) => page === _webview.__page__)) {
        if (__DEV__) {
          console.log(
            formatLog(
              'uni-app',
              `preloadWebview(${path},${_webview.id}) already in use`
            )
          )
        }
        webview = undefined
      } else {
        if (eventChannel) {
          getPage$BasePage(_webview.__page__).eventChannel = eventChannel
        }
        if (openType === 'launch') {
          // 热更 preloadPage
          updatePreloadPageVm(
            url,
            path,
            query,
            _webview,
            nvuePageVm!,
            eventChannel
          )
        } else {
          addCurrentPage(_webview.__page__)
        }

        if (__DEV__) {
          console.log(
            formatLog('uni-app', `reuse preloadWebview(${path},${_webview.id})`)
          )
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

  const route = path.slice(1)
  ;(webview as any).__uniapp_route = route

  const pageInstance = initPageInternalInstance(
    openType,
    url,
    query,
    routeOptions.meta,
    eventChannel,
    (__uniConfig.darkmode
      ? plus.navigator.getUIStyle()
      : 'light') as UniApp.ThemeMode
  )

  const id = parseInt(webview.id!)

  if ((webview as any).nvue) {
    if (nvuePageVm) {
      // 首页或者开发时热刷
      initNVuePage(id, nvuePageVm, pageInstance)
    } else {
      // 正常路由跳转
      createNVuePage(id, webview, pageInstance)
    }
  } else {
    createVuePage(id, route, query, pageInstance, initPageOptions(routeOptions))
  }
  return webview
}

function updatePreloadPageVm(
  url: string,
  path: string,
  query: Record<string, string>,
  webview: PreloadWebviewObject,
  nvuePageVm: ComponentPublicInstance,
  eventChannel?: EventChannel
) {
  const routeOptions = initRouteOptions(path, 'preloadPage')
  routeOptions.meta.id = parseInt(webview.id)
  const pageInstance = initPageInternalInstance(
    'preloadPage',
    url,
    query,
    routeOptions.meta,
    eventChannel,
    (__uniConfig.darkmode
      ? plus.navigator.getUIStyle()
      : 'light') as UniApp.ThemeMode
  )
  initPageVm(nvuePageVm!, pageInstance)
  webview.__page__ = nvuePageVm
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

function initNVuePage(
  id: number,
  nvuePageVm: ComponentPublicInstance,
  pageInstance: Page.PageInstance['$page']
) {
  initPageVm(nvuePageVm, pageInstance)
  addCurrentPage(initScope(id, nvuePageVm, pageInstance))
  if (id === 1) {
    // 首页是 nvue 时，在 registerPage 时，执行路由堆栈
    if (
      __uniConfig.splashscreen &&
      __uniConfig.splashscreen.autoclose &&
      !__uniConfig.splashscreen.alwaysShowBeforeRender
    ) {
      plus.navigator.closeSplashscreen()
    }
    __uniConfig.onReady(function () {
      navigateFinish()
    })
  }
}

export function createNVuePage(
  pageId: number,
  webview: PlusWebviewWebviewObject,
  pageInstance: Page.PageInstance['$page']
) {
  const fakeNVueVm = {
    $: {},
    $getAppWebview() {
      return webview
    },
    getOpenerEventChannel() {
      if (!pageInstance.eventChannel) {
        pageInstance.eventChannel = new EventChannel(pageId)
      }
      return pageInstance.eventChannel as EventChannel
    },
    __setup(vm: ComponentPublicInstance, curFakeNVueVm: unknown) {
      vm.$getAppWebview = () => webview
      vm.getOpenerEventChannel = (curFakeNVueVm as any).getOpenerEventChannel
      // 替换真实的 nvue 的 vm
      initPageVm(vm, pageInstance)
      if ((webview as PreloadWebviewObject).__preload__) {
        ;(webview as PreloadWebviewObject).__page__ = vm
      }
      const pages = getAllPages()
      const index = pages.findIndex((p) => p === curFakeNVueVm)
      if (index > -1) {
        pages.splice(index, 1, vm)
      }
    },
  } as unknown as ComponentPublicInstance
  initPageVm(fakeNVueVm, pageInstance)
  if ((webview as PreloadWebviewObject).__preload__) {
    ;(webview as PreloadWebviewObject).__page__ = fakeNVueVm

    webview.addEventListener('show', () => {
      invokeHook((webview as PreloadWebviewObject).__page__!, ON_SHOW)
    })
    webview.addEventListener('hide', () => {
      invokeHook((webview as PreloadWebviewObject).__page__!, ON_HIDE)
    })
  } else {
    addCurrentPage(fakeNVueVm)
  }
}
