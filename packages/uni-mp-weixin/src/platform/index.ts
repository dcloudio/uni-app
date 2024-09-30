/**
 * 获取wx系统基本信息，
 * @param key 指定key，则调用指定wx的api
 * @returns
 */
export function getBaseSystemInfo(key?: any) {
  if (key) {
    if (isGetSystemSetting(key)) return wx.getSystemSetting()
    if (isGetAppAuthorizeSetting(key)) return wx.getAppAuthorizeSetting()
    if (isGetDeviceInfo(key)) return wx.getDeviceInfo()
    if (isGetWindowInfo(key)) return wx.getWindowInfo()
    if (isGetAppBaseInfo(key)) return wx.getAppBaseInfo()
  }
  // 以下方法都是微信2.20.1 开始支持
  if (
    wx.getSystemSetting &&
    wx.getAppAuthorizeSetting &&
    wx.getDeviceInfo &&
    wx.getWindowInfo &&
    wx.getAppBaseInfo
  ) {
    Object.assign(
      {},
      wx.getSystemSetting(),
      wx.getAppAuthorizeSetting(),
      wx.getDeviceInfo(),
      wx.getWindowInfo(),
      wx.getAppBaseInfo()
    )
  } else {
    return wx.getSystemInfoSync()
  }
}

function isGetSystemSetting(key: keyof WechatMiniprogram.SystemSetting) {
  switch (key) {
    case 'bluetoothEnabled':
      return true
    case 'deviceOrientation':
      return true
    case 'locationEnabled':
      return true
    case 'wifiEnabled':
      return true
    default:
      return false
  }
}

function isGetAppAuthorizeSetting(
  key: keyof WechatMiniprogram.AppAuthorizeSetting
) {
  switch (key) {
    case 'albumAuthorized':
      return true
    case 'bluetoothAuthorized':
      return true
    case 'cameraAuthorized':
      return true
    case 'locationAuthorized':
      return true
    case 'locationReducedAccuracy':
      return true
    case 'microphoneAuthorized':
      return true
    case 'notificationAlertAuthorized':
      return true
    case 'notificationAuthorized':
      return true
    case 'notificationBadgeAuthorized':
      return true
    case 'phoneCalendarAuthorized':
      return true
    case 'notificationSoundAuthorized':
      return true
    default:
      return false
  }
}

function isGetDeviceInfo(key: keyof WechatMiniprogram.DeviceInfo) {
  switch (key) {
    case 'brand':
      return true
    case 'model':
      return true
    case 'abi':
      return true
    case 'benchmarkLevel':
      return true
    case 'cpuType':
      return true
    case 'deviceAbi':
      return true
    case 'memorySize':
      return true
    case 'platform':
      return true
    case 'system':
      return true
    default:
      return false
  }
}

function isGetWindowInfo(key: keyof WechatMiniprogram.WindowInfo) {
  switch (key) {
    case 'windowWidth':
      return true
    case 'windowHeight':
      return true
    case 'statusBarHeight':
      return true
    case 'safeArea':
      return true
    case 'pixelRatio':
      return true
    case 'screenHeight':
      return true
    case 'screenTop':
      return true
    case 'screenWidth':
      return true
    default:
      return false
  }
}

function isGetAppBaseInfo(key: keyof WechatMiniprogram.AppBaseInfo) {
  switch (key) {
    case 'SDKVersion':
      return true
    case 'version':
      return true
    case 'language':
      return true
    case 'enableDebug':
      return true
    case 'fontSizeScaleFactor':
      return true
    case 'fontSizeSetting':
      return true
    case 'host':
      return true
    case 'theme':
      return true
    default:
      return false
  }
}
