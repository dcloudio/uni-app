export default {
  returnValue: function (result) {
    const { version, language, SDKVersion, theme } = result

    let _hostName = __PLATFORM__.split('-')[1] // mp-jd
    if (__PLATFORM__ === 'mp-weixin') {
      if (result.host && result.host.env) {
        _hostName = result.host.env
      }
    }

    Object.assign(result, {
      hostVersion: version,
      hostLanguage: language.replace('_', '-'),
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: process.env.UNI_APP_ID,
      appName: process.env.UNI_APP_NAME,
      appVersion: process.env.UNI_APP_VERSION_NAME,
      appVersionCode: process.env.UNI_APP_VERSION_CODE
    })
  }
}
