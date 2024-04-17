import { formatLog } from '@dcloudio/uni-shared'
import { extend } from '@vue/shared'

import type { CreateWebviewOptions } from '.'
import { parseWebviewStyle } from './style'
import { genWebviewId, initUniPageUrl } from './utils'
import { parseTheme, useWebviewThemeChange } from '../../theme'

export function createNVueWebview({
  path,
  query,
  routeOptions,
  webviewExtras,
}: CreateWebviewOptions) {
  const getCurWebviewStyle = () =>
    parseWebviewStyle(path, parseTheme(routeOptions.meta), {
      id: curWebviewId + '',
    })
  const curWebviewId = genWebviewId()
  const curWebviewStyle = getCurWebviewStyle()
  ;(curWebviewStyle as any).uniPageUrl = initUniPageUrl(path, query)
  if (__DEV__) {
    console.log(
      formatLog('createNVueWebview', curWebviewId, path, curWebviewStyle)
    )
  }
  // android 需要使用
  ;(curWebviewStyle as any).isTab = !!routeOptions.meta.isTabBar

  const webview = plus.webview.create(
    '',
    String(curWebviewId),
    curWebviewStyle,
    extend(
      {
        nvue: true,
        __path__: path,
        __query__: JSON.stringify(query),
      },
      webviewExtras
    )
  )

  useWebviewThemeChange(webview, getCurWebviewStyle)

  return webview
}
