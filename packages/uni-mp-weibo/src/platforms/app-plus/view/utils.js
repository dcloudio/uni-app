import { getStatusbarHeight } from 'uni-platform/helpers/status-bar'

import { NAVBAR_HEIGHT } from 'uni-helpers/constants'

export function getNavigationBarHeight () {
  const webview = plus.webview.currentWebview()
  let style = webview.getStyle()
  style = style && style.titleNView
  if (style && style.type === 'default') {
    return NAVBAR_HEIGHT + getStatusbarHeight()
  }
  return 0
}
