import { invokeHook } from '@dcloudio/uni-core'
import {
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
  ON_PULL_DOWN_REFRESH,
} from '@dcloudio/uni-shared'
import { setPullDownRefreshWebview } from '../../../../utils'
import { onWebviewClose } from './close'
import { onWebviewPopGesture } from './popGesture'
import { onWebviewRecovery } from './recovery'
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
  const id = parseInt(webview.id!)
  Object.keys(WEBVIEW_LISTENERS).forEach((name) => {
    const hook = WEBVIEW_LISTENERS[name as keyof typeof WEBVIEW_LISTENERS]
    webview.addEventListener(name as any, (e) => {
      if (hook === ON_PULL_DOWN_REFRESH) {
        // 设置当前正在下拉刷新的webview
        setPullDownRefreshWebview(webview)
      }
      invokeHook(id, hook, e)
    })
  })
  onWebviewClose(webview)
  onWebviewResize(webview)

  if (plus.os.name === 'iOS') {
    onWebviewRecovery(webview)
    onWebviewPopGesture(webview)
  }
}
