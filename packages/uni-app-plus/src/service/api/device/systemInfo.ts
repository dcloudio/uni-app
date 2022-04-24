import { NAVBAR_HEIGHT } from '@dcloudio/uni-shared'
import { defineAsyncApi, defineSyncApi } from '@dcloudio/uni-api'
import tabBar from '../../framework/app/tabBar'
import { getCurrentWebview } from '../../utils'
import { getStatusbarHeight } from '../../../helpers/statusBar'
import { isTabBarPage } from '../../../helpers/plus'
import deviceId from '../../../helpers/uuid'

type SafeAreaInsets = Required<PlusNavigatorSafeAreaInsets>

function getScreenInfo() {
  // 好像开发时刷新，偶发的 plus.screen.getCurrentSize 为 undefined
  const { resolutionWidth, resolutionHeight } =
    plus.screen.getCurrentSize() || {
      resolutionWidth: 0,
      resolutionHeight: 0,
    }
  return {
    screenWidth: Math.round(resolutionWidth),
    screenHeight: Math.round(resolutionHeight),
  }
}

export const getSystemInfoSync = defineSyncApi<typeof uni.getSystemInfoSync>(
  'getSystemInfoSync',
  () => {
    const platform = plus.os.name!.toLowerCase()
    const ios = platform === 'ios'
    const isAndroid = platform === 'android'
    const { screenWidth, screenHeight } = getScreenInfo()
    const statusBarHeight = getStatusbarHeight()

    let safeAreaInsets: SafeAreaInsets
    const titleNView = {
      height: 0,
      cover: false,
    }
    const webview = getCurrentWebview()
    if (webview) {
      const webStyle = webview.getStyle()
      const style = webStyle && webStyle.titleNView
      if (style && style.type && (style as any).type !== 'none') {
        titleNView.height =
          style.type === 'transparent' ? 0 : statusBarHeight + NAVBAR_HEIGHT
        titleNView.cover =
          style.type === 'transparent' || style.type === 'float'
      }
      safeAreaInsets = webview.getSafeAreaInsets() as SafeAreaInsets
    } else {
      safeAreaInsets = plus.navigator.getSafeAreaInsets() as SafeAreaInsets
    }
    const tabBarView = {
      height: 0,
      cover: false,
    }
    if (isTabBarPage()) {
      tabBarView.height = tabBar.visible ? tabBar.height : 0
      tabBarView.cover = tabBar.cover
    }
    const windowTop = titleNView.cover ? titleNView.height : 0
    const windowBottom = tabBarView.cover ? tabBarView.height : 0
    let windowHeight = screenHeight - titleNView.height - tabBarView.height
    let windowHeightReal =
      screenHeight -
      (titleNView.cover ? 0 : titleNView.height) -
      (tabBarView.cover ? 0 : tabBarView.height)
    const windowWidth = screenWidth
    if (
      (!tabBarView.height || tabBarView.cover) &&
      !safeAreaInsets.bottom &&
      safeAreaInsets.deviceBottom
    ) {
      windowHeight -= safeAreaInsets.deviceBottom
      windowHeightReal -= safeAreaInsets.deviceBottom
    }
    safeAreaInsets = ios
      ? safeAreaInsets
      : ({
          left: 0,
          right: 0,
          top: titleNView.height && !titleNView.cover ? 0 : statusBarHeight,
          bottom: 0,
        } as SafeAreaInsets)
    const safeArea = {
      left: safeAreaInsets.left,
      right: windowWidth - safeAreaInsets.right,
      top: safeAreaInsets.top,
      bottom: windowHeightReal - safeAreaInsets.bottom,
      width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
      height: windowHeightReal - safeAreaInsets.top - safeAreaInsets.bottom,
    }

    return {
      brand: plus.device.vendor!,
      model: plus.device.model!,
      pixelRatio: plus.screen.scale!,
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight,
      statusBarHeight,
      language: plus.os.language!,
      system: `${ios ? 'iOS' : isAndroid ? 'Android' : ''} ${plus.os.version!}`,
      version: plus.runtime.innerVersion!,
      platform,
      SDKVersion: '',
      windowTop,
      windowBottom,
      safeArea,
      safeAreaInsets: {
        top: safeAreaInsets.top,
        right: safeAreaInsets.right,
        bottom: safeAreaInsets.bottom,
        left: safeAreaInsets.left,
      },
      deviceId: deviceId(),
    }
  }
)

export const getSystemInfo = defineAsyncApi<typeof uni.getSystemInfo>(
  'getSystemInfo',
  (_, { resolve }) => {
    return resolve(getSystemInfoSync())
  }
)
