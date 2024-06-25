import { defineSyncApi, getLocale } from '@dcloudio/uni-api'
import deviceId from '../../../helpers/uuid'
import { getBrowserInfo } from '../base/getBrowserInfo'
import { getWindowInfo } from './getWindowInfo'
import { extend } from '@vue/shared'
import { sortObject } from '@dcloudio/uni-shared'

type BrowserInfo = ReturnType<typeof getBrowserInfo>

let browserInfo: BrowserInfo
let _initBrowserInfo = true

function initBrowserInfo() {
  if (__NODE_JS__) {
    //TODO 配合 uniCloud 测试
    return (browserInfo = {} as BrowserInfo)
  }
  if (!_initBrowserInfo) return
  browserInfo = getBrowserInfo()
}
export const getDeviceInfo = defineSyncApi<typeof uni.getDeviceInfo>(
  'getDeviceInfo',
  () => {
    initBrowserInfo()
    const {
      deviceBrand,
      deviceModel,
      brand,
      model,
      platform,
      system,
      deviceOrientation,
      deviceType,
      osname,
      osversion,
    } = browserInfo

    return extend(
      {
        brand,
        deviceBrand,
        deviceModel,
        devicePixelRatio: __NODE_JS__ ? 1 : window.devicePixelRatio,
        deviceId: __NODE_JS__
          ? Date.now() + '' + Math.floor(Math.random() * 1e7)
          : deviceId(),
        deviceOrientation,
        deviceType,
        model,
        platform,
        system,
      },
      __X__
        ? {
            osName: osname ? osname.toLocaleLowerCase() : undefined,
            osVersion: osversion,
          }
        : {}
    )
  }
)
export const getAppBaseInfo = defineSyncApi<typeof uni.getAppBaseInfo>(
  'getAppBaseInfo',
  () => {
    initBrowserInfo()
    const { theme, language, browserName, browserVersion } = browserInfo

    return extend(
      {
        appId: __uniConfig.appId,
        appName: __uniConfig.appName,
        appVersion: __uniConfig.appVersion,
        appVersionCode: __uniConfig.appVersionCode,
        appLanguage: getLocale ? getLocale() : language,
        enableDebug: false,
        hostSDKVersion: undefined,
        hostPackageName: undefined,
        hostFontSizeSetting: undefined,
        hostName: browserName,
        hostVersion: browserVersion,
        hostTheme: theme,
        hostLanguage: language,
        language,
        SDKVersion: '',
        theme,
        version: '',
      },
      __X__
        ? {
            uniCompilerVersion: __uniConfig.compilerVersion,
            uniRuntimeVersion: __uniConfig.compilerVersion,
            uniCompilerVersionCode: parseFloat(__uniConfig.compilerVersion),
            uniRuntimeVersionCode: parseFloat(__uniConfig.compilerVersion),
            isUniAppX: true,
          }
        : {}
    )
  }
)

/**
 * 获取系统信息-同步
 */
export const getSystemInfoSync = defineSyncApi<typeof uni.getSystemInfoSync>(
  'getSystemInfoSync',
  () => {
    if (__NODE_JS__) {
      //TODO 临时搞一下配合 uniCloud 测试
      return {
        deviceId: Date.now() + '' + Math.floor(Math.random() * 1e7),
        platform: 'nodejs',
      } as UniApp.GetSystemInfoResult
    }

    _initBrowserInfo = true
    initBrowserInfo()
    _initBrowserInfo = false
    const windowInfo = getWindowInfo()
    const deviceInfo = getDeviceInfo()
    const appBaseInfo = getAppBaseInfo()
    _initBrowserInfo = true

    const { ua, browserName, browserVersion, osname, osversion } = browserInfo

    const systemInfo: UniApp.GetSystemInfoResult = extend(
      windowInfo,
      deviceInfo,
      appBaseInfo,
      {
        ua,
        browserName,
        browserVersion,
        uniPlatform: 'web',
        uniCompileVersion: __uniConfig.compilerVersion,
        uniRuntimeVersion: __uniConfig.compilerVersion,
        fontSizeSetting: undefined,
        osName: osname!.toLocaleLowerCase(),
        osVersion: osversion,
        osLanguage: undefined,
        osTheme: undefined,
      }
    )

    delete (systemInfo as any).screenTop
    delete (systemInfo as any).enableDebug
    if (!__uniConfig.darkmode) delete (systemInfo as any).theme

    return sortObject(systemInfo)
  }
)
