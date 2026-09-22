import { updateStyle } from '@dcloudio/uni-core'
import { extend, isArray } from '@vue/shared'
import { setupPage } from '../../framework/setup'
//#if _X_VAPOR_
import { createVaporPageRouteComponent } from '../../framework/components/page/route-vapor'
//#else
import { renderPage } from './utils'
//#endif

const systemRoutes: string[] = []
export function registerSystemRoute(
  route: string,
  page: any,
  meta: Partial<UniApp.PageRouteMeta> = {}
) {
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
  let routeComponent: any
  //#if _X_VAPOR_
  routeComponent = createVaporPageRouteComponent(__uniPage, () => {
    const app = getApp()
    return (app && app.$route && app.$route.query) || {}
  })
  routeComponent.mpType = 'page'
  //#else
  routeComponent = {
    mpType: 'page',
    setup() {
      const app = getApp()
      const query = (app && app.$route && app.$route.query) || {}
      return () => renderPage(__uniPage, query)
    },
  }
  //#endif
  __uniRoutes.push({
    path: route,
    component: routeComponent,
    meta: extend(
      {
        isQuit: false,
        isEntry: false,
        navigationBar: {},
        route,
      },
      meta
    ),
  })
}
