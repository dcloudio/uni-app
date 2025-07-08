import { extend } from '@vue/shared'
import type { UniNode } from '@dcloudio/uni-shared'
import {
  type App,
  type AppContext,
  type ComponentPublicInstance,
  createMountPage,
  unmountPage,
} from 'vue'
import type { VuePageComponent } from '../page/define'
import { getAllPages } from '../page/getCurrentPages'

declare module 'vue' {
  function createMountPage(
    appContext: AppContext
  ): (
    pageComponent: VuePageComponent,
    pageProps: Record<string, any>,
    pageContainer: UniNode
  ) => ComponentPublicInstance
  function unmountPage(pageInstance: ComponentPublicInstance): void
}

interface VueApp extends App {
  mountPage: (
    pageComponent: VuePageComponent,
    pageProps: Record<string, any>,
    pageContainer: UniNode
  ) => ComponentPublicInstance
  unmountPage: (pageInstance: ComponentPublicInstance) => void
}

let vueApp: VueApp

export function getVueApp() {
  return vueApp
}

export function initVueApp(appVm: ComponentPublicInstance) {
  const internalInstance = appVm.$

  // 定制 App 的 $children 为 devtools 服务 __VUE_PROD_DEVTOOLS__
  Object.defineProperty((internalInstance as any).ctx, '$children', {
    get() {
      return getAllPages().map((page) => page.$vm)
    },
  })

  const appContext = internalInstance.appContext
  const mountPage = createMountPage(appContext)
  vueApp = extend(appContext.app, {
    mountPage(
      pageComponent: VuePageComponent,
      pageProps: Record<string, any>,
      pageContainer: UniNode
    ) {
      return mountPage(pageComponent, pageProps, pageContainer)
    },
    unmountPage: (pageInstance: ComponentPublicInstance) => {
      unmountPage(pageInstance)
    },
  })
}
