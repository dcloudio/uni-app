import {
  API_OPEN_APP_AUTHORIZE_SETTING,
  type API_TYPE_OPEN_APP_AUTHORIZE_SETTING,
  defineAsyncApi,
} from '@dcloudio/uni-api'
type OpenAppAuthorizeSetting = (
  cb: (res: { type: string; code: number }) => void
) => void

export const openAppAuthorizeSetting =
  defineAsyncApi<API_TYPE_OPEN_APP_AUTHORIZE_SETTING>(
    API_OPEN_APP_AUTHORIZE_SETTING,
    (_, { resolve, reject }) => {
      const { openAppAuthorizeSetting } = weex.requireModule('plus')
      const fn = openAppAuthorizeSetting as OpenAppAuthorizeSetting
      fn((ret) => {
        if (ret.type === 'success') {
          resolve()
        } else {
          reject()
        }
      })
    }
  )
