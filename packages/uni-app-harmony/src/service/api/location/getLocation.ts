import {
  API_GET_LOCATION,
  type API_TYPE_GET_LOCATION,
  GetLocationOptions,
  GetLocationProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { registerServiceMethod } from '@dcloudio/uni-core'

function getLocationSuccess(
  type: string,
  position: any,
  resolve: (res: any) => void
) {
  const coords = position.coords
  resolve({
    type,
    altitude: coords.altitude || 0,
    latitude: coords.latitude,
    longitude: coords.longitude,
    speed: coords.speed,
    accuracy: coords.accuracy,
    address: position.address,
    errMsg: 'getLocation:ok',
  })
}

export const getLocation = defineAsyncApi<API_TYPE_GET_LOCATION>(
  API_GET_LOCATION,
  (
    {
      type = 'wgs84',
      geocode = false,
      altitude = false,
      highAccuracyExpireTime,
      isHighAccuracy = false,
    },
    { resolve, reject }
  ) => {
    plus.geolocation.getCurrentPosition(
      (position) => {
        getLocationSuccess(type, position, resolve)
      },
      (e) => {
        // 坐标地址解析失败
        if (e.code === 1501) {
          getLocationSuccess(type, e, resolve)
          return
        }
        reject('getLocation:fail ' + e.message)
      },
      {
        geocode: geocode,
        enableHighAccuracy: isHighAccuracy || altitude,
        timeout: highAccuracyExpireTime,
        coordsType: type,
      }
    )
  },
  GetLocationProtocol,
  GetLocationOptions
)

interface IGetLocationOptions {
  type?: 'wgs84' | 'gcj02'
  altitude?: boolean
  highAccuracyExpireTime?: number
  isHighAccuracy?: boolean
}

export function subscribeGetLocation() {
  registerServiceMethod(
    API_GET_LOCATION,
    (args: IGetLocationOptions, resolve) => {
      getLocation({
        type: args.type,
        altitude: args.altitude,
        highAccuracyExpireTime: args.highAccuracyExpireTime,
        isHighAccuracy: args.isHighAccuracy,
        success(res) {
          resolve({
            latitude: res.latitude,
            longitude: res.longitude,
            speed: res.speed,
            accuracy: res.accuracy,
            altitude: res.altitude,
            verticalAccuracy: res.verticalAccuracy,
            horizontalAccuracy: res.horizontalAccuracy,
          })
        },
        fail(err) {
          resolve({
            errMsg: err.errMsg || 'getLocation:fail',
          })
        },
      })
    }
  )
}
