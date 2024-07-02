import { invokeHook } from '@dcloudio/uni-core'
import { ON_PULL_DOWN_REFRESH } from '@dcloudio/uni-shared'

const WEBVIEW_LISTENERS = {
  pullToRefresh: ON_PULL_DOWN_REFRESH,
} as const

export function initWebviewEvent(webview: PlusWebviewWebviewObject) {
  const id = parseInt(webview.id!)
  Object.keys(WEBVIEW_LISTENERS).forEach((name) => {
    const hook = WEBVIEW_LISTENERS[name as keyof typeof WEBVIEW_LISTENERS]
    webview.addEventListener(name as any, (e) => {
      invokeHook(id, hook, e)
    })
  })
}
