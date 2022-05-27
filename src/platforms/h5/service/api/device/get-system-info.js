import { getWindowInfo } from './get-window-info'
import deviceId from 'uni-platform/helpers/uuid'
import { getBrowserInfo } from '../base/get-browser-info'

let browserInfo = {}
let _initBrowserInfo = true

function initBrowserInfo () {
  if (!_initBrowserInfo) return
  browserInfo = getBrowserInfo()
}

export function getDeviceInfo () {
  initBrowserInfo()
  const {
    deviceBrand,
    deviceModel,
    brand,
    model,
    platform,
    system,
    deviceOrientation,
    deviceType
  } = browserInfo

  return {
    deviceBrand,
    deviceModel,
    devicePixelRatio: window.devicePixelRatio,
    deviceId: deviceId(),
    deviceOrientation,
    deviceType,
    brand,
    model,
    system,
    platform
  }
}

export function getAppBaseInfo () {
  initBrowserInfo()
  const {
    theme,
    browserName,
    browseVersion,
    language
  } = browserInfo

  const appLanguage = uni
    ? uni.getLocale
      ? uni.getLocale()
      : language
    : language

  return {
    SDKVersion: '',
    hostSDKVersion: '',
    enableDebug: false,
    hostPackageName: '',
    hostFontSizeSetting: undefined,
    language,
    hostName: browserName,
    hostVersion: browseVersion,
    hostTheme: theme,
    hostLanguage: language,
    theme,
    appId: __uniConfig.appId,
    appName: __uniConfig.appName,
    appVersion: __uniConfig.appVersion,
    appVersionCode: __uniConfig.appVersionCode,
    appLanguage,
    version: __uniConfig.appVersion
  }
}

/**
 * 获取系统信息-同步
 */
export function getSystemInfoSync () {
  _initBrowserInfo = true
  initBrowserInfo()
  _initBrowserInfo = false
  const windowInfo = getWindowInfo()
  const deviceInfo = getDeviceInfo()
  const appBaseInfo = getAppBaseInfo()
  _initBrowserInfo = true

  const { ua, browserName, browseVersion, osname, osversion } = browserInfo

  const systemInfo = Object.assign(
    {},
    windowInfo,
    deviceInfo,
    appBaseInfo,
    {
      ua,
      browserName,
      browseVersion,
      uniPlatform: 'web',
      uniCompileVersion: __uniConfig.compilerVersion,
      uniRuntimeVersion: __uniConfig.compilerVersion,
      fontSizeSetting: appBaseInfo.hostFontSizeSetting,
      osName: osname.toLocaleLowerCase(),
      osVersion: osversion,
      osLanguage: undefined,
      osTheme: undefined
    }
  )

  delete systemInfo.screenTop
  delete systemInfo.enableDebug
  delete systemInfo.theme

  return systemInfo
}
/**
 * 获取系统信息-异步
 */
export function getSystemInfo () {
  return getSystemInfoSync()
}
