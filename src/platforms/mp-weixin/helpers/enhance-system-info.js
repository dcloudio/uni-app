import { getDeviceBrand } from 'uni-shared'

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
  const { brand, model, system, language, theme, version, hostName, platform } = result

  // osName osVersion
  let osName = ''
  let osVersion = ''
  if (__PLATFORM__ === 'mp-alipay') {
    osName = platform.toLocaleLowerCase()
    osVersion = system
  } else {
    osName = system.split(' ')[0] || ''
    osVersion = system.split(' ')[1] || ''
  }
  let hostVersion = version
  // host 枚举值 https://smartprogram.baidu.com/docs/develop/api/device_sys/hostlist/
  if (__PLATFORM__ === 'mp-baidu') {
    hostVersion = result.swanNativeVersion || version
  }

  // deviceType
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

  // deviceModel
  let deviceBrand = model.split(' ')[0].toLocaleLowerCase()
  if (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark') {
    deviceBrand = brand.toLocaleLowerCase()
  } else {
    deviceBrand = getDeviceBrand(deviceBrand)
  }

  // hostName
  let _hostName = hostName // mp-jd
  if (__PLATFORM__ === 'mp-weixin') _hostName = (result.host || {}).env
  if (__PLATFORM__ === 'mp-baidu' || __PLATFORM__ === 'mp-kuaishou') { _hostName = result.host }
  if (__PLATFORM__ === 'mp-qq') _hostName = result.AppPlatform
  if (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark') { _hostName = result.appName }
  if (__PLATFORM__ === 'mp-alipay') _hostName = result.app

  // wx.getAccountInfoSync

  const parameters = {
    appId: process.env.UNI_APP_ID,
    appName: process.env.UNI_APP_NAME,
    appVersion: process.env.UNI_APP_VERSION_NAME,
    appVersionCode: process.env.UNI_APP_VERSION_CODE,
    uniCompileVersion: process.env.UNI_COMPILER_VERSION,
    uniRuntimeVersion: process.env.UNI_COMPILER_VERSION,
    uniPlatform: process.env.UNI_PLATFORM,
    deviceBrand,
    deviceModel: model,
    deviceType,
    osName,
    osVersion,
    osLanguage: language,
    osTheme: theme,
    hostTheme: theme,
    hostVersion,
    hostLanguage: language,
    hostName: _hostName,
    // TODO
    ua: '',
    hostPackageName: '',
    browserName: '',
    browseVersion: ''
  }

  Object.assign(result, parameters)
}
