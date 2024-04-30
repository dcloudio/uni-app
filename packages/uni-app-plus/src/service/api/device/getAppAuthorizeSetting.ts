import {
  API_GET_APP_AUTHORIZE_SETTING,
  type API_TYPE_GET_APP_AUTHORIZE_SETTING,
  defineSyncApi,
} from '@dcloudio/uni-api'
import { hasOwn } from '@vue/shared'

type AppAuthorizeSetting = ReturnType<API_TYPE_GET_APP_AUTHORIZE_SETTING>

export const getAppAuthorizeSetting =
  defineSyncApi<API_TYPE_GET_APP_AUTHORIZE_SETTING>(
    API_GET_APP_AUTHORIZE_SETTING,
    () => {
      const { getAppAuthorizeSetting } = weex.requireModule('plus')
      let appAuthorizeSetting = getAppAuthorizeSetting() as AppAuthorizeSetting
      try {
        if (typeof appAuthorizeSetting === 'string')
          appAuthorizeSetting = JSON.parse(appAuthorizeSetting)
      } catch (error) {}

      for (const key in appAuthorizeSetting) {
        if (hasOwn(appAuthorizeSetting, key)) {
          const value = appAuthorizeSetting[key as keyof AppAuthorizeSetting]
          // @ts-expect-error
          if (value === 'undefined') appAuthorizeSetting[key] = undefined
        }
      }

      return appAuthorizeSetting
    }
  )
