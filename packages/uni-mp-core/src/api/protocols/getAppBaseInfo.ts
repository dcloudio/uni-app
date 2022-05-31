import { MPProtocol } from './types'
import { extend } from '@vue/shared'

export const getAppBaseInfo: MPProtocol = {
  returnValue: (fromRes, toRes) => {
    const { version, language, SDKVersion, theme } = fromRes

    let _hostName = __PLATFORM__.split('-')[1] // mp-jd
    if (__PLATFORM__ === 'mp-weixin') {
      if (fromRes.host && fromRes.host.env) {
        _hostName = fromRes.host.env
      }
    }

    extend(toRes, {
      hostVersion: version,
      hostLanguage: language.replace('_', '-'),
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: process.env.UNI_APP_ID,
      appName: process.env.UNI_APP_NAME,
      appVersion: process.env.UNI_APP_VERSION_NAME,
      appVersionCode: process.env.UNI_APP_VERSION_CODE,
    })
  },
}
