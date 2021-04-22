import { App } from 'vue'
import { Router, RouterOptions, RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import { getCurrentPages, normalizeRouteKey, removePage } from '../setup/page'

export function initRouter(app: App) {
  app.use(createAppRouter(createRouter(createRouterOptions())))
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
    strict: !!__uniConfig.router.strict,
    routes: (__uniRoutes as unknown) as RouteRecordRaw[],
    scrollBehavior,
  }
}

function createAppRouter(router: Router) {
  return router
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
  const history =
    __UNI_FEATURE_ROUTER_MODE__ === 'history'
      ? createWebHistory()
      : createWebHashHistory()
  history.listen((_to, _from, info) => {
    if (info.direction === 'back') {
      removeCurrentPages(Math.abs(info.delta))
    }
  })
  return history
}
