import { extend } from '@vue/shared'

import { CreateWebviewOptions } from '.'
import { parseWebviewStyle } from './style'
import { genWebviewId, initUniPageUrl } from './utils'

export function createNVueWebview({
  path,
  query,
  routeOptions,
  webviewStyle,
}: CreateWebviewOptions) {
  const curWebviewId = genWebviewId()
  const curWebviewStyle = parseWebviewStyle(curWebviewId, path, routeOptions)
  ;(curWebviewStyle as any).uniPageUrl = initUniPageUrl(path, query)
  if (__DEV__) {
    console.log('[uni-app] createWebview', curWebviewId, path, curWebviewStyle)
  }
  // android 需要使用
  ;(curWebviewStyle as any).isTab = !!routeOptions.meta.isTabBar
  return plus.webview.create(
    '',
    String(curWebviewId),
    curWebviewStyle,
    extend(
      {
        nvue: true,
      },
      webviewStyle
    )
  )
}
