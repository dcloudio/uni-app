function _getDeviceBrand(model) {
  if (/iphone/gi.test(model) || /ipad/gi.test(model) || /mac/gi.test(model)) { return 'apple' }
  if (/windows/gi.test(model)) { return 'microsoft' }
  return ''
}

const UUID_KEY = '__DC_STAT_UUID'
let deviceId
export function useDeviceId(result) {
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

export function addSafeAreaInsets(result) {
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

export function populateParameters(result) {
  const {
    brand = '', model = '', system = '',
    language = '', theme, version,
    hostName, platform, fontSizeSetting,
    SDKVersion, pixelRatio, deviceOrientation,
    environment
  } = result
  const isQuickApp = __PLATFORM__.indexOf('quickapp-webview') !== -1

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
  let deviceType = getGetDeviceType(result, model)

  // deviceModel
  let deviceBrand = getDeviceBrand(brand, model, isQuickApp)

  // hostName
  let _hostName = hostName || __PLATFORM__.split('-')[1] // mp-jd
  if (__PLATFORM__ === 'mp-weixin') {
    if (environment) {
      _hostName = environment
    } else if (result.host && fromRes.host.env) {
      _hostName = result.host.env
    }
  }
  if (__PLATFORM__ === 'mp-baidu' || __PLATFORM__ === 'mp-kuaishou') { _hostName = result.host }
  if (__PLATFORM__ === 'mp-qq') _hostName = result.AppPlatform
  if (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark') { _hostName = result.appName }
  if (__PLATFORM__ === 'mp-alipay') _hostName = result.app

  // deviceOrientation
  let _deviceOrientation = deviceOrientation // 仅 微信 百度 支持
  if (__PLATFORM__ === 'mp-baidu') { _deviceOrientation = result.orientation }

  // devicePixelRatio
  let _devicePixelRatio = pixelRatio
  if (__PLATFORM__ === 'mp-baidu') { _devicePixelRatio = result.devicePixelRatio }

  // SDKVersion
  let _SDKVersion = SDKVersion
  if (__PLATFORM__ === 'mp-alipay') { _SDKVersion = my.SDKVersion }

  // wx.getAccountInfoSync

  const parameters = {
    appId: process.env.UNI_APP_ID,
    appName: process.env.UNI_APP_NAME,
    appVersion: process.env.UNI_APP_VERSION_NAME,
    appVersionCode: process.env.UNI_APP_VERSION_CODE,
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
    hostLanguage: language.replace('_', '-'),
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
    browseVersion: undefined
  }

  Object.assign(result, parameters)
}

export function getGetDeviceType(result, model) {
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

export function getDeviceBrand(
  brand,
  model,
  isQuickApp = false
) {
  let deviceBrand = model.split(' ')[0].toLocaleLowerCase()
  if (
    __PLATFORM__ === 'mp-toutiao' ||
    __PLATFORM__ === 'mp-lark' ||
    isQuickApp
  ) {
    deviceBrand = brand.toLocaleLowerCase()
  } else {
    deviceBrand = _getDeviceBrand(deviceBrand)
  }
  return deviceBrand
}