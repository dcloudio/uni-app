import {
  defineAsyncApi,
  API_ON_COMPASS,
  API_TYPE_ON_COMPASS_CHANGE,
  API_OFF_COMPASS,
  API_TYPE_OFF_COMPASS_CHANGE,
  API_START_COMPASS,
  API_TYPE_START_COMPASS,
  API_STOP_COMPASS,
  API_TYPE_STOP_COMPASS,
  defineOnApi,
  defineOffApi,
} from '@dcloudio/uni-api'

let listener: ((event: DeviceOrientationEvent) => void) | null = null

export const onCompassChange = <API_TYPE_ON_COMPASS_CHANGE>(
  defineOnApi(API_ON_COMPASS, () => {
    startCompass()
  })
)

export const offCompassChange = <API_TYPE_OFF_COMPASS_CHANGE>(
  defineOffApi(API_OFF_COMPASS, () => {
    stopCompass()
  })
)

export const startCompass = <API_TYPE_START_COMPASS>(
  defineAsyncApi(API_START_COMPASS, (_, { resolve, reject }) => {
    if (!window.DeviceOrientationEvent) {
      reject()
      return
    }
    function addEventListener() {
      listener = function (event) {
        const direction: number =
          360 - (event.alpha !== null ? event.alpha : 360)
        UniServiceJSBridge.invokeOnCallback(API_ON_COMPASS, {
          direction: direction,
        })
      }
      window.addEventListener('deviceorientation', listener, false)
    }
    if (!listener) {
      if ((DeviceOrientationEvent as any).requestPermission) {
        ;(DeviceOrientationEvent as any)
          .requestPermission()
          .then((res: string) => {
            if (res === 'granted') {
              addEventListener()
              resolve()
            } else {
              reject(`${res}`)
            }
          })
          .catch((error: any) => {
            reject(`${error}`)
          })
        return
      }
      addEventListener()
    }
    resolve()
  })
)

export const stopCompass = <API_TYPE_STOP_COMPASS>(
  defineAsyncApi(API_STOP_COMPASS, (_, { resolve }) => {
    if (listener) {
      window.removeEventListener('deviceorientation', listener, false)
      listener = null
    }
    resolve()
  })
)
