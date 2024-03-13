import { isPromise } from '@vue/shared'
import { ComponentPublicInstance } from 'vue'
import { IPage } from '@dcloudio/uni-app-x/types/native'
import {
  EventChannel,
  ON_READY,
  ON_UNLOAD,
  formatLog,
} from '@dcloudio/uni-shared'
import {
  initPageInternalInstance,
  invokeHook,
  // initPageVm,
  // invokeHook,
} from '@dcloudio/uni-core'
import { genWebviewId } from '../../../service/framework/webview/utils'
import { initRouteOptions } from '../../../service/framework/page/routeOptions'
import { pagesMap } from '../../../service/framework/page/define'
import { getVueApp } from '../../../service/framework/app/vueApp'
import { VuePageComponent } from '../../../service/framework/page/define'
import { getPageManager } from '../app/app'
import { ON_POP_GESTURE } from '../../constants'
import { loadFontFaceByStyles } from '../utils'

type PageNodeOptions = {}

export interface RegisterPageOptions {
  url: string
  path: string
  query: Record<string, string>
  openType: UniApp.OpenType
  webview?: IPage
  nvuePageVm?: ComponentPublicInstance
  eventChannel?: EventChannel
}

function parsePageStyle(route: UniApp.UniRoute): Map<string, any | null> {
  const style = new Map<string, any | null>()
  const routeMeta = route.meta
  const routeKeys = [
    'id',
    'route',
    'i18n',
    'isQuit',
    'isEntry',
    'isTabBar',
    'tabBarIndex',
    'tabBarText',
    'windowTop',
    'topWindow',
    'leftWindow',
    'rightWindow',
    'eventChannel',
  ]
  // navigationBar 与安卓不同需要特殊处理
  const navKeys = [
    'navigationBarTitleText',
    'navigationBarBackgroundColor',
    'navigationBarTextStyle',
    'navigationStyle',
  ]
  Object.keys(routeMeta).forEach((key) => {
    // 使用黑名单机制兼容后续新增的属性
    if (!routeKeys.includes(key) && !navKeys.includes(key)) {
      style.set(key, (routeMeta as Record<string, any>)[key])
    }
  })
  const navigationBar: Record<string, unknown> = {}
  navKeys.forEach((key) => {
    if (key in routeMeta) {
      navigationBar[key] = (routeMeta as Record<string, any>)[key]
    }
  })
  if (Object.keys(navigationBar).length) {
    style.set('navigationBar', navigationBar)
    if (
      navigationBar.navigationBarTextStyle !== 'custom' &&
      !routeMeta.isQuit
    ) {
      navigationBar['navigationBarAutoBackButton'] = true
    }
  }
  return style
}

export function registerPage({
  url,
  path,
  query,
  openType,
  webview,
  nvuePageVm,
  eventChannel,
}: RegisterPageOptions) {
  const id = genWebviewId()
  const routeOptions = initRouteOptions(path, openType)
  const pageStyle = parsePageStyle(routeOptions)
  const nativePage = getPageManager().createPage(url, id.toString(), pageStyle)
  routeOptions.meta.id = parseInt(nativePage.pageId)
  if (__DEV__) {
    console.log(formatLog('registerPage', path, nativePage.pageId))
  }
  // TODO initWebview
  // initWebview(webview, path, query, routeOptions.meta)
  const route = path.slice(1)
  // ;(webview as any).__uniapp_route = route
  const pageInstance = initPageInternalInstance(
    openType,
    url,
    query,
    routeOptions.meta,
    eventChannel,
    // TODO ThemeMode
    'light'
  )
  const page = createVuePage(
    id,
    route,
    query,
    pageInstance,
    {},
    nativePage
  ) as ComponentPublicInstance
  nativePage.addPageEventListener(ON_POP_GESTURE, function (e) {
    uni.navigateBack({
      from: 'popGesture',
      fail(e) {
        if (e.errMsg.endsWith('cancel')) {
          nativePage.show()
        }
      },
    } as UniApp.NavigateBackOptions)
  })
  nativePage.addPageEventListener(ON_UNLOAD, (_) => {
    invokeHook(page, ON_UNLOAD)
  })
  nativePage.addPageEventListener(ON_READY, (_) => {
    invokeHook(page, ON_READY)
  })
  // 加载当前页面字体
  const pageCSSStyle = page.$options.styles as
    | Array<Record<string, any>>
    | undefined
  if (pageCSSStyle) {
    loadFontFaceByStyles(pageCSSStyle, false)
  }
  return nativePage
}

function createVuePage(
  __pageId: number,
  __pagePath: string,
  __pageQuery: Record<string, any>,
  __pageInstance: Page.PageInstance['$page'],
  pageOptions: PageNodeOptions,
  nativePage: IPage
) {
  const pageNode = nativePage.document.body
  const app = getVueApp()
  const component = pagesMap.get(__pagePath)!()
  const mountPage = (component: VuePageComponent) =>
    app.mountPage(
      component,
      {
        __pageId,
        __pagePath,
        __pageQuery,
        __pageInstance,
      },
      // @ts-ignore
      pageNode
    )
  if (isPromise(component)) {
    return component.then((component) => mountPage(component))
  }
  return mountPage(component)
}
