import {
  callApiSync
} from '../util'

import { getWindowInfo } from './get-window-info'

import deviceId from 'uni-platform/helpers/uuid'

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
    deviceBrand, deviceModel, osName,
    osVersion, deviceOrientation, deviceType
  } = systemInfo

  const brand = deviceBrand.toLowerCase()
  const _osName = osName.toLowerCase()

  return {
    deviceBrand: brand,
    deviceModel,
    devicePixelRatio: plus.screen.scale,
    deviceId: deviceId(),
    deviceOrientation,
    deviceType,
    brand,
    model: deviceModel,
    system: `${_osName === 'ios' ? 'iOS' : 'Android'} ${osVersion}`,
    platform: _osName
  }
}

export function getAppBaseInfo () {
  weexGetSystemInfoSync()
  const {
    hostPackageName, hostName,
    hostVersion, hostLanguage, hostTheme,
    appId, appName, appVersion, appVersionCode
  } = systemInfo

  return {
    SDKVersion: '',
    hostSDKVersion: '',
    enableDebug: false,
    appId,
    appName,
    appVersion,
    appVersionCode,
    appLanguage: uni.getLocale ? uni.getLocale() : hostLanguage,
    version: plus.runtime.innerVersion,
    language: hostLanguage,
    theme: '',
    hostPackageName,
    hostName,
    hostVersion,
    hostLanguage,
    hostTheme,
    hostFontSizeSetting: undefined
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

  const { osName, osLanguage, osVersion } = systemInfo
  const _osName = osName.toLowerCase()
  const osLanguageSplit = osLanguage.split('-')
  const osLanguageSplitLast = osLanguageSplit[osLanguageSplit.length - 1]
  const _osLanguage = `${osLanguageSplit[0]}${osLanguageSplitLast ? '-' + osLanguageSplitLast : ''}`

  const extraData = {
    errMsg: 'getSystemInfo:ok',
    fontSizeSetting: appBaseInfo.hostFontSizeSetting,
    uniCompileVersion: __uniConfig.compilerVersion,
    uniRuntimeVersion: __uniConfig.compilerVersion,
    osLanguage: _osLanguage,
    osName: _osName
  }

  if (_osName === 'ios') {
    extraData.romName = _osName
    extraData.romVersion = osVersion
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

  return _systemInfo
}
