import {
  initWebview,
  createWebview
} from './webview'

const pages = []

export function getCurrentPages () {
  return pages
}
/**
 * @param {Object} pageVm
 *
 * page.beforeCreate 时添加 page
 * page.beforeDestroy 时移出 page
 *
 * page.viewappear  onShow
 * page.viewdisappear onHide
 *
 * navigateTo
 * redirectTo
 *
 *
 *
 *
 *
 *
 */
/**
 * 首页需要主动registerPage，二级页面路由跳转时registerPage
 */
export function registerPage ({
  path,
  webview
}, instanceContext) {
  const routeOptions = instanceContext.__uniRoutes.find(route => route.path === path)

  if (!webview) {
    webview = createWebview(path, instanceContext, routeOptions.window)
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerPage`, path, webview.id)
  }

  initWebview(webview, instanceContext, webview.id === '1' && routeOptions.window)

  pages.push({
    route: path.slice(1),
    $getAppWebview () {
      return webview
    },
    $meta: routeOptions.meta
  })

  return webview
}
