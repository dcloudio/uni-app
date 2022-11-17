import { callApiSync } from '../util'
import { getWindowInfo } from './get-window-info'
import { sortObject } from 'uni-shared'

let systemInfo = {}
let _initSystemInfo = true

export function weexGetSystemInfoSync () {
  if (!_initSystemInfo) return
  const { getSystemInfoSync } = weex.requireModule('plus')
  systemInfo = getSystemInfoSync()
  if (typeof systemInfo === 'string') {
    try {
      systemInfo = JSON.parse(systemInfo)
    } catch (error) { }
  }
  return systemInfo
}

export function getDeviceInfo () {
  weexGetSystemInfoSync()
  const {
    deviceBrand = '', deviceModel, osName,
    osVersion, deviceOrientation, deviceType,
    deviceId
  } = systemInfo

  const brand = deviceBrand.toLowerCase()
  const _osName = osName.toLowerCase()

  return {
    brand,
    deviceBrand: brand,
    deviceModel,
    devicePixelRatio: plus.screen.scale,
    deviceId,
    deviceOrientation,
    deviceType,
    model: deviceModel,
    platform: _osName,
    system: `${_osName === 'ios' ? 'iOS' : 'Android'} ${osVersion}`
  }
}

export function getAppBaseInfo () {
  weexGetSystemInfoSync()
  const {
    hostPackageName, hostName, osLanguage,
    hostVersion, hostLanguage, hostTheme,
    appId, appName, appVersion, appVersionCode,
    appWgtVersion
  } = systemInfo

  const appLanguage = uni
    ? uni.getLocale
      ? uni.getLocale()
      : hostLanguage
    : hostLanguage

  return {
    appId,
    appName,
    appVersion,
    appVersionCode,
    appWgtVersion,
    appLanguage,
    enableDebug: false,
    hostSDKVersion: undefined,
    hostPackageName,
    hostName,
    hostVersion,
    hostLanguage,
    hostTheme,
    hostFontSizeSetting: undefined,
    language: osLanguage,
    SDKVersion: '',
    theme: plus.navigator.getUIStyle(),
    version: plus.runtime.innerVersion
  }
}

export function getSystemInfoSync () {
  return callApiSync(getSystemInfo, Object.create(null), 'getSystemInfo', 'getSystemInfoSync')
}

export function getSystemInfo () {
  _initSystemInfo = true
  weexGetSystemInfoSync()
  _initSystemInfo = false
  const windowInfo = getWindowInfo()
  const deviceInfo = getDeviceInfo()
  const appBaseInfo = getAppBaseInfo()
  _initSystemInfo = true

  const extraData = {
    errMsg: 'getSystemInfo:ok',
    fontSizeSetting: appBaseInfo.hostFontSizeSetting,
    osName: systemInfo.osName.toLowerCase()
  }

  if (systemInfo.hostName) {
    extraData.hostSDKVersion = systemInfo.uniRuntimeVersion
  }

  const _systemInfo = Object.assign(
    {},
    systemInfo,
    windowInfo,
    deviceInfo,
    appBaseInfo,
    extraData
  )

  delete _systemInfo.screenTop
  delete _systemInfo.enableDebug
  if (!__uniConfig.darkmode) {
    delete _systemInfo.theme
  }

  return sortObject(_systemInfo)
}
