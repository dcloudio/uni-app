import { defineAsyncApi, defineSyncApi } from '@dcloudio/uni-api'
import deviceId from '../../../helpers/uuid'
import { extend } from '@vue/shared'
import { getWindowInfo } from './getWindowInfo'

let systemInfo: any
let _initSystemInfo = true

function weexGetSystemInfoSync() {
  if (!_initSystemInfo) return
  const { getSystemInfoSync } = weex.requireModule('plus')
  systemInfo = getSystemInfoSync()
}

export const getDeviceInfo = defineSyncApi<typeof uni.getDeviceInfo>(
  'getDeviceInfo',
  () => {
    weexGetSystemInfoSync()
    const {
      deviceBrand,
      deviceModel,
      osName,
      osVersion,
      deviceOrientation,
      deviceType,
    } = systemInfo

    const brand = deviceBrand.toLowerCase()
    const _osName = osName.toLowerCase()

    return {
      deviceBrand: brand,
      deviceModel,
      devicePixelRatio: plus.screen.scale!,
      deviceId: deviceId(),
      deviceOrientation,
      deviceType,
      brand,
      model: deviceModel,
      system: `${_osName === 'ios' ? 'iOS' : 'Android'} ${osVersion}`,
      platform: _osName,
    }
  }
)

export const getAppBaseInfo = defineSyncApi<typeof uni.getAppBaseInfo>(
  'getAppBaseInfo',
  () => {
    weexGetSystemInfoSync()
    const {
      hostPackageName,
      hostName,
      hostVersion,
      hostLanguage,
      hostTheme,
      appId,
      appName,
      appVersion,
      appVersionCode,
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
      version: plus.runtime.innerVersion!,
      language: hostLanguage,
      theme: '',
      hostPackageName,
      hostName,
      hostVersion,
      hostLanguage,
      hostTheme,
      hostFontSizeSetting: undefined,
    }
  }
)

export const getSystemInfoSync = defineSyncApi<typeof uni.getSystemInfoSync>(
  'getSystemInfoSync',
  () => {
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
    let _osLanguage = `${osLanguageSplit[0]}${
      osLanguageSplitLast ? '-' + osLanguageSplitLast : ''
    }`

    let extraData = {
      errMsg: 'getSystemInfo:ok',
      fontSizeSetting: appBaseInfo.hostFontSizeSetting,
      uniCompileVersion: __uniConfig.compilerVersion,
      uniRuntimeVersion: __uniConfig.compilerVersion,
      osLanguage: _osLanguage,
      osName: _osName,
    }

    if (_osName === 'ios') {
      ;(extraData as any).romName = _osName
      ;(extraData as any).romVersion = osVersion
    }

    const _systemInfo: UniApp.GetSystemInfoResult = extend(
      systemInfo,
      windowInfo,
      deviceInfo,
      appBaseInfo,
      extraData
    )

    delete (_systemInfo as any).screenTop
    delete (_systemInfo as any).enableDebug
    delete (_systemInfo as any).theme

    return _systemInfo
  }
)

export const getSystemInfo = defineAsyncApi<typeof uni.getSystemInfo>(
  'getSystemInfo',
  (_, { resolve }) => {
    return resolve(getSystemInfoSync())
  }
)
