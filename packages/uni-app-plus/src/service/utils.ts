import { getCurrentPage } from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'

export function getCurrentWebview() {
  const page = getCurrentPage()
  if (page) {
    return (page as ComponentPublicInstance).$getAppWebview!()
  }
  return null
}

let pullDownRefreshWebview: PlusWebviewWebviewObject | null = null

export function getPullDownRefreshWebview() {
  return pullDownRefreshWebview
}

export function setPullDownRefreshWebview(
  webview: PlusWebviewWebviewObject | null
) {
  pullDownRefreshWebview = webview
}
