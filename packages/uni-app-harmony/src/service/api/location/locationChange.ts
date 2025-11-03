import {
  API_OFF_LOCATION_CHANGE,
  API_OFF_LOCATION_CHANGE_ERROR,
  API_ON_LOCATION_CHANGE,
  API_ON_LOCATION_CHANGE_ERROR,
  API_START_LOCATION_UPDATE,
  API_STOP_LOCATION_UPDATE,
  type API_TYPE_OFF_LOCATION_CHANGE,
  type API_TYPE_OFF_LOCATION_CHANGE_ERROR,
  type API_TYPE_ON_LOCATION_CHANGE,
  type API_TYPE_ON_LOCATION_CHANGE_ERROR,
  type API_TYPE_START_LOCATION_UPDATE,
  type API_TYPE_STOP_LOCATION_UPDATE,
  StartLocationUpdateOptions,
  StartLocationUpdateProtocol,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
} from '@dcloudio/uni-api'

let started = false
let watchId: number = 0

export const startLocationUpdate =
  defineAsyncApi<API_TYPE_START_LOCATION_UPDATE>(
    API_START_LOCATION_UPDATE,
    (options, { resolve, reject }) => {
      const watch = () => {
        const id = plus.geolocation.watchPosition(
          (res) => {
            started = true
            UniServiceJSBridge.invokeOnCallback(
              API_ON_LOCATION_CHANGE,
              res.coords
            )
          },
          (error) => {
            if (!started) {
              reject(error.message)
              started = true
            }
            UniServiceJSBridge.invokeOnCallback(API_ON_LOCATION_CHANGE_ERROR, {
              errMsg: `onLocationChange:fail ${error.message}`,
            })
          },
          {
            coordsType: options?.type,
            enableHighAccuracy: true,
          }
        )
        return id === -1 ? watchId : id
      }
      watchId = watchId || watch()
      setTimeout(resolve, 100)
    },
    StartLocationUpdateProtocol,
    StartLocationUpdateOptions
  )

export const startLocationUpdateBackground =
  defineAsyncApi<API_TYPE_START_LOCATION_UPDATE>(
    'startLocationUpdateBackground',
    (options, { resolve, reject }) => {
      const watch = () => {
        const id = plus.geolocation.watchPosition(
          (res) => {
            started = true
            UniServiceJSBridge.invokeOnCallback(
              API_ON_LOCATION_CHANGE,
              res.coords
            )
          },
          (error) => {
            if (!started) {
              reject(error.message)
              started = true
            }
            UniServiceJSBridge.invokeOnCallback(API_ON_LOCATION_CHANGE_ERROR, {
              errMsg: `onLocationChange:fail ${error.message}`,
            })
          },
          {
            coordsType: options?.type,
            enableHighAccuracy: true,
            // @ts-expect-error 增加background参数
            background: true,
          }
        )
        return id === -1 ? watchId : id
      }
      watchId = watchId || watch()
      setTimeout(resolve, 100)
    }
  )

export const stopLocationUpdate = defineAsyncApi<API_TYPE_STOP_LOCATION_UPDATE>(
  API_STOP_LOCATION_UPDATE,
  (_, { resolve }) => {
    if (watchId) {
      plus.geolocation.clearWatch(watchId)
      started = false
      watchId = 0
    }
    resolve()
  }
)

export const onLocationChange = defineOnApi<API_TYPE_ON_LOCATION_CHANGE>(
  API_ON_LOCATION_CHANGE,
  () => {}
)

export const offLocationChange = defineOffApi<API_TYPE_OFF_LOCATION_CHANGE>(
  API_OFF_LOCATION_CHANGE,
  () => {}
)

export const onLocationChangeError =
  defineOnApi<API_TYPE_ON_LOCATION_CHANGE_ERROR>(
    API_ON_LOCATION_CHANGE_ERROR,
    () => {}
  )

export const offLocationChangeError =
  defineOffApi<API_TYPE_OFF_LOCATION_CHANGE_ERROR>(
    API_OFF_LOCATION_CHANGE_ERROR,
    () => {}
  )
