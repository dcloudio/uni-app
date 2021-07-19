import {
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
  ON_PULL_DOWN_REFRESH,
} from '@dcloudio/uni-shared'
import { onWebviewClose } from './close'
import { onWebviewPopGesture } from './popGesture'
import { onWebviewResize } from './resize'

const WEBVIEW_LISTENERS = {
  pullToRefresh: ON_PULL_DOWN_REFRESH,
  titleNViewSearchInputChanged: ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  titleNViewSearchInputConfirmed: ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  titleNViewSearchInputClicked: ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  titleNViewSearchInputFocusChanged:
    ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
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
