import { extend } from '@vue/shared'

function getDeviceBrand(model: string) {
  if (/iphone/gi.test(model) || /ipad/gi.test(model) || /mac/gi.test(model)) {
    return 'apple'
  }
  if (/windows/gi.test(model)) {
    return 'microsoft'
  }
}

const UUID_KEY = '__DC_STAT_UUID'
let deviceId: string
interface Global {
  getStorageSync: UniApp.Uni['getStorageSync']
}
export function useDeviceId(global: Global = __GLOBAL__ as Global) {
  return function addDeviceId(_: any, toRes: UniApp.GetSystemInfoResult) {
    deviceId = deviceId || global.getStorageSync(UUID_KEY)
    if (!deviceId) {
      deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7)
      __GLOBAL__.setStorage({
        key: UUID_KEY,
        data: deviceId,
      })
    }
    toRes.deviceId = deviceId
  }
}

export function addSafeAreaInsets(
  fromRes: any,
  toRes: UniApp.GetSystemInfoResult
) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom,
    }
  }
}

export function populateParameters(
  fromRes: any,
  toRes: UniApp.GetSystemInfoResult
) {
  const {
    brand,
    model,
    system,
    language,
    theme,
    version,
    hostName = '',
    platform,
  } = fromRes
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
    hostVersion = fromRes.swanNativeVersion || version
  }

  // deviceType
  let deviceType = fromRes.deviceType || 'phone'
  if (__PLATFORM__ !== 'mp-baidu') {
    type DeviceTypeMapsKeys = keyof typeof deviceTypeMaps
    const deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc',
    }
    const deviceTypeMapsKeys = Object.keys(
      deviceTypeMaps
    ) as DeviceTypeMapsKeys[]
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
  if (
    __PLATFORM__ === 'mp-toutiao' ||
    __PLATFORM__ === 'mp-lark' ||
    isQuickApp
  ) {
    deviceBrand = brand.toLocaleLowerCase()
  } else {
    deviceBrand = getDeviceBrand(deviceBrand)
  }

  // hostName
  let _hostName = hostName // mp-jd
  if (__PLATFORM__ === 'mp-weixin') _hostName = (fromRes.host || {}).env
  if (__PLATFORM__ === 'mp-baidu' || __PLATFORM__ === 'mp-kuaishou')
    _hostName = fromRes.host
  if (__PLATFORM__ === 'mp-qq') _hostName = fromRes.AppPlatform
  if (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark')
    _hostName = fromRes.appName
  if (__PLATFORM__ === 'mp-alipay') _hostName = fromRes.app

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
    osName: osName.toLocaleLowerCase(),
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
    browseVersion: '',
  }

  extend(toRes, parameters)
}
