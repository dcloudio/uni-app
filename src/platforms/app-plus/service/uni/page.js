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

export function registerPage ({
  vm,
  path,
  webview
}, instanceContext) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerPage`, path, webview.id)
  }
  pages.push({
    route: path.slice(1),
    $getAppWebview () {
      return webview
    },
    $meta: instanceContext.__uniRoutes.find(route => route.path === path).meta,
    $vm: vm
  })
}
