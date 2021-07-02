import { once } from '@dcloudio/uni-shared'
import { createApp, DefineComponent } from 'vue'
import { createPageNode } from '../dom/Page'
import { setupPage } from './setup'
import __vuePlugin from '../plugin'
import { PageNodeOptions } from '../../../PageAction'

export type VueComponent = DefineComponent

const pagesMap = new Map<string, ReturnType<typeof createFactory>>()

export function definePage(pagePath: string, component: VueComponent) {
  pagesMap.set(pagePath, once(createFactory(component)))
}

export interface PageProps {
  pageId: number
  pagePath: string
  pageQuery: Record<string, any>
  pageInstance: Page.PageInstance['$page']
}

export function createPage(
  pageId: number,
  pagePath: string,
  pageQuery: Record<string, any>,
  pageInstance: Page.PageInstance['$page'],
  pageOptions: PageNodeOptions
) {
  return createApp(
    pagesMap.get(pagePath)!({
      pageId,
      pagePath,
      pageQuery,
      pageInstance,
    })
  )
    .use(__vuePlugin)
    .mount(createPageNode(pageId, pageOptions, true) as unknown as Element)
}

function createFactory(component: VueComponent) {
  return (props: PageProps) => {
    return setupPage(component, props)
  }
}
