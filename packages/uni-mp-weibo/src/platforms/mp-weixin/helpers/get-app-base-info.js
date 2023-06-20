import { getAppLanguage, getHostName } from './enhance-system-info'
import { sortObject } from 'uni-shared'

export default {
  returnValue: function (result) {
    const { version, language, SDKVersion, theme } = result

    const _hostName = getHostName(result)

    const hostLanguage = language.replace('_', '-')

    result = sortObject(Object.assign(result, {
      appId: process.env.UNI_APP_ID,
      appName: process.env.UNI_APP_NAME,
      appVersion: process.env.UNI_APP_VERSION_NAME,
      appVersionCode: process.env.UNI_APP_VERSION_CODE,
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }))
  }
}
