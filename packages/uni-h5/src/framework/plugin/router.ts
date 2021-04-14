import { App } from 'vue'
import { Router, RouterOptions, RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import { removeCurrentPages } from './page'

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
