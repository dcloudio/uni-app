import { formatLog } from '@dcloudio/uni-shared'
import { parseWebviewStyle } from '../style'
import { initDebugRefresh, initUniPageUrl } from '../utils'
import { parseTheme, useWebviewThemeChange } from '../../../theme'

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

  useWebviewThemeChange(webview, getWebviewStyle)

  webview.setStyle(webviewStyle)
}
