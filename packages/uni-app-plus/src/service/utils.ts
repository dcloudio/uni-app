import { getCurrentPage } from '@dcloudio/uni-core'
import type { ComponentPublicInstance } from 'vue'

export function getCurrentWebview() {
  const page = __X__
    ? (getCurrentPage() as unknown as UniPage).vm
    : getCurrentPage()
  if (page) {
    return (page as ComponentPublicInstance).$getAppWebview!()
  }
  return null
}

export function getWebview(page?: ComponentPublicInstance) {
  if (page) {
    return page.$getAppWebview!()
  }
  return getCurrentWebview()
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
