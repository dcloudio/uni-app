import { getLocale } from 'uni-core/runtime/locale'

const UUID_KEY = '__DC_STAT_UUID'
let deviceId
export function useDeviceId (result) {
  deviceId = deviceId || __GLOBAL__.getStorageSync(UUID_KEY)
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7)
    __GLOBAL__.setStorage({
      key: UUID_KEY,
      data: deviceId
    })
  }
  result.deviceId = deviceId
}

export function addSafeAreaInsets (result) {
  if (result.safeArea) {
    const safeArea = result.safeArea
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    }
  }
}

export function populateParameters (result) {
  const {
    brand = '', model = '', system = '',
    language = '', theme, version,
    platform, fontSizeSetting,
    SDKVersion, pixelRatio, deviceOrientation
  } = result
  // const isQuickApp = __PLATFORM__.indexOf('quickapp-webview') !== -1

  // osName osVersion
  let osName = ''
  let osVersion = ''
  if (__PLATFORM__ === 'mp-alipay') {
    osName = platform
    osVersion = system
  } else {
    osName = system.split(' ')[0] || ''
    osVersion = system.split(' ')[1] || ''
  }
  let hostVersion = version
  // host 枚举值 https://smartprogram.baidu.com/docs/develop/api/device_sys/hostlist/
  if (__PLATFORM__ === 'mp-baidu') {
    hostVersion = result.swanNativeVersion
  }
  if (__PLATFORM__ === 'mp-jd') {
    hostVersion = result.hostVersionName
  }

  // deviceType
  const deviceType = getGetDeviceType(result, model)

  // deviceModel
  const deviceBrand = getDeviceBrand(brand)

  // hostName
  const _hostName = getHostName(result)

  // deviceOrientation
  let _deviceOrientation = deviceOrientation // 仅 微信 百度 支持
  if (__PLATFORM__ === 'mp-baidu') { _deviceOrientation = result.orientation }

  // devicePixelRatio
  let _devicePixelRatio = pixelRatio
  if (__PLATFORM__ === 'mp-baidu') { _devicePixelRatio = result.devicePixelRatio }

  // SDKVersion
  let _SDKVersion = SDKVersion
  if (__PLATFORM__ === 'mp-alipay') { _SDKVersion = my.SDKVersion }

  // hostLanguage
  const hostLanguage = language.replace(/_/g, '-')

  // wx.getAccountInfoSync

  const parameters = {
    appId: process.env.UNI_APP_ID,
    appName: process.env.UNI_APP_NAME,
    appVersion: process.env.UNI_APP_VERSION_NAME,
    appVersionCode: process.env.UNI_APP_VERSION_CODE,
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: process.env.UNI_COMPILER_VERSION,
    uniRuntimeVersion: process.env.UNI_COMPILER_VERSION,
    uniPlatform: process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM,
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  }

  Object.assign(result, parameters)
}

export function getGetDeviceType (result, model) {
  let deviceType = result.deviceType || 'phone'
  if (__PLATFORM__ !== 'mp-baidu') {
    const deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    }
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps)
    const _model = model.toLocaleLowerCase()
    for (let index = 0; index < deviceTypeMapsKeys.length; index++) {
      const _m = deviceTypeMapsKeys[index]
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m]
        break
      }
    }
  }
  return deviceType
}

export function getDeviceBrand (brand) {
  let deviceBrand = brand
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase()
  }
  return deviceBrand
}

export function getAppLanguage (defaultLanguage) {
  return getLocale
    ? getLocale()
    : defaultLanguage
}

export function getHostName (result) {
  const _platform = __PLATFORM__ === 'mp-weixin' ? 'WeChat' : __PLATFORM__.split('-')[1]
  let _hostName = result.hostName || _platform // mp-jd
  if (__PLATFORM__ === 'mp-weixin') {
    if (result.environment) {
      _hostName = result.environment
    } else if (result.host && result.host.env) {
      _hostName = result.host.env
    }
  }
  if (__PLATFORM__ === 'mp-baidu' || __PLATFORM__ === 'mp-kuaishou') { _hostName = result.host }
  if (__PLATFORM__ === 'mp-qq') _hostName = result.AppPlatform
  if (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark') { _hostName = result.appName }
  if (__PLATFORM__ === 'mp-alipay') _hostName = result.app

  return _hostName
}
