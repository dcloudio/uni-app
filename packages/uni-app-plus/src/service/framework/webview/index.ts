import { ON_WEBVIEW_READY } from '../../../constants'
import { createNVueWebview } from './nvue'
import { getWebviewId } from './utils'
import { getPreloadWebview } from './preload'

export * from './init'

export * from './preload'

export interface CreateWebviewOptions {
  path: string
  query: Record<string, string>
  routeOptions: UniApp.UniRoute
  webviewExtras?: Record<string, any>
}

export function createWebview(options: CreateWebviewOptions) {
  if (options.routeOptions.meta.isNVue) {
    return createNVueWebview(options)
  }
  if (getWebviewId() === 2) {
    // 如果首页非 nvue，则直接返回 Launch Webview
    return plus.webview.getLaunchWebview()
  }
  return getPreloadWebview()
}

export function onWebviewReady(
  pageId: string,
  callback: (...args: any[]) => void
) {
  UniServiceJSBridge.once(ON_WEBVIEW_READY + '.' + pageId, callback)
}
