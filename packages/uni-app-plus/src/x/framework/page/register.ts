import { isPromise } from '@vue/shared'
import { ComponentPublicInstance } from 'vue'
import { IPage } from '@dcloudio/uni-app-x/types/native'
import { EventChannel, formatLog } from '@dcloudio/uni-shared'
import {
  initPageInternalInstance,
  // initPageVm,
  // invokeHook,
} from '@dcloudio/uni-core'
import { genWebviewId } from '../../../service/framework/webview/utils'
import { initRouteOptions } from '../../../service/framework/page/routeOptions'
import { pagesMap } from '../../../service/framework/page/define'
import { getVueApp } from '../../../service/framework/app/vueApp'
import { VuePageComponent } from '../../../service/framework/page/define'

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
  const keys = [
    'navigationBarTitleText',
    'navigationBarBackgroundColor',
    'navigationBarTextStyle',
    'navigationStyle',
  ]
  const style = new Map<string, any | null>()
  const routeMeta = route.meta
  keys.forEach((key) => {
    if (key in routeMeta) {
      style.set(key, (routeMeta as Record<string, any>)[key])
    }
  })
  if (
    style.size &&
    style.get('navigationBarTextStyle') !== 'custom' &&
    !routeMeta.isQuit
  ) {
    style.set('navigationBarAutoBackButton', true)
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
  const nativePage = __pageManager.createPage(url, id.toString(), pageStyle)
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
  createVuePage(id, route, query, pageInstance, {}, nativePage)
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
