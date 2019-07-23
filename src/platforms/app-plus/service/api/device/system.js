import {
  isTabBarPage,
  getLastWebview
} from '../util'

import {
  TABBAR_HEIGHT,
  TITLEBAR_HEIGHT
} from '../../constants'

import tabbar from '../../framework/tabbar'

export function getSystemInfo (args) {
  const platform = plus.os.name.toLowerCase()
  const ios = platform === 'ios'
  // 安卓 plus 接口获取的屏幕大小值不为整数，iOS js 获取的屏幕大小横屏时颠倒
  const screenWidth = plus.screen.resolutionWidth
  const screenHeight = plus.screen.resolutionHeight
  // 横屏时 iOS 获取的状态栏高度错误，进行纠正
  var landscape = Math.abs(plus.navigator.getOrientation()) === 90
  var statusBarHeight = plus.navigator.getStatusbarHeight()
  if (ios && landscape) {
    statusBarHeight = Math.min(20, statusBarHeight)
  }
  // 判断是否存在 titleNView
  var titleNView
  var webview = getLastWebview()
  if (webview) {
    let style = webview.getStyle()
    if (style) {
      titleNView = style && style.titleNView
      titleNView = titleNView && titleNView.type === 'default'
    }
  }
  return {
    errMsg: 'getSystemInfo:ok',
    brand: '',
    model: plus.device.model,
    pixelRatio: plus.screen.scale,
    screenWidth,
    screenHeight,
    // 安卓端 webview 宽度有时比屏幕多 1px，相比取最小值
    // TODO screenWidth,screenHeight
    windowWidth: screenWidth,
    windowHeight: Math.min(screenHeight - (titleNView ? (statusBarHeight + TITLEBAR_HEIGHT)
      : 0) - (isTabBarPage() && tabbar.visible ? TABBAR_HEIGHT : 0), screenHeight),
    statusBarHeight,
    language: plus.os.language,
    system: plus.os.version,
    version: plus.runtime.innerVersion,
    fontSizeSetting: '',
    platform,
    SDKVersion: '',
    windowTop: 0,
    windowBottom: 0
  }
}
