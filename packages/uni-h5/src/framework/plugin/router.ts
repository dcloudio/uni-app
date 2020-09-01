import { App } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

export function initRouter(app: App) {
  const history =
    __UNI_ROUTER_MODE__ === 'history'
      ? createWebHistory()
      : createWebHashHistory()
  app.use(
    createRouter({
      history,
      strict: !!__uniConfig.router.strict,
      routes: __uniRoutes as RouteRecordRaw[],
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        }
        // TODO tabBar?
      }
    })
  )
}
