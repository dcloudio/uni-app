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

export function getOSInfo (system, platform) {
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
    (__PLATFORM__ === 'mp-alipay' || __PLATFORM__ === 'mp-baidu' || __PLATFORM__ === 'mp-jd' || __PLATFORM__ === 'mp-harmony')
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

  osName = osName.toLocaleLowerCase()

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
    osName,
    osVersion,
    system
  }
}

export function getPlatform (platform) {
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

export function populateParameters (result) {
  const {
    brand = '', model = '', system = '',
    language = '', theme, version,
    platform, fontSizeSetting,
    SDKVersion, pixelRatio, deviceOrientation
  } = result
  // const isQuickApp = __PLATFORM__.indexOf('quickapp-webview') !== -1

  const extraParam = {}

  // osName osVersion
  const { osName, osVersion, system: updatedSystem } = getOSInfo(system, platform)
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
  const hostLanguage = (language || '').replace(/_/g, '-')

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
    platform: getPlatform(platform),
    system: updatedSystem,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined,
    isUniAppX: false
  }

  Object.assign(result, parameters, extraParam)
}

export function getGetDeviceType (result, model) {
  const platform = result.platform || ''
  let deviceType = result.deviceType || 'phone'
  if (__PLATFORM__ !== 'mp-baidu') {
    const deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc',
      linux: 'pc',
      pc: 'pc'
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
  if (__PLATFORM__ === 'mp-weixin' || __PLATFORM__ === 'mp-harmony') {
    if (platform === 'ohos_pc') {
      deviceType = 'pc'
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
  const _platform =
    __PLATFORM__ === 'mp-weixin'
      ? 'WeChat'
      : __PLATFORM__ === 'mp-harmony'
        ? 'HarmonyOS'
        : __PLATFORM__.split('-')[1]
  let _hostName = result.hostName || _platform // mp-jd
  if (__PLATFORM__ === 'mp-weixin') {
    if (result.environment) {
      _hostName = result.environment
    } else if (result.host && result.host.env) {
      _hostName = result.host.env
    }
  }
  if (__PLATFORM__ === 'mp-baidu' || __PLATFORM__ === 'mp-kuaishou') {
    _hostName = result.host
  }
  if (__PLATFORM__ === 'mp-qq') _hostName = result.AppPlatform
  if (__PLATFORM__ === 'mp-toutiao' || __PLATFORM__ === 'mp-lark') {
    _hostName = result.appName
  }
  if (__PLATFORM__ === 'mp-alipay') _hostName = result.app

  return _hostName
}
