import { initWebviewStyle } from './style'
import { initWebviewEvent } from './event'

export function initWebview(
  webview: PlusWebviewWebviewObject,
  path: string,
  query: Record<string, any>,
  routeMeta: UniApp.PageRouteMeta
) {
  initWebviewStyle(webview, path, query, routeMeta)

  initWebviewEvent(webview)
}
