import {
  initWebview,
  createWebview
} from './webview/index'

const pages = []

export function getCurrentPages (returnAll) {
  return returnAll ? pages.slice(0) : pages.filter(page => {
    return !page.$page.meta.isTabBar || page.$page.meta.visible
  })
}

/**
 * 首页需要主动registerPage，二级页面路由跳转时registerPage
 */
export function registerPage ({
  path,
  query,
  openType,
  webview
}) {
  const routeOptions = JSON.parse(JSON.stringify(__uniRoutes.find(route => route.path === path)))

  if (openType === 'reLaunch' || pages.length === 0) {
    // pages.length===0 表示首页触发 redirectTo
    routeOptions.meta.isQuit = true
  }

  if (!webview) {
    webview = createWebview(path, routeOptions)
  } else {
    webview = plus.webview.getWebviewById(webview.id)
  }

  if (routeOptions.meta.isTabBar) {
    routeOptions.meta.visible = true
  }

  if (routeOptions.meta.isTabBar && webview.id !== '1') {
    const launchWebview = plus.webview.getLaunchWebview()
    launchWebview && launchWebview.append(webview)
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerPage`, path, webview.id)
  }

  initWebview(webview, webview.id === '1' && routeOptions)

  const route = path.slice(1)

  webview.__uniapp_route = route

  pages.push({
    route,
    options: Object.assign({}, query || {}),
    $getAppWebview () {
      return webview
    },
    $page: {
      id: parseInt(webview.id),
      meta: routeOptions.meta,
      path,
      route,
      openType
    },
    $remove () {
      const index = pages.findIndex(page => page === this)
      if (index !== -1) {
        pages.splice(index, 1)
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[uni-app] removePage`, path, webview.id)
        }
      }
    }
  })

  return webview
}
