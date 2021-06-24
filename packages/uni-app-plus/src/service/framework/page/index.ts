import { initEntry } from '../app/initEntry'
import { initRouteOptions } from './initRouteOptions'
import { createWebview } from './webview'

export type OpenType =
  | 'navigateTo'
  | 'redirectTo'
  | 'reLaunch'
  | 'switchTab'
  | 'navigateBack'
  | 'preloadPage'

interface RegisterPageOptions {
  url: string
  path: string
  query: Record<string, string>
  openType: OpenType
  webview?: PlusWebviewWebviewObject
  eventChannel: unknown
}

export function registerPage({
  path,
  query,
  openType,
  webview,
}: RegisterPageOptions) {
  // fast 模式，nvue 首页时，会在nvue中主动调用registerPage并传入首页webview，此时初始化一下首页（因为此时可能还未调用registerApp）
  if (webview) {
    initEntry()
  }
  // TODO preloadWebview

  const routeOptions = initRouteOptions(path, openType)

  if (!webview) {
    webview = createWebview({ path, routeOptions, query })
  } else {
    webview = plus.webview.getWebviewById(webview.id)
    ;(webview as any).nvue = routeOptions.meta.isNVue
  }
  if (__DEV__) {
    console.log(`[uni-app] registerPage(${path},${webview.id})`)
  }
}
