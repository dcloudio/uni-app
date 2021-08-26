import { initNVue } from './nvue'
import { initBackgroundColor } from './backgroundColor'
import { initPopGesture } from './popGesture'
import { initPullToRefresh } from './pullToRefresh'
import { initTitleNView } from './titleNView'
import { DebugRefresh, InitUniPageUrl } from '../utils'

export function parseWebviewStyle(
  path: string,
  routeMeta: UniApp.PageRouteMeta
): PlusWebviewWebviewStyles & {
  uniPageUrl?: InitUniPageUrl
  debugRefresh?: DebugRefresh
  isTab?: boolean
  locale?: string
} {
  const webviewStyle: PlusWebviewWebviewStyles = {
    bounce: 'vertical',
  }

  Object.keys(routeMeta).forEach((name) => {
    if (WEBVIEW_STYLE_BLACKLIST.indexOf(name) === -1) {
      webviewStyle[name as keyof PlusWebviewWebviewStyles] =
        routeMeta[name as keyof UniApp.PageRouteMeta]
    }
  })
  initNVue(webviewStyle, routeMeta, path)
  initPopGesture(webviewStyle, routeMeta)
  initBackgroundColor(webviewStyle, routeMeta)
  initTitleNView(webviewStyle, routeMeta)
  initPullToRefresh(webviewStyle, routeMeta)

  return webviewStyle
}

const WEBVIEW_STYLE_BLACKLIST = [
  'id',
  'route',
  'isNVue',
  'isQuit',
  'isEntry',
  'isTabBar',
  'tabBarIndex',
  'windowTop',
  'topWindow',
  'leftWindow',
  'rightWindow',
  'maxWidth',
  'usingComponents',
  'disableScroll',
  'enablePullDownRefresh',
  'navigationBar',
  'pullToRefresh',
  'onReachBottomDistance',
  'pageOrientation',
  'backgroundColor',
]
