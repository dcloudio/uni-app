import {
  API_GET_SCREEN_BRIGHTNESS,
  API_SET_KEEP_SCREEN_ON,
  API_SET_SCREEN_BRIGHTNESS,
  type API_TYPE_GET_SCREEN_BRIGHTNESS,
  type API_TYPE_SET_KEEP_SCREEN_ON,
  type API_TYPE_SET_SCREEN_BRIGHTNESS,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const getScreenBrightness =
  defineAsyncApi<API_TYPE_GET_SCREEN_BRIGHTNESS>(
    API_GET_SCREEN_BRIGHTNESS,
    (_, { resolve }) => {
      const value = (plus as any).screen.getBrightness(false)
      resolve({ value })
    }
  )

export const setScreenBrightness =
  defineAsyncApi<API_TYPE_SET_SCREEN_BRIGHTNESS>(
    API_SET_SCREEN_BRIGHTNESS,
    (options, { resolve }) => {
      ;(plus as any).screen.setBrightness(options.value, false)
      resolve()
    }
  )

export const setKeepScreenOn = defineAsyncApi<API_TYPE_SET_KEEP_SCREEN_ON>(
  API_SET_KEEP_SCREEN_ON,
  (options, { resolve }) => {
    plus.device.setWakelock(!!options.keepScreenOn)
    resolve()
  }
)
