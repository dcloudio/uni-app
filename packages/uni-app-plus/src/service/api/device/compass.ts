import {
  API_OFF_COMPASS,
  API_ON_COMPASS,
  API_START_COMPASS,
  API_STOP_COMPASS,
  type API_TYPE_OFF_COMPASS_CHANGE,
  type API_TYPE_ON_COMPASS_CHANGE,
  type API_TYPE_START_COMPASS,
  type API_TYPE_STOP_COMPASS,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
} from '@dcloudio/uni-api'
import { DEVICE_FREQUENCY } from '../constants'

let listener: number | null = null

export const onCompassChange = defineOnApi<API_TYPE_ON_COMPASS_CHANGE>(
  API_ON_COMPASS,
  () => {
    startCompass()
  }
)

export const offCompassChange = defineOffApi<API_TYPE_OFF_COMPASS_CHANGE>(
  API_OFF_COMPASS,
  () => {
    stopCompass()
  }
)

export const startCompass = defineAsyncApi<API_TYPE_START_COMPASS>(
  API_START_COMPASS,
  (_, { resolve, reject }) => {
    if (!listener) {
      listener = plus.orientation.watchOrientation(
        (res) => {
          UniServiceJSBridge.invokeOnCallback(API_ON_COMPASS, {
            direction: res.magneticHeading,
          })
        },
        (err) => {
          reject(err.message)
          listener = null
        },
        {
          frequency: DEVICE_FREQUENCY,
        }
      )
    }
    setTimeout(resolve, DEVICE_FREQUENCY)
  }
)

export const stopCompass = defineAsyncApi<API_TYPE_STOP_COMPASS>(
  API_STOP_COMPASS,
  (_, { resolve }) => {
    if (listener) {
      plus.orientation.clearWatch(listener)
      listener = null
    }
    resolve()
  }
)
