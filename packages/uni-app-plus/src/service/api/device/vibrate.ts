import {
  type API_TYPE_VIBRATE_LONG,
  type API_TYPE_VIBRATE_SHORT,
  API_VIBRATE_LONG,
  API_VIBRATE_SHORT,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const vibrateShort = defineAsyncApi<API_TYPE_VIBRATE_SHORT>(
  API_VIBRATE_SHORT,
  (_, { resolve }) => {
    plus.device.vibrate(15)
    resolve()
  }
)

export const vibrateLong = defineAsyncApi<API_TYPE_VIBRATE_LONG>(
  API_VIBRATE_LONG,
  (_, { resolve }) => {
    plus.device.vibrate(400)
    resolve()
  }
)
