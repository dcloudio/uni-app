import { initWebviewStyle } from './style'

export function initWebview(
  webview: PlusWebviewWebviewObject,
  path: string,
  query: Record<string, any>,
  routeMeta: UniApp.PageRouteMeta
) {
  initWebviewStyle(webview, path, query, routeMeta)

  // TODO initWebviewEvent(webview)
}
