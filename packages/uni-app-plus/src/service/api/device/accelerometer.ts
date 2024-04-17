import {
  API_OFF_ACCELEROMETER,
  API_ON_ACCELEROMETER,
  API_START_ACCELEROMETER,
  API_STOP_ACCELEROMETER,
  type API_TYPE_OFF_ACCELEROMETER_CHANGE,
  type API_TYPE_ON_ACCELEROMETER_CHANGE,
  type API_TYPE_START_ACCELEROMETER,
  type API_TYPE_STOP_ACCELEROMETER,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
} from '@dcloudio/uni-api'
import { DEVICE_FREQUENCY } from '../constants'

let listener: number | null = null

export const onAccelerometerChange =
  defineOnApi<API_TYPE_ON_ACCELEROMETER_CHANGE>(API_ON_ACCELEROMETER, () => {
    startAccelerometer()
  })

export const offAccelerometerChange =
  defineOffApi<API_TYPE_OFF_ACCELEROMETER_CHANGE>(API_OFF_ACCELEROMETER, () => {
    stopAccelerometer()
  })

export const startAccelerometer = defineAsyncApi<API_TYPE_START_ACCELEROMETER>(
  API_START_ACCELEROMETER,
  (_, { resolve, reject }) => {
    if (!listener) {
      listener = plus.accelerometer.watchAcceleration(
        (res) => {
          UniServiceJSBridge.invokeOnCallback(API_ON_ACCELEROMETER, {
            x: (res && res.xAxis) || 0,
            y: (res && res.yAxis) || 0,
            z: (res && res.zAxis) || 0,
          })
        },
        (err) => {
          listener = null
          reject(`startAccelerometer:fail ${err.message}`)
        },
        {
          frequency: DEVICE_FREQUENCY,
        }
      )
    }

    setTimeout(resolve, DEVICE_FREQUENCY)
  }
)

export const stopAccelerometer = defineAsyncApi<API_TYPE_STOP_ACCELEROMETER>(
  API_STOP_ACCELEROMETER,
  (_, { resolve }) => {
    if (listener) {
      plus.accelerometer.clearWatch(listener)
      listener = null
    }
    resolve()
  }
)
