import getWindowOffset from 'uni-platform/helpers/get-window-offset'
import getWindowWidth from 'uni-platform/helpers/get-window-width'
import safeAreaInsets from 'safe-area-insets'

export function getWindowInfo () {
  var screen = window.screen
  var pixelRatio = window.devicePixelRatio
  const isApple = /^Apple/.test(navigator.vendor)
  // 横屏时 iOS 获取的屏幕宽高颠倒，进行纠正，iOS26 以上在 WebView 中 window.orientation 与 screen.orientation 可能不准确
  const screenFix = isApple && window.matchMedia('(orientation:landscape)').matches
  var screenWidth = screenFix ? Math.max(screen.width, screen.height) : screen.width
  var screenHeight = screenFix ? Math.min(screen.height, screen.width) : screen.height
  // 目前仅在 iOS 直接使用平台 API，其他仍使用历史遗留的兼容方案
  var windowWidth = isApple ? getWindowWidth() : Math.min(getWindowWidth(), document.documentElement.clientWidth, screenWidth) || screenWidth
  var windowHeight = window.innerHeight
  var statusBarHeight = safeAreaInsets.top

  var safeArea = {
    left: safeAreaInsets.left,
    right: windowWidth - safeAreaInsets.right,
    top: safeAreaInsets.top,
    bottom: windowHeight - safeAreaInsets.bottom,
    width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
    height: windowHeight - safeAreaInsets.top - safeAreaInsets.bottom
  }

  const {
    top: windowTop,
    bottom: windowBottom
  } = getWindowOffset()

  windowHeight -= windowTop
  windowHeight -= windowBottom

  return {
    windowTop,
    windowBottom,
    windowWidth,
    windowHeight,
    pixelRatio,
    screenWidth,
    screenHeight,
    statusBarHeight,
    safeArea,
    safeAreaInsets: {
      top: safeAreaInsets.top,
      right: safeAreaInsets.right,
      bottom: safeAreaInsets.bottom,
      left: safeAreaInsets.left
    },
    screenTop: screenHeight - windowHeight
  }
}
