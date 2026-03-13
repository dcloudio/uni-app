import { formatLog } from '@dcloudio/uni-shared'
import { parseWebviewStyle } from '@dcloudio/uni-app-plus/service/framework/webview/style'
import {
  initDebugRefresh,
  initUniPageUrl,
} from '@dcloudio/uni-app-plus/service/framework/webview/utils'
import {
  parseTheme,
  useWebviewThemeChange,
} from '@dcloudio/uni-app-plus/service/theme'

export function initWebviewStyle(
  webview: PlusWebviewWebviewObject,
  path: string,
  query: Record<string, any>,
  routeMeta: UniApp.PageRouteMeta
) {
  const getWebviewStyle = () =>
    parseWebviewStyle(path, parseTheme(routeMeta), webview)
  const webviewStyle = getWebviewStyle()
  webviewStyle.uniPageUrl = initUniPageUrl(path, query)
  const isTabBar = !!routeMeta.isTabBar

  webviewStyle.debugRefresh = initDebugRefresh(isTabBar, path, query)

  webviewStyle.locale = weex.requireModule('plus').getLanguage()
  if (__DEV__) {
    console.log(formatLog('updateWebview', webviewStyle))
  }

  useWebviewThemeChange(webview, getWebviewStyle)

  webview.setStyle(webviewStyle)
}
