import {
  API_GET_APP_AUTHORIZE_SETTING,
  API_TYPE_GET_APP_AUTHORIZE_SETTING,
  defineSyncApi,
} from '@dcloudio/uni-api'

export const getAppAuthorizeSetting =
  defineSyncApi<API_TYPE_GET_APP_AUTHORIZE_SETTING>(
    API_GET_APP_AUTHORIZE_SETTING,
    () => {
      const { getAppAuthorizeSetting } = weex.requireModule('plus')
      let appAuthorizeSetting =
        getAppAuthorizeSetting() as ReturnType<API_TYPE_GET_APP_AUTHORIZE_SETTING>
      try {
        if (typeof appAuthorizeSetting === 'string')
          appAuthorizeSetting = JSON.parse(appAuthorizeSetting)
      } catch (error) {}

      return appAuthorizeSetting
    }
  )
