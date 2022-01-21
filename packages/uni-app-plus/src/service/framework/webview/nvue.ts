import { formatLog } from '@dcloudio/uni-shared'
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
  const curWebviewStyle = parseWebviewStyle(path, routeOptions.meta, {
    id: curWebviewId + '',
  })
  ;(curWebviewStyle as any).uniPageUrl = initUniPageUrl(path, query)
  if (__DEV__) {
    console.log(
      formatLog('createNVueWebview', curWebviewId, path, curWebviewStyle)
    )
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
