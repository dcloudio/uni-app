import {
  setPreloadWebview,
  initWebview,
  createWebview
} from './webview'

import {
  navigateStack
} from './navigator'

import {
  perf
} from './perf'

import tabBar from '../framework/tab-bar'

const pages = []

export function getCurrentPages (returnAll) {
  return returnAll ? pages.slice(0) : pages.filter(page => {
    return !page.$page.meta.isTabBar || page.$page.meta.visible
  })
}

const pageFactory = Object.create(null)

export function definePage (name, createPageVueComponent) {
  pageFactory[name] = createPageVueComponent
}

export function createPage (name, options) {
  if (!pageFactory[name]) {
    console.error(`${name} not found`)
  }
  let startTime = Date.now()
  const pageVm = new (pageFactory[name]())(options)
  if (process.env.NODE_ENV !== 'production') {
    perf(`new ${name}`, startTime)
  }
  return pageVm
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
    // renderer:native 时，把 launchWebview 标记 preloadWebview，及 loaded，方便路由跳转识别
    if (__PLATFORM__ === 'app-plus-nvue') {
      webview.loaded = true
      setPreloadWebview(webview)
    }
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
    setTimeout(function () {
      navigateStack(webview)
    })
  }

  if (__PLATFORM__ === 'app-plus') {
    if (!webview.nvue) {
      const pagePath = path.slice(1)
      pageInstance.$vm = createPage(pagePath, {
        mpType: 'page',
        pageId: webview.id,
        pagePath
      })
      pageInstance.$vm.$scope = pageInstance
      pageInstance.$vm.$mount()
    }
  }

  return webview
}
