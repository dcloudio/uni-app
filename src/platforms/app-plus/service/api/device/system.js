import {
  callApiSync,
  isTabBarPage,
  getLastWebview,
  getScreenInfo
} from '../util'

import { NAVBAR_HEIGHT } from 'uni-helpers/constants'

import tabBar from '../../framework/tab-bar'

import { getStatusbarHeight } from 'uni-platform/helpers/status-bar'

import deviceId from 'uni-platform/helpers/uuid'

export function getSystemInfoSync () {
  return callApiSync(getSystemInfo, Object.create(null), 'getSystemInfo', 'getSystemInfoSync')
}

export function getSystemInfo () {
  const platform = plus.os.name.toLowerCase()
  const ios = platform === 'ios'
  const isAndroid = platform === 'android'
  const {
    screenWidth,
    screenHeight
  } = getScreenInfo()
  const statusBarHeight = getStatusbarHeight()

  let safeAreaInsets
  const titleNView = {
    height: 0,
    cover: false
  }
  const webview = getLastWebview()
  if (webview) {
    let style = webview.getStyle()
    style = style && style.titleNView
    if (style && style.type && style.type !== 'none') {
      titleNView.height = style.type === 'transparent' ? 0 : (statusBarHeight + NAVBAR_HEIGHT)
      titleNView.cover = style.type === 'transparent' || style.type === 'float'
    }
    safeAreaInsets = webview.getSafeAreaInsets()
  } else {
    safeAreaInsets = plus.navigator.getSafeAreaInsets()
  }
  const tabBarView = {
    height: 0,
    cover: false
  }
  if (isTabBarPage()) {
    tabBarView.height = tabBar.visible ? tabBar.height : 0
    tabBarView.cover = tabBar.cover
  }
  const windowTop = titleNView.cover ? titleNView.height : 0
  const windowBottom = tabBarView.cover ? tabBarView.height : 0
  let windowHeight = screenHeight - titleNView.height - tabBarView.height
  let windowHeightReal = screenHeight - (titleNView.cover ? 0 : titleNView.height) - (tabBarView.cover ? 0 : tabBarView.height)
  const windowWidth = screenWidth
  if ((!tabBarView.height || tabBarView.cover) && !safeAreaInsets.bottom && safeAreaInsets.deviceBottom) {
    windowHeight -= safeAreaInsets.deviceBottom
    windowHeightReal -= safeAreaInsets.deviceBottom
  }
  safeAreaInsets = ios ? safeAreaInsets : {
    left: 0,
    right: 0,
    top: titleNView.height && !titleNView.cover ? 0 : statusBarHeight,
    bottom: 0
  }
  const safeArea = {
    left: safeAreaInsets.left,
    right: windowWidth - safeAreaInsets.right,
    top: safeAreaInsets.top,
    bottom: windowHeightReal - safeAreaInsets.bottom,
    width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
    height: windowHeightReal - safeAreaInsets.top - safeAreaInsets.bottom
  }

  return {
    errMsg: 'getSystemInfo:ok',
    brand: plus.device.vendor,
    model: plus.device.model,
    pixelRatio: plus.screen.scale,
    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight,
    statusBarHeight,
    language: plus.os.language,
    system: `${ios ? 'iOS' : isAndroid ? 'Android' : ''} ${plus.os.version}`,
    version: plus.runtime.innerVersion,
    fontSizeSetting: '',
    platform,
    SDKVersion: '',
    windowTop,
    windowBottom,
    safeArea,
    safeAreaInsets: {
      top: safeAreaInsets.top,
      right: safeAreaInsets.right,
      bottom: safeAreaInsets.bottom,
      left: safeAreaInsets.left
    },
    deviceId: deviceId()
  }
}
