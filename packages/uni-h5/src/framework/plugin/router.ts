import type { App } from 'vue'
import type { RouteRecordRaw, RouterOptions } from 'vue-router'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { getCurrentPages, normalizeRouteKey, removePage } from '../setup/page'
//#if _X_ && !_NODE_JS_
import { hideActionSheet } from '../../service/api/ui/popup/showActionSheet'
import { hideModal } from '../../service/api/ui/popup/showModal'
//#endif

export function initRouter(app: App) {
  const router = createRouter(createRouterOptions())
  //#if _X_ && !_NODE_JS_
  router.beforeEach((to, from) => {
    hideActionSheet()
    hideModal()
    uni.hideToast()
    uni.hideLoading()
  })
  //#endif
  ;(app as any).router = router // 挂在app上，方便ssr获取
  app.use(router)
}

const scrollBehavior: RouterOptions['scrollBehavior'] = (
  _to,
  _from,
  savedPosition
) => {
  if (savedPosition) {
    return savedPosition
  }
  // TODO tabBar?
}

function createRouterOptions(): RouterOptions {
  return {
    history: initHistory(),
    strict: !!__uniConfig.router!.strict,
    routes: __uniRoutes as unknown as RouteRecordRaw[],
    scrollBehavior,
  }
}

function removeCurrentPages(delta: number = 1) {
  const keys = getCurrentPages()
  const start = keys.length - 1
  const end = start - delta
  for (let i = start; i > end; i--) {
    const page = keys[i].$page
    removePage(normalizeRouteKey(page.path, page.id), false)
  }
}

function initHistory() {
  let { routerBase } = __uniConfig.router!
  if (routerBase === '/') {
    routerBase = ''
  }
  if (__NODE_JS__) {
    return createMemoryHistory(routerBase)
  }
  const history =
    __UNI_FEATURE_ROUTER_MODE__ === 'history'
      ? createWebHistory(routerBase)
      : createWebHashHistory(routerBase)
  history.listen((_to, _from, info) => {
    if (info.direction === 'back') {
      removeCurrentPages(Math.abs(info.delta))
    }
  })
  return history
}
