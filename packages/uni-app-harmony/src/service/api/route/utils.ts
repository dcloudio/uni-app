import {
  getPendingNavigator,
  pendingNavigate,
  setPendingNavigator,
} from '@dcloudio/uni-app-plus/service/api/route/utils'
import {
  getPreloadWebview,
  onWebviewReady,
} from '@dcloudio/uni-app-plus/service/framework/webview'
export type { RouteOptions } from '@dcloudio/uni-app-plus/service/api/route/utils'

export {
  closePage,
  navigateFinish,
} from '@dcloudio/uni-app-plus/service/api/route/utils'

export function navigate(
  path: string,
  callback: () => void,
  isAppLaunch: boolean
) {
  const pendingNavigator = getPendingNavigator()
  if (!isAppLaunch && pendingNavigator) {
    return console.error(
      `Waiting to navigate to: ${pendingNavigator.path}, do not operate continuously: ${path}.`
    )
  }

  // 未创建 preloadWebview 或 preloadWebview 已被使用
  const preloadWebview = getPreloadWebview()
  const waitPreloadWebview =
    !preloadWebview || (preloadWebview && preloadWebview.__uniapp_route)
  // 已创建未 loaded
  const waitPreloadWebviewReady = preloadWebview && !preloadWebview.loaded

  if (waitPreloadWebview || waitPreloadWebviewReady) {
    setPendingNavigator(
      path,
      callback,
      waitPreloadWebview ? 'waitForCreate' : 'waitForReady'
    )
  } else {
    callback()
  }
  if (waitPreloadWebviewReady) {
    onWebviewReady(preloadWebview.id!, pendingNavigate)
  }
}
