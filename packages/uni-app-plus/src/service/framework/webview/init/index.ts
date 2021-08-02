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
    // path 必须参数为空，因为首页已经在 manifest.json 中设置了 uniNView，不能再次设置，否则会二次加载
    initWebviewStyle(webview, '', query, routeMeta)
  }
  initSubNVues(webview, path, routeMeta)
  initWebviewEvent(webview)
}
