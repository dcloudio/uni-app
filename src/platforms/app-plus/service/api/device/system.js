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
    osVersion
  } = systemInfo

  const brand = deviceBrand.toLowerCase()

  return {
    deviceBrand: brand,
    deviceModel,
    brand,
    model: deviceModel,
    system: `${osName === 'ios' ? 'iOS' : 'Android'} ${osVersion}`,
    platform: osName
  }
}

export function getAppBaseInfo () {
  weexGetSystemInfoSync()
  const {
    hostPackageName, hostName, osLanguage,
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
    appLanguage: uni.getLocale(),
    version: plus.runtime.innerVersion,
    language: osLanguage,
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
  const deviceInfo = getDeviceInfo()
  const appBaseInfo = getAppBaseInfo()
  _initSystemInfo = true

  const { osName, osLanguage, osVersion, pixelRatio } = systemInfo
  const osLanguageSplit = osLanguage.split('-')
  const osLanguageSplitLast = osLanguageSplit[osLanguageSplit.length - 1]
  let _osLanguage = `${osLanguageSplit[0]}${osLanguageSplitLast ? '-'+ osLanguageSplitLast : ''}`

  let extraData = {
    errMsg: 'getSystemInfo:ok',
    fontSizeSetting: appBaseInfo.hostFontSizeSetting,
    devicePixelRatio: pixelRatio,
    deviceId: deviceId(),
    uniCompileVersion: __uniConfig.compilerVersion,
    uniRuntimeVersion: __uniConfig.compilerVersion,
    osLanguage: _osLanguage
  }

  if (osName === 'ios') {
    extraData.romName = osName
    extraData.romVersion = osVersion
  }

  const _systemInfo = Object.assign(
    {},
    systemInfo,
    getWindowInfo(),
    deviceInfo,
    appBaseInfo,
    extraData
  )

  delete _systemInfo.screenTop
  delete _systemInfo.enableDebug
  delete _systemInfo.theme

  return _systemInfo
}
