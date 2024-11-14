import { updateStyle } from '@dcloudio/uni-core'
import { isArray } from '@vue/shared'
import { setupPage } from '../../framework/setup'
import { renderPage } from './utils'

const systemRoutes: string[] = []
export function registerSystemRoute(route: string, page: any) {
  if (systemRoutes.includes(route)) {
    return
  }
  systemRoutes.push(route)
  if (isArray(page.styles) && page.styles.length > 0) {
    // 插入dom style
    page.styles.forEach((style: string, index: number) => {
      updateStyle(`${route}-style-${index}`, style)
    })
  }
  const __uniPage = setupPage(page)
  __uniRoutes.push({
    path: route,
    component: {
      mpType: 'page',
      setup() {
        const app = getApp()
        const query = (app && app.$route && app.$route.query) || {}
        return () => renderPage(__uniPage, query)
      },
    },
    meta: {
      isQuit: false,
      isEntry: false,
      navigationBar: {},
      route,
    },
  })
}
