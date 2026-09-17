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

export function getOSInfo(system: string = '', platform: string = '') {
  /**
   * system 枚举值说明：
   *
   * weixin: 操作系统及版本
   * qq: 操作系统及版本
   * kuaishou: 操作系统及版本
   * toutiao/douyin: 操作系统及版本
   *
   * alipay、dingding: 系统版本
   * baidu: 操作系统版本
   * jd: 操作系统版本
   * harmony: 操作系统版本
   *
   * lark: 文档无此字段
   */
  let osName = ''
  let osVersion = ''

  if (
    platform &&
    (__PLATFORM__ === 'mp-alipay' ||
      __PLATFORM__ === 'mp-baidu' ||
      __PLATFORM__ === 'mp-jd' ||
      __PLATFORM__ === 'mp-harmony')
  ) {
    osName = platform
    osVersion = system
    system = `${osName} ${osVersion}`
  } else {
    if (__PLATFORM__ === 'mp-weixin') {
      osName = platform
    } else {
      osName = system.split(' ')[0] || platform
    }
    osVersion = system.split(' ')[1] || ''
  }

  osName = osName.toLowerCase()

  switch (osName) {
    case 'harmony': // alipay
    case 'ohos': // weixin harmony
    case 'openharmonyos': // weixin 由 HarmonyOS 改为了 OpenHarmonyOS
    case 'openharmony': // feishu
      osName = 'harmonyos'
      break
    case 'iphone os': // alipay
      osName = 'ios'
      break
    case 'mac': // weixin qq
    case 'darwin': // feishu
      osName = 'macos'
      break
    case 'windows_nt': // feishu
      osName = 'windows'
      break
  }

  return {
    osName: osName.trim(),
    osVersion: osVersion.trim(),
    system: system.trim(),
  }
}

export function getPlatform(platform: string) {
  /**
   * platform 枚举值说明：
   *
   * weixin：ios、android、windows、mac、ohos、ohos_pc、devtools
   * alipay、dingding：Android，iOS / iPhone OS，Harmony
   * harmony: 固定 ohos
   *
   * toutiao: Android，iOS 无 harmony 平台，暂不处理
   * lark: 'pc' | 'mobile' | 'android' | 'ios', 无 harmony 平台，暂不处理
   *
   * baidu：无相关描述
   * qq: 无相关描述
   * kuaishou: 无相关描述
   * jd: 无相关描述
   */
  platform = platform.toLowerCase()
  if (__PLATFORM__ === 'mp-weixin' || __PLATFORM__ === 'mp-harmony') {
    if (platform === 'ohos') {
      platform = 'harmonyos'
    }
  } else {
    switch (platform) {
      case 'iphone os':
        platform = 'ios'
        break
      case 'openharmonyos':
      case 'openharmony':
      case 'harmony':
        platform = 'harmonyos'
        break
    }
  }
  return platform
}

export function populateParameters(
  fromRes: any,
  toRes: UniApp.GetSystemInfoResult
) {
  let {
    brand = '',
    model = '',
    system = '',
    language = '',
    theme,
    version = '',
    platform = '',
    fontSizeSetting,
    SDKVersion,
    pixelRatio,
    deviceOrientation,
  } = fromRes
  // const isQuickApp = __PLATFORM__.indexOf('quickapp-webview') !== -1

  if (__PLATFORM__ === 'mp-jd') {
    system = `${system} ${version}`
    system = system.trim()
  }

  // osName osVersion
  const {
    osName,
    osVersion,
    system: updatedSystem,
  } = getOSInfo(system, platform)
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
  const hostLanguage = (language || '').replace(/_/g, '-')

  // wx.getAccountInfoSync

  const parameters: Record<string, string | number | boolean | undefined> = {
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
    osName,
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    platform: getPlatform(platform),
    system: updatedSystem,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined,
    isUniAppX: __X__,
  }

  if (__PLATFORM__ === 'mp-harmony') {
    parameters.romName = 'HarmonyOS'
  }

  if (__X__) {
    try {
      parameters.uniCompilerVersionCode = parseFloat(
        process.env.UNI_COMPILER_VERSION
      )
      parameters.uniRuntimeVersionCode = parseFloat(
        process.env.UNI_COMPILER_VERSION
      )
    } catch (error) {}
  }

  extend(toRes, parameters)
}

export function getGetDeviceType(fromRes: any, model: string = '') {
  const platform = fromRes.platform || ''
  // deviceType
  let deviceType = fromRes.deviceType || 'phone'
  if (__PLATFORM__ !== 'mp-baidu') {
    type DeviceTypeMapsKeys = keyof typeof deviceTypeMaps
    const deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc',
      linux: 'pc',
      pc: 'pc',
    }
    const deviceTypeMapsKeys = Object.keys(
      deviceTypeMaps
    ) as DeviceTypeMapsKeys[]
    const _model = model.toLowerCase()
    for (let index = 0; index < deviceTypeMapsKeys.length; index++) {
      const _m = deviceTypeMapsKeys[index]
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m]
        break
      }
    }
  }
  if (__PLATFORM__ === 'mp-weixin' || __PLATFORM__ === 'mp-harmony') {
    if (platform === 'ohos_pc') {
      deviceType = 'pc'
    }
  }
  return deviceType
}

export function getDeviceBrand(brand: string) {
  // deviceModel
  let deviceBrand = brand
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLowerCase()
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
