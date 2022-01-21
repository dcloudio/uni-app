import { formatLog } from '@dcloudio/uni-shared'
import { parseWebviewStyle } from '../style'
import { initUniPageUrl, initDebugRefresh } from '../utils'

export function initWebviewStyle(
  webview: PlusWebviewWebviewObject,
  path: string,
  query: Record<string, any>,
  routeMeta: UniApp.PageRouteMeta
) {
  const webviewStyle = parseWebviewStyle(path, routeMeta, webview)
  webviewStyle.uniPageUrl = initUniPageUrl(path, query)
  const isTabBar = !!routeMeta.isTabBar
  if (!routeMeta.isNVue) {
    webviewStyle.debugRefresh = initDebugRefresh(isTabBar, path, query)
  } else {
    // android 需要使用
    webviewStyle.isTab = isTabBar
  }
  webviewStyle.locale = weex.requireModule('plus').getLanguage()
  if (__DEV__) {
    console.log(formatLog('updateWebview', webviewStyle))
  }
  webview.setStyle(webviewStyle)
}
