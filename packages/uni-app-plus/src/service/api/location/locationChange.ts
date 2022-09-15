import {
  defineAsyncApi,
  defineOnApi,
  defineOffApi,
  API_START_LOCATION_UPDATE,
  API_TYPE_START_LOCATION_UPDATE,
  StartLocationUpdateProtocol,
  StartLocationUpdateOptions,
  API_ON_LOCATION_CHANGE,
  API_TYPE_ON_LOCATION_CHANGE,
  API_TYPE_STOP_LOCATION_UPDATE,
  API_STOP_LOCATION_UPDATE,
  API_TYPE_OFF_LOCATION_CHANGE,
  API_OFF_LOCATION_CHANGE,
  API_TYPE_OFF_LOCATION_CHANGE_ERROR,
  API_OFF_LOCATION_CHANGE_ERROR,
  API_TYPE_ON_LOCATION_CHANGE_ERROR,
  API_ON_LOCATION_CHANGE_ERROR,
} from '@dcloudio/uni-api'

let watchId: number = 0

/**
 * 开始更新定位
 */
export const startLocationUpdate = <API_TYPE_START_LOCATION_UPDATE>(
  defineAsyncApi(
    API_START_LOCATION_UPDATE,
    (_, { resolve, reject }) => {
      if (plus.geolocation && watchId === 0) {
        watchId = plus.geolocation.watchPosition(
          (res) => {
            UniServiceJSBridge.invokeOnCallback(
              API_ON_LOCATION_CHANGE,
              res.coords
            )
            resolve()
          },
          (error) => {
            reject(error.message)
          },
          {
            coordsType: _?.type,
          }
        )
      } else {
        UniServiceJSBridge.invokeOnCallback(
          API_ON_LOCATION_CHANGE_ERROR,
          'onLocationChange:fail'
        )
      }
      resolve()
    },
    StartLocationUpdateProtocol,
    StartLocationUpdateOptions
  )
)

export const onLocationChange = <API_TYPE_ON_LOCATION_CHANGE>(
  defineOnApi(API_ON_LOCATION_CHANGE, () => {})
)

export const stopLocationUpdate = <API_TYPE_STOP_LOCATION_UPDATE>(
  defineAsyncApi(API_STOP_LOCATION_UPDATE, (_, { resolve, reject }) => {
    if (watchId) {
      plus.geolocation.clearWatch(watchId)
      watchId = 0
      resolve()
    } else {
      reject('stopLocationUpdate:fail')
    }
  })
)

export const offLocationChange = <API_TYPE_OFF_LOCATION_CHANGE>(
  defineOffApi(API_OFF_LOCATION_CHANGE, () => {
    stopLocationUpdate()
  })
)

export const onLocationChangeError = <API_TYPE_ON_LOCATION_CHANGE_ERROR>(
  defineOnApi(API_ON_LOCATION_CHANGE_ERROR, () => {})
)

export const offLocationChangeError = <API_TYPE_OFF_LOCATION_CHANGE_ERROR>(
  defineOnApi(API_OFF_LOCATION_CHANGE_ERROR, () => {})
)
