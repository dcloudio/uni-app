import {
  initWebview,
  createWebview
} from './webview'

import {
  navigateFinish
} from './navigator'

import tabBar from '../framework/tab-bar'

import {
  createPage
} from '../../page-factory'

import {
  loadPage
} from './load-sub-package'

import {
  initEntryPage
} from './config'

const pages = []

export function getCurrentPages (returnAll) {
  return returnAll ? pages.slice(0) : pages.filter(page => {
    return !page.$page.meta.isTabBar || page.$page.meta.visible
  })
}

const preloadWebviews = {}

export function removePreloadWebview (webview) {
  const url = Object.keys(preloadWebviews).find(url => preloadWebviews[url].id === webview.id)
  if (url) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] removePreloadWebview(${webview.id})`)
    }
    delete preloadWebviews[url]
  }
}

export function closePreloadWebview ({
  url
}) {
  const webview = preloadWebviews[url]
  if (webview) {
    if (webview.__page__) {
      if (!getCurrentPages(true).find(page => page === webview.__page__)) {
        // 未使用
        webview.close('none')
      } else { // 被使用
        webview.__preload__ = false
      }
    } else { // 未使用
      webview.close('none')
    }
    delete preloadWebviews[url]
  }
  return webview
}

export function preloadWebview ({
  url,
  path,
  query
}) {
  if (!preloadWebviews[url]) {
    const routeOptions = JSON.parse(JSON.stringify(__uniRoutes.find(route => route.path === path)))
    preloadWebviews[url] = createWebview(path, routeOptions, query, {
      __preload__: true,
      __query__: JSON.stringify(query)
    })
  }
  return preloadWebviews[url]
}

/**
 * 首页需要主动registerPage，二级页面路由跳转时registerPage
 */
export function registerPage ({
  url,
  path,
  query,
  openType,
  webview,
  eventChannel
}) {
  // fast 模式，nvue 首页时，初始化下 entry page
  webview && initEntryPage()

  if (preloadWebviews[url]) {
    webview = preloadWebviews[url]
    if (webview.__page__) {
      // 该预载页面已处于显示状态,不再使用该预加载页面,直接新开
      if (getCurrentPages(true).find(page => page === webview.__page__)) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[uni-app] preloadWebview(${path},${webview.id}) already in use`)
        }
        webview = null
      } else {
        if (eventChannel) {
          webview.__page__.eventChannel = eventChannel
        }
        pages.push(webview.__page__)
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[uni-app] reuse preloadWebview(${path},${webview.id})`)
        }
        return webview
      }
    }
  }
  const routeOptions = JSON.parse(JSON.stringify(__uniRoutes.find(route => route.path === path)))

  if (
    openType === 'reLaunch' ||
    (
      !__uniConfig.realEntryPagePath &&
      getCurrentPages().length === 0 // redirectTo
    )
  ) {
    routeOptions.meta.isQuit = true
  } else if (!routeOptions.meta.isTabBar) {
    routeOptions.meta.isQuit = false
  }

  if (!webview) {
    webview = createWebview(path, routeOptions, query)
  } else {
    webview = plus.webview.getWebviewById(webview.id)
    webview.nvue = routeOptions.meta.isNVue
  }

  if (routeOptions.meta.isTabBar) {
    routeOptions.meta.visible = true
  }

  if (routeOptions.meta.isTabBar) {
    tabBar.append(webview)
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerPage(${path},${webview.id})`)
  }

  const isLaunchNVuePage = webview.id === '1' && webview.nvue

  initWebview(webview, routeOptions, path, query)

  const route = path.slice(1)

  webview.__uniapp_route = route

  const pageInstance = {
    route,
    options: Object.assign({}, query || {}),
    $getAppWebview () {
      // 重要，不能直接返回 webview 对象，因为 plus 可能会被二次替换，返回的 webview 对象内部的 plus 不正确
      // 导致 webview.getStyle 等逻辑出错(旧的 webview 内部 plus 被释放)
      return plus.webview.getWebviewById(webview.id)
    },
    eventChannel,
    $page: {
      id: parseInt(webview.id),
      meta: routeOptions.meta,
      path,
      route,
      fullPath: url,
      openType
    },
    $remove () {
      const index = pages.findIndex(page => page === this)
      if (index !== -1) {
        if (!webview.nvue) {
          this.$vm.$destroy()
        }
        pages.splice(index, 1)
        if (process.env.NODE_ENV !== 'production') {
          console.log('[uni-app] removePage(' + path + ')[' + webview.id + ']')
        }
      }
    },
    // 兼容小程序框架
    selectComponent (selector) {
      return this.$vm.selectComponent(selector)
    },
    selectAllComponents (selector) {
      return this.$vm.selectAllComponents(selector)
    }
  }

  pages.push(pageInstance)

  if (webview.__preload__) {
    webview.__page__ = pageInstance
  }

  // 首页是 nvue 时，在 registerPage 时，执行路由堆栈
  if (isLaunchNVuePage) {
    if (
      __uniConfig.splashscreen &&
      __uniConfig.splashscreen.autoclose &&
      !__uniConfig.splashscreen.alwaysShowBeforeRender
    ) {
      plus.navigator.closeSplashscreen()
    }
    __uniConfig.onReady(function () {
      navigateFinish(webview)
    })
  }

  if (__PLATFORM__ === 'app-plus') {
    if (!webview.nvue) {
      const pageId = webview.id
      try {
        loadPage(route, () => {
          createPage(route, pageId, query, pageInstance).$mount()
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return webview
}
