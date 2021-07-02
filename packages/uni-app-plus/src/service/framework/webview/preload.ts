import { formatLog } from '@dcloudio/uni-shared'
import { VIEW_WEBVIEW_PATH } from '../../constants'
import { genWebviewId } from './utils'

export let preloadWebview: PlusWebviewWebviewObject & {
  loaded?: boolean
  __uniapp_route?: string
}

export function setPreloadWebview(webview: PlusWebviewWebviewObject) {
  preloadWebview = webview
}

export function createPreloadWebview() {
  if (!preloadWebview || (preloadWebview as any).__uniapp_route) {
    // 不存在，或已被使用
    preloadWebview = plus.webview.create(
      VIEW_WEBVIEW_PATH,
      String(genWebviewId())
    )
    if (__DEV__) {
      console.log(formatLog('createPreloadWebview', preloadWebview.id))
    }
  }
  return preloadWebview
}
