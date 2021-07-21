import { initWebviewEvent } from './event'
import { initWebviewStyle } from './style'
import { initSubNVues } from './subNVues'

export function initWebview(
  webview: PlusWebviewWebviewObject,
  path: string,
  query: Record<string, any>,
  routeMeta: UniApp.PageRouteMeta
) {
  // 首页或非 nvue 页面
  if (webview.id === '1' || !routeMeta.isNVue) {
    initWebviewStyle(webview, path, query, routeMeta)
  }
  initSubNVues(webview, path, routeMeta)
  initWebviewEvent(webview)
}
