import { formatLog } from '@dcloudio/uni-shared'
import { parseWebviewStyle } from '@dcloudio/uni-app-plus/service/framework/webview/style'
import {
  initDebugRefresh,
  initUniPageUrl,
} from '@dcloudio/uni-app-plus/service/framework/webview/utils'

export function initWebviewStyle(
  webview: PlusWebviewWebviewObject,
  path: string,
  query: Record<string, any>,
  routeMeta: UniApp.PageRouteMeta
) {
  // TODO parseTheme
  const getWebviewStyle = () => parseWebviewStyle(path, routeMeta, webview)
  const webviewStyle = getWebviewStyle()
  webviewStyle.uniPageUrl = initUniPageUrl(path, query)
  const isTabBar = !!routeMeta.isTabBar

  webviewStyle.debugRefresh = initDebugRefresh(isTabBar, path, query)

  webviewStyle.locale = weex.requireModule('plus').getLanguage()
  if (__DEV__) {
    console.log(formatLog('updateWebview', webviewStyle))
  }

  // TODO useWebviewThemeChange

  webview.setStyle(webviewStyle)
}
