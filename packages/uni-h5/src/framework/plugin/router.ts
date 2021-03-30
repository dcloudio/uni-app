import { App } from 'vue'
import {
  Router,
  RouterOptions,
  RouteRecordRaw,
  NavigationHookAfter,
  NavigationGuardWithThis,
} from 'vue-router'
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

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
  return {
    history: initHistory(),
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

function initHistory() {
  const history =
    __UNI_FEATURE_ROUTER_MODE__ === 'history'
      ? createWebHistory()
      : createWebHashHistory()
  // history.listen((_to, from, info) => {
  //   if (info.direction === 'back') {
  //     const app = getApp()
  //     const id = history.state.__id__
  //     if (app && id) {
  //       ;(app.$refs.app as any).keepAliveExclude = [from + '-' + id]
  //     }
  //   }
  // })
  return history
}

const beforeEach: NavigationGuardWithThis<undefined> = (to, from, next) => {
  next()
}
const afterEach: NavigationHookAfter = (to, from, failure) => {
  console.log('afterEach.id', history.state.__id__)
  console.log('afterEach', to, from, failure, JSON.stringify(history.state))
}
