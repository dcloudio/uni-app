import {
  initWebview,
  createWebview
} from './webview/index'

import {
  createHolder
} from './holder'

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
  const routeOptions = JSON.parse(JSON.stringify(instanceContext.__uniRoutes.find(route => route.path === path)))

  if (!webview) {
    webview = createWebview(path, instanceContext, routeOptions)
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerPage`, path, webview.id)
  }

  initWebview(webview, instanceContext, webview.id === '1' && routeOptions)

  const route = path.slice(1)
  pages.push({
    route,
    $getAppWebview () {
      return webview
    },
    $page: {
      id: parseInt(webview.id),
      meta: routeOptions.meta,
      path,
      route
    },
    $holder: createHolder(webview, {
      navigationBar: webview.$navigationBar
    }, instanceContext)
  })

  return webview
}
