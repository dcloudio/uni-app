import {
  callApiSync,
  isTabBarPage,
  getLastWebview
} from '../util'

import {
  TABBAR_HEIGHT,
  TITLEBAR_HEIGHT
} from '../../constants'

import tabBar from '../../framework/tab-bar'

export function getSystemInfoSync () {
  return callApiSync(getSystemInfo, Object.create(null), 'getSystemInfo', 'getSystemInfoSync')
}

export function getSystemInfo () {
  const platform = plus.os.name.toLowerCase()
  const ios = platform === 'ios'
  // 安卓 plus 接口获取的屏幕大小值不为整数，iOS js 获取的屏幕大小横屏时颠倒
  const screenWidth = plus.screen.resolutionWidth
  const screenHeight = plus.screen.resolutionHeight
  // 横屏时 iOS 获取的状态栏高度错误，进行纠正
  var landscape = Math.abs(plus.navigator.getOrientation()) === 90
  var statusBarHeight = Math.round(plus.navigator.getStatusbarHeight())
  if (ios && landscape) {
    statusBarHeight = Math.min(20, statusBarHeight)
  }
  var safeAreaInsets
  function getSafeAreaInsets () {
    return {
      left: 0,
      right: 0,
      top: titleNView ? 0 : statusBarHeight,
      bottom: 0
    }
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
    safeAreaInsets = ios ? webview.getSafeAreaInsets() : getSafeAreaInsets()
  } else {
    safeAreaInsets = ios ? plus.navigator.getSafeAreaInsets() : getSafeAreaInsets()
  }
  var windowHeight = Math.min(screenHeight - (titleNView ? (statusBarHeight + TITLEBAR_HEIGHT)
    : 0) - (isTabBarPage() && tabBar.visible ? TABBAR_HEIGHT : 0), screenHeight)
  var windowWidth = screenWidth
  var safeArea = {
    left: safeAreaInsets.left,
    right: windowWidth - safeAreaInsets.right,
    top: safeAreaInsets.top,
    bottom: windowHeight - safeAreaInsets.bottom,
    width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
    height: windowHeight - safeAreaInsets.top - safeAreaInsets.bottom
  }

  return {
    errMsg: 'getSystemInfo:ok',
    brand: '',
    model: plus.device.model,
    pixelRatio: plus.screen.scale,
    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight,
    statusBarHeight,
    language: plus.os.language,
    system: plus.os.version,
    version: plus.runtime.innerVersion,
    fontSizeSetting: '',
    platform,
    SDKVersion: '',
    windowTop: 0,
    windowBottom: 0,
    safeArea
  }
}
