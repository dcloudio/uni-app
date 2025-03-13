import type { MPProtocol } from './types'
import { extend } from '@vue/shared'
import { getAppLanguage, getHostName } from './enhanceSystemInfo'

export const getAppBaseInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    const { version, language, SDKVersion, theme } = fromRes

    let _hostName = getHostName(fromRes)
    let hostLanguage = (language || '').replace(/_/g, '-')

    const parameters: Record<string, string | number | boolean | undefined> = {
      hostVersion: version,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: process.env.UNI_APP_ID,
      appName: process.env.UNI_APP_NAME,
      appVersion: process.env.UNI_APP_VERSION_NAME,
      appVersionCode: process.env.UNI_APP_VERSION_CODE,
      appLanguage: getAppLanguage(hostLanguage),
      isUniAppX: __X__,
      uniPlatform: process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM,
      uniCompileVersion: process.env.UNI_COMPILER_VERSION,
      uniCompilerVersion: process.env.UNI_COMPILER_VERSION,
      uniRuntimeVersion: process.env.UNI_COMPILER_VERSION,
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
  },
}
