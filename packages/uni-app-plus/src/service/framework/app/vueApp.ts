import { extend } from '@vue/shared'
import { UniNode } from '@dcloudio/uni-shared'
import {
  App,
  createVNode,
  render,
  ConcreteComponent,
  ComponentPublicInstance,
} from 'vue'

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

export function initVueApp(appVm: ComponentPublicInstance) {
  const appContext = appVm.$.appContext
  vueApp = extend(appContext.app, {
    mountPage(
      pageComponent: ConcreteComponent,
      pageProps: Record<string, any>,
      pageContainer: UniNode
    ) {
      const vnode = createVNode(pageComponent, pageProps)
      // store app context on the root VNode.
      // this will be set on the root instance on initial mount.
      vnode.appContext = appContext
      ;(vnode as any).__page_container__ = pageContainer
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
