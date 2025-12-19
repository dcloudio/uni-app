import safeAreaInsets from 'safe-area-insets'
import { getWindowOffset } from '@dcloudio/uni-core'
import {
  getScreenFix,
  getScreenHeight,
  getScreenWidth,
  getWindowWidth,
  isLandscape,
} from '../base/getBaseSystemInfo'
import { defineSyncApi } from '@dcloudio/uni-api'

export const getWindowInfo = defineSyncApi<typeof uni.getWindowInfo>(
  'getWindowInfo',
  () => {
    const pixelRatio = window.devicePixelRatio
    // 横屏时 iOS 获取的屏幕宽高颠倒，进行纠正
    const screenFix = getScreenFix()
    const landscape = isLandscape(screenFix)
    const screenWidth = getScreenWidth(screenFix, landscape)
    const screenHeight = getScreenHeight(screenFix, landscape)
    const windowWidth = getWindowWidth()
    let windowHeight = window.innerHeight
    const statusBarHeight = safeAreaInsets.top

    const safeArea = {
      left: safeAreaInsets.left,
      right: windowWidth - safeAreaInsets.right,
      top: safeAreaInsets.top,
      bottom: windowHeight - safeAreaInsets.bottom,
      width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
      height: windowHeight - safeAreaInsets.top - safeAreaInsets.bottom,
    }

    const { top: windowTop, bottom: windowBottom } = getWindowOffset()

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
        left: safeAreaInsets.left,
      },
      screenTop: screenHeight - windowHeight,
    }
  }
)
