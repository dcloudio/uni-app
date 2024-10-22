import { defineAsyncApi, defineSyncApi, getLocale } from '@dcloudio/uni-api'
import { extend, isString } from '@vue/shared'
import { getWindowInfo } from './getWindowInfo'
import { getTheme } from '../../theme'
import { sortObject } from '@dcloudio/uni-shared'

let systemInfo: any
let _initSystemInfo = true

export function weexGetSystemInfoSync() {
  if (!_initSystemInfo) return
  const { getSystemInfoSync } = weex.requireModule('plus')
  systemInfo = getSystemInfoSync()
  if (isString(systemInfo)) {
    try {
      systemInfo = JSON.parse(systemInfo)
    } catch (error) {}
  }
  return systemInfo
}

export const getDeviceInfo = defineSyncApi<typeof uni.getDeviceInfo>(
  'getDeviceInfo',
  () => {
    weexGetSystemInfoSync()
    const {
      deviceBrand = '',
      deviceModel,
      osName,
      osVersion,
      deviceOrientation,
      deviceType,
      deviceId,
      osLanguage,
      osTheme,
      romName,
      romVersion,
    } = systemInfo

    const brand = deviceBrand.toLowerCase()
    const _osName = osName.toLowerCase()

    return {
      brand,
      deviceBrand: brand,
      deviceModel,
      devicePixelRatio: plus.screen.scale!,
      deviceId,
      deviceOrientation,
      deviceType,
      model: deviceModel,
      platform: _osName,
      system: `${_osName === 'ios' ? 'iOS' : 'Android'} ${osVersion}`,
      osName,
      osVersion,
      osLanguage,
      osTheme,
      romName,
      romVersion,
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
      osLanguage,
      hostTheme,
      appId,
      appName,
      appVersion,
      appVersionCode,
      appWgtVersion,
      uniCompileVersion,
      uniPlatform,
    } = systemInfo

    return {
      appId,
      appName,
      appVersion,
      appVersionCode,
      appWgtVersion,
      appLanguage: getLocale ? getLocale() : osLanguage,
      enableDebug: false,
      hostPackageName,
      hostName,
      hostVersion,
      hostLanguage,
      hostTheme,
      hostFontSizeSetting: undefined,
      hostSDKVersion: undefined,
      language: osLanguage,
      SDKVersion: '',
      theme: getTheme(),
      version: plus.runtime.innerVersion!,
      isUniAppX: __X__,
      uniPlatform,
      uniCompileVersion,
      uniCompilerVersion: uniCompileVersion,
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

    const extraData = {
      fontSizeSetting: appBaseInfo.hostFontSizeSetting,
      osName: systemInfo.osName.toLowerCase(),
    }

    if (systemInfo.hostName) {
      ;(extraData as any).hostSDKVersion = systemInfo.uniRuntimeVersion
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
    if (!__uniConfig.darkmode) delete (_systemInfo as any).theme

    return sortObject(_systemInfo)
  }
)

export const getSystemInfo = defineAsyncApi<typeof uni.getSystemInfo>(
  'getSystemInfo',
  (_, { resolve }) => {
    return resolve(getSystemInfoSync())
  }
)
