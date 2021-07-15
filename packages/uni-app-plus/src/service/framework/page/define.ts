import { once, PageNodeOptions } from '@dcloudio/uni-shared'
import { createApp, DefineComponent } from 'vue'
import { createPageNode } from '../dom/Page'
import { setupPage } from './setup'
import __vuePlugin from '../plugin'

export type VuePageComponent = DefineComponent<PageProps>

const pagesMap = new Map<string, ReturnType<typeof createFactory>>()

export function definePage(pagePath: string, component: VuePageComponent) {
  pagesMap.set(pagePath, once(createFactory(component)))
}

interface PageProps {
  __pageId: number
  __pagePath: string
  __pageQuery: Record<string, any>
  __pageInstance: Page.PageInstance['$page']
}

export function createPage(
  __pageId: number,
  __pagePath: string,
  __pageQuery: Record<string, any>,
  __pageInstance: Page.PageInstance['$page'],
  pageOptions: PageNodeOptions
) {
  const pageNode = createPageNode(__pageId, pageOptions, true)
  const app = createApp(pagesMap.get(__pagePath)!(), {
    __pageId,
    __pagePath,
    __pageQuery,
    __pageInstance,
  }).use(__vuePlugin)
  const oldUnmount = app.unmount
  app.unmount = () => {
    pageNode.isUnmounted = true
    return oldUnmount.call(app)
  }
  return app.mount(pageNode as unknown as Element)
}

function createFactory(component: VuePageComponent) {
  return () => {
    return setupPage(component)
  }
}
