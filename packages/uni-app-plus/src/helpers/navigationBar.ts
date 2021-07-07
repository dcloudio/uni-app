import { getStatusbarHeight } from './statusBar'
import { NAVBAR_HEIGHT } from '@dcloudio/uni-shared'

export function getNavigationBarHeight() {
  const webview = plus.webview.currentWebview()
  const style = webview.getStyle()
  const titleNView = style && style.titleNView
  if (titleNView && titleNView.type === 'default') {
    return NAVBAR_HEIGHT + getStatusbarHeight()
  }
  return 0
}
