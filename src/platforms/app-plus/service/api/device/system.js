import { callApiSync } from '../util'
import { getWindowInfo } from './get-window-info'
import deviceId from 'uni-platform/helpers/uuid'
import { sortObject } from 'uni-shared'

let systemInfo = {}
let _initSystemInfo = true

function weexGetSystemInfoSync () {
  if (!_initSystemInfo) return
  const { getSystemInfoSync } = weex.requireModule('plus')
  systemInfo = getSystemInfoSync()
}

export function getDeviceInfo () {
  weexGetSystemInfoSync()
  const {
    deviceBrand = '', deviceModel, osName,
    osVersion, deviceOrientation, deviceType
  } = systemInfo

  const brand = deviceBrand.toLowerCase()
  const _osName = osName.toLowerCase()

  return {
    brand,
    deviceBrand: brand,
    deviceModel,
    devicePixelRatio: plus.screen.scale,
    deviceId: deviceId(),
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
    appId, appName, appVersion, appVersionCode
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
    theme: undefined,
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
  delete _systemInfo.theme

  return sortObject(_systemInfo)
}
