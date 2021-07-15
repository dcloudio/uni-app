import { onWebviewClose } from './close'
import { onWebviewPopGesture } from './popGesture'
import { onWebviewResize } from './resize'

const WEBVIEW_LISTENERS = {
  pullToRefresh: 'onPullDownRefresh',
  titleNViewSearchInputChanged: 'onNavigationBarSearchInputChanged',
  titleNViewSearchInputConfirmed: 'onNavigationBarSearchInputConfirmed',
  titleNViewSearchInputClicked: 'onNavigationBarSearchInputClicked',
  titleNViewSearchInputFocusChanged: 'onNavigationBarSearchInputFocusChanged',
} as const

export function initWebviewEvent(webview: PlusWebviewWebviewObject) {
  const { emit } = UniServiceJSBridge
  const id = parseInt(webview.id!)
  Object.keys(WEBVIEW_LISTENERS).forEach((name) => {
    webview.addEventListener(name as any, (e) => {
      emit(WEBVIEW_LISTENERS[name as keyof typeof WEBVIEW_LISTENERS], e, id)
    })
  })
  onWebviewClose(webview)
  onWebviewResize(webview)

  // TODO
  if (plus.os.name === 'iOS') {
    // !(webview as any).nvue && onWebviewRecovery(webview, routeOptions)
    onWebviewPopGesture(webview)
  }
}
