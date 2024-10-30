import { extend } from '@vue/shared'
import { getLocale } from '../locale'

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
    brand = '',
    model = '',
    system = '',
    language = '',
    theme,
    version,
    platform,
    fontSizeSetting,
    SDKVersion,
    pixelRatio,
    deviceOrientation,
  } = fromRes
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
  if (__PLATFORM__ === 'mp-harmony') {
    osName = 'harmonyos'
  }
  let hostVersion = version
  // host 枚举值 https://smartprogram.baidu.com/docs/develop/api/device_sys/hostlist/
  if (__PLATFORM__ === 'mp-baidu') {
    hostVersion = fromRes.swanNativeVersion
  }
  if (__PLATFORM__ === 'mp-jd') {
    hostVersion = fromRes.hostVersionName
  }

  // deviceType
  let deviceType = getGetDeviceType(fromRes, model)

  // deviceModel
  let deviceBrand = getDeviceBrand(brand)

  // hostName
  let _hostName = getHostName(fromRes)

  // deviceOrientation
  let _deviceOrientation = deviceOrientation // 仅 微信 百度 支持
  if (__PLATFORM__ === 'mp-baidu') {
    _deviceOrientation = fromRes.orientation
  }

  // devicePixelRatio
  let _devicePixelRatio = pixelRatio
  if (__PLATFORM__ === 'mp-baidu') {
    _devicePixelRatio = fromRes.devicePixelRatio
  }

  // SDKVersion
  let _SDKVersion = SDKVersion
  if (__PLATFORM__ === 'mp-alipay') {
    _SDKVersion = my.SDKVersion
  }

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
    uniCompilerVersion: process.env.UNI_COMPILER_VERSION,
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
    browserVersion: undefined,
    isUniAppX: __X__,
    romName: __PLATFORM__ === 'mp-harmony' ? 'HarmonyOS' : undefined,
    romVersion: undefined,
  }

  extend(toRes, parameters)
}

export function getGetDeviceType(fromRes: any, model: string) {
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
  return deviceType
}

export function getDeviceBrand(brand: string) {
  // deviceModel
  let deviceBrand = brand
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase()
  }
  return deviceBrand
}

export function getAppLanguage(defaultLanguage: string) {
  return getLocale ? getLocale() : defaultLanguage
}

export function getHostName(fromRes: any) {
  const _platform =
    __PLATFORM__ === 'mp-weixin'
      ? 'WeChat'
      : __PLATFORM__ === 'mp-harmony'
      ? 'HarmonyOS'
      : __PLATFORM__.split('-')[1]
  let _hostName = fromRes.hostName || _platform // mp-jd
  if (__PLATFORM__ === 'mp-weixin') {
    if (fromRes.environment) {
      _hostName = fromRes.environment
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env
    }
  }
  if (__PLATFORM__ === 'mp-baidu' || __PLATFORM__ === 'mp-kuaishou') {
    _hostName = fromRes.host
  }
  if (__PLATFORM__ === 'mp-qq') _hostName = fromRes.AppPlatform
  if (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark') {
    _hostName = fromRes.appName
  }
  if (__PLATFORM__ === 'mp-alipay') _hostName = fromRes.app

  return _hostName
}
