import {
  App,
  ComponentPublicInstance,
  ConcreteComponent,
  createVNode,
  render,
} from 'vue'
import { extend } from '@vue/shared'
import { formatLog, UniNode } from '@dcloudio/uni-shared'
import { initAppVm, initService } from '@dcloudio/uni-core'

import { initEntry } from './initEntry'
import { initTabBar } from './initTabBar'
import { initGlobalEvent } from './initGlobalEvent'
import { initAppLaunch } from './initAppLaunch'
import { clearTempFile } from './clearTempFile'
import { initSubscribeHandlers } from './subscriber'

let appCtx: ComponentPublicInstance
const defaultApp = {
  globalData: {},
}

export function getApp({ allowDefault = false } = {}) {
  if (appCtx) {
    // 真实的 App 已初始化
    return appCtx
  }
  if (allowDefault) {
    // 返回默认实现
    return defaultApp
  }
  console.error(
    '[warn]: getApp() failed. Learn more: https://uniapp.dcloud.io/collocation/frame/window?id=getapp.'
  )
}

interface VueApp extends App {
  mountPage: (
    pageComponent: ConcreteComponent,
    pageProps: Record<string, any>,
    pageContainer: UniNode
  ) => ComponentPublicInstance
  unmountPage: (pageInstance: ComponentPublicInstance) => void
}

let vueApp: VueApp

export function getVueApp() {
  return vueApp
}

function initVueApp(appVm: ComponentPublicInstance) {
  const appContext = appVm.$.appContext
  return extend(appContext.app, {
    mountPage(
      pageComponent: ConcreteComponent,
      pageProps: Record<string, any>,
      pageContainer: UniNode
    ) {
      const vnode = createVNode(pageComponent, pageProps)
      // store app context on the root VNode.
      // this will be set on the root instance on initial mount.
      vnode.appContext = appContext
      render(vnode, pageContainer as unknown as Element)
      const publicThis = vnode.component!.proxy!
      ;(publicThis as any).__page_container__ = pageContainer
      return publicThis
    },
    unmountPage: (pageInstance: ComponentPublicInstance) => {
      const { __page_container__ } = pageInstance as any
      if (__page_container__) {
        __page_container__.isUnmounted = true
        render(null, __page_container__)
      }
    },
  })
}

export function registerApp(appVm: ComponentPublicInstance) {
  if (__DEV__) {
    console.log(formatLog('registerApp'))
  }

  vueApp = initVueApp(appVm)

  appCtx = appVm
  initAppVm(appCtx)

  extend(appCtx, defaultApp) // 拷贝默认实现

  const { $options } = appVm
  if ($options) {
    appCtx.globalData = extend($options.globalData || {}, appCtx.globalData)
  }

  initService()

  initEntry()
  initTabBar()
  initGlobalEvent()
  initSubscribeHandlers()

  initAppLaunch(appVm)

  // 10s后清理临时文件
  setTimeout(clearTempFile, 10000)

  __uniConfig.ready = true
}
