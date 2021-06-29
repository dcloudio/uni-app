import { once } from '@dcloudio/uni-shared'
import { createApp, defineComponent } from 'vue'
import { createPageNode, PageNodeOptions } from '../dom/Page'
import { setupPage } from './setup'

export type VueComponent = ReturnType<typeof defineComponent>

const pagesMap = new Map<string, ReturnType<typeof createFactory>>()

export function definePage(pagePath: string, component: VueComponent) {
  pagesMap.set(pagePath, once(createFactory(component)))
}

export function createPage(
  pageId: number,
  pagePath: string,
  pageQuery: Record<string, any>,
  pageInstance: unknown,
  pageOptions: PageNodeOptions
) {
  return createApp(pagesMap.get(pagePath)!(), {
    pagePath,
    pageQuery,
    pageInstance,
  }).mount(createPageNode(pageId, pageOptions) as unknown as Element)
}

function createFactory(component: VueComponent) {
  return () => {
    return setupPage(component)
  }
}
