import { createNVueWebview } from './nvue'
import { getPreloadWebview, getWebviewId } from './utils'

export interface CreateWebviewOptions {
  path: string
  query: Record<string, string>
  routeOptions: UniApp.UniRoute
  webviewStyle?: Record<string, any>
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
