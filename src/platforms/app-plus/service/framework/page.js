import {
  initWebview,
  createWebview
} from './webview'

import {
  navigateFinish
} from './navigator'

import {
  PAGE_CREATE
} from '../../constants'

import tabBar from '../framework/tab-bar'

import {
  createPage
} from '../../page-factory'

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
  } else if (!routeOptions.meta.isTabBar) {
    routeOptions.meta.isQuit = false
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
    tabBar.append(webview)
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerPage`, path, webview.id)
  }

  initWebview(webview, routeOptions)

  const route = path.slice(1)

  webview.__uniapp_route = route

  const pageInstance = {
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
  }

  pages.push(pageInstance)

  // 首页是 nvue 时，在 registerPage 时，执行路由堆栈
  if (webview.id === '1' && routeOptions.meta.isNVue) {
    webview.nvue = true
    __uniConfig.onReady(function () {
      navigateFinish(webview)
    })
  }

  if (__PLATFORM__ === 'app-plus') {
    if (!webview.nvue) {
      const pageId = webview.id
      const pagePath = path.slice(1)

      // 通知页面已开始创建
      UniServiceJSBridge.publishHandler('vdSync', {
        data: [
          [PAGE_CREATE, [pageId, pagePath]]
        ],
        options: {
          timestamp: Date.now()
        }
      }, [pageId])

      pageInstance.$vm = createPage(pagePath, pageId)
      pageInstance.$vm.$scope = pageInstance
      pageInstance.$vm.$mount()
    }
  }

  return webview
}
