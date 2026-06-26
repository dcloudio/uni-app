import { hasOwn } from '@vue/shared'
import type { RegisterPageOptions } from '@dcloudio/uni-app-plus/service/framework/page/register'
import { initRouteOptions } from '@dcloudio/uni-app-plus/service/framework/page/routeOptions'
import { createWebview, initWebview } from '../webview'
import {
  ON_REACH_BOTTOM_DISTANCE,
  type PageNodeOptions,
  formatLog,
} from '@dcloudio/uni-shared'
import { initPageInternalInstance } from '@dcloudio/uni-core'
import { createVuePage } from '@dcloudio/uni-app-plus/service/framework/page/define'
import { getStatusbarHeight } from '../../../helpers/statusBar'
import { getBaseSystemInfo } from '../../api/base/getBaseSystemInfo'
import tabBar from '../app/tabBar'

export function registerPage({
  url,
  path,
  query,
  openType,
  webview,
  nvuePageVm,
  eventChannel,
}: RegisterPageOptions) {
  // TODO initEntry()
  // TODO preloadWebviews[url]

  const routeOptions = initRouteOptions(path, openType)

  if (!webview) {
    webview = createWebview({ path, routeOptions, query })
  } else {
    webview = plus.webview.getWebviewById(webview.id)
    ;(webview as any).nvue = routeOptions.meta.isNVue
  }

  routeOptions.meta.id = parseInt(webview.id!)

  const isTabBar = !!routeOptions.meta.isTabBar
  if (isTabBar) {
    tabBar.append(webview)
  }

  if (__DEV__) {
    console.log(formatLog('registerPage', path, webview.id))
  }

  initWebview(webview, path, query, routeOptions.meta)

  const route = path.slice(1)
  ;(webview as any).__uniapp_route = route

  const pageInstance = initPageInternalInstance(
    openType,
    url,
    query,
    routeOptions.meta,
    eventChannel,
    (__uniConfig.darkmode
      ? plus.navigator.getUIStyle()
      : 'light') as UniApp.ThemeMode
  )

  const id = parseInt(webview.id!)

  createVuePage(id, route, query, pageInstance, initPageOptions(routeOptions))

  return webview
}

function initPageOptions({ meta }: UniApp.UniRoute): PageNodeOptions {
  const statusbarHeight = getStatusbarHeight()
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo()
  return {
    /**
     * 此处固定true带来的问题
     * 鸿蒙非uni-app-x加载页面css时完全是鸿蒙web组件自主行为，uni没有干涉，此时如果页面不含css，鸿蒙web组件会打印一行警告信息
     *
     * 改动的困难在于目前__uniRoutes生成仅依赖pages.json的内容，如果再去分析页面是否包含css，会增加复杂度和性能开销
     * 如果干涉鸿蒙web加载css的过程会降低一丢丢性能，鉴于此警告并不影响功能，暂不处理此问题
     */
    // css: meta.hasCss !== false,
    css: true,
    route: meta.route,
    version: 1,
    locale: '',
    platform,
    pixelRatio,
    windowWidth,
    disableScroll: meta.disableScroll === true,
    onPageScroll: false,
    onPageReachBottom: false,
    onReachBottomDistance: hasOwn(meta, 'onReachBottomDistance')
      ? meta.onReachBottomDistance!
      : ON_REACH_BOTTOM_DISTANCE,
    statusbarHeight,
    // TODO meta.navigationBar.type === 'float'
    windowTop: 0,
    // TODO tabBar.cover
    windowBottom: 0,
    nvueFlexDirection:
      meta.isNVueStyle && __uniConfig.nvue
        ? __uniConfig.nvue['flex-direction']
        : undefined,
  }
}
