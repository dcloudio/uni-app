import { App } from 'vue'
import {
  NavigationGuardWithThis,
  NavigationHookAfter,
  Router,
  RouteRecordRaw,
  RouterOptions,
} from 'vue-router'
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import { getApp } from '../app'

export function initRouter(app: App) {
  app.use(createAppRouter(createRouter(createRouterOptions())))
}

const scrollBehavior: RouterOptions['scrollBehavior'] = (
  to,
  from,
  savedPosition
) => {
  if (savedPosition) {
    return savedPosition
  }
  // TODO tabBar?
}

function createRouterOptions(): RouterOptions {
  const history =
    __UNI_ROUTER_MODE__ === 'history'
      ? createWebHistory()
      : createWebHashHistory()
  return {
    history,
    strict: !!__uniConfig.router.strict,
    routes: __uniRoutes as RouteRecordRaw[],
    scrollBehavior,
  }
}

function initGuard(router: Router) {
  router.beforeEach(beforeEach)
  router.afterEach(afterEach)
}

function createAppRouter(router: Router) {
  initGuard(router)
  return router
}

const beforeEach: NavigationGuardWithThis<undefined> = (to, from, next) => {
  const app = getApp()
  if (app) next()
}
const afterEach: NavigationHookAfter = (to, from, failure) => {}
