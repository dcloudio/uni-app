import type { CreateWebviewOptions } from '@dcloudio/uni-app-plus/service/framework/webview'
import { getWebviewId } from '@dcloudio/uni-app-plus/service/framework/webview/utils'
import { getPreloadWebview } from '@dcloudio/uni-app-plus/service/framework/webview/preload'

export function createWebview(options: CreateWebviewOptions) {
  if (getWebviewId() === 2) {
    return plus.webview.getLaunchWebview()
  }
  return getPreloadWebview()
}
