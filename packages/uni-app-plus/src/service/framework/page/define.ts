import { extend, isFunction, isPromise } from '@vue/shared'
import { type PageNodeOptions, once } from '@dcloudio/uni-shared'
import type { DefineComponent } from 'vue'
import { createPageNode } from '../dom/Page'
import { setupPage } from './setup'
import { getVueApp } from '../app/vueApp'

export type VuePageComponent = DefineComponent<PageProps>

type VuePageAsyncComponent = () => Promise<VuePageComponent>

function isVuePageAsyncComponent(
  component: unknown
): component is VuePageAsyncComponent {
  return isFunction(component)
}

export const pagesMap = new Map<string, ReturnType<typeof createPageFactory>>()

export function definePage(
  pagePath: string,
  asyncComponent: VuePageAsyncComponent | VuePageComponent
) {
  pagesMap.set(pagePath, once(createPageFactory(asyncComponent)))
}

interface PageProps {
  __pageId: number
  __pagePath: string
  __pageQuery: Record<string, any>
  __pageInstance: Page.PageInstance['$page']
}

export function createVuePage(
  __pageId: number,
  __pagePath: string,
  __pageQuery: Record<string, any>,
  __pageInstance: Page.PageInstance['$page'],
  pageOptions: PageNodeOptions
) {
  const pageNode = createPageNode(__pageId, pageOptions, true)
  const app = getVueApp()
  const component = pagesMap.get(__pagePath)!()
  const mountPage = (component: VuePageComponent) =>
    app.mountPage(
      component,
      extend(
        {
          __pageId,
          __pagePath,
          __pageQuery,
          __pageInstance,
        },
        __pageQuery
      ),
      pageNode
    )
  if (isPromise(component)) {
    return component.then((component) => mountPage(component))
  }
  return mountPage(component)
}

function createPageFactory(
  component: VuePageAsyncComponent | VuePageComponent
) {
  return () => {
    if (isVuePageAsyncComponent(component)) {
      return component().then((component) =>
        setupPage(clonedPageComponent(component))
      )
    }
    return setupPage(clonedPageComponent(component))
  }
}

function clonedPageComponent(component: VuePageComponent) {
  // 页面可能作为组件渲染，需要clone一份定义出来，不然会互相干扰
  return extend({}, component) as VuePageComponent
}
