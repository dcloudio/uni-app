import {
  defineAsyncApi,
  API_GET_LOCATION,
  API_TYPE_GET_LOCATION,
  GetLocationProtocol,
  GetLocationOptions,
} from '@dcloudio/uni-api'
import {
  MapType,
  getMapInfo,
  TranslateCoordinateSystemOptions,
  translateCoordinateSystem,
} from '../../../helpers/location'
import { getJSONP } from '../../../helpers/getJSONP'
import { request } from '../network/request'
import { loadMaps } from '../../../view/components/map/maps'

export const getLocation = defineAsyncApi<API_TYPE_GET_LOCATION>(
  API_GET_LOCATION,
  (
    { type, altitude, highAccuracyExpireTime, isHighAccuracy },
    { resolve, reject }
  ) => {
    const mapInfo = getMapInfo()

    new Promise((resolve: TranslateCoordinateSystemOptions, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (res) => resolve({ coords: res.coords }),
          reject,
          {
            enableHighAccuracy: isHighAccuracy || altitude,
            timeout: highAccuracyExpireTime || 1000 * 100,
          }
        )
      } else {
        reject(new Error('device nonsupport geolocation'))
      }
    })
      .catch((error) => {
        return new Promise(
          (resolve: TranslateCoordinateSystemOptions, reject) => {
            if (mapInfo.type === MapType.QQ) {
              getJSONP(
                `https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${mapInfo.key}`,
                {
                  callback: 'callback',
                },
                (res: any) => {
                  if ('result' in res && res.result.location) {
                    const location = res.result.location
                    resolve({
                      coords: {
                        latitude: location.lat,
                        longitude: location.lng,
                      } as GeolocationCoordinates,
                      skip: true,
                    })
                  } else {
                    reject(new Error(res.message || JSON.stringify(res)))
                  }
                },
                () => reject(new Error('network error'))
              )
            } else if (mapInfo.type === MapType.GOOGLE) {
              request({
                method: 'POST',
                url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${mapInfo.key}`,
                success(res) {
                  const data: AnyObject = res.data as AnyObject
                  if ('location' in data) {
                    resolve({
                      coords: {
                        latitude: data.location.lat,
                        longitude: data.location.lng,
                        accuracy: data.accuracy,
                      } as GeolocationCoordinates,
                      skip: true,
                    })
                  } else {
                    reject(
                      new Error(
                        (data.error && data.error.message) ||
                          JSON.stringify(res)
                      )
                    )
                  }
                },
                fail() {
                  reject(new Error('network error'))
                },
              })
            } else if (mapInfo.type === MapType.AMAP) {
              loadMaps([], () => {
                window.AMap.plugin('AMap.Geolocation', () => {
                  const geolocation = new (window.AMap as any).Geolocation({
                    enableHighAccuracy: true,
                    timeout: 10000,
                  })

                  geolocation.getCurrentPosition(
                    (status: string, data: any) => {
                      if (status === 'complete') {
                        resolve({
                          coords: {
                            latitude: data.position.lat,
                            longitude: data.position.lng,
                            accuracy: data.accuracy,
                          } as GeolocationCoordinates,
                          skip: true,
                        })
                      } else {
                        reject(new Error(data.message))
                      }
                    }
                  )
                })
              })
            } else {
              reject(error)
            }
          }
        )
      })
      .then(({ coords, skip }) => {
        translateCoordinateSystem(type, coords, skip)
          .then((coords: GeolocationCoordinates | any) => {
            resolve({
              latitude: coords.latitude,
              longitude: coords.longitude,
              accuracy: coords.accuracy,
              speed: coords.altitude || 0,
              altitude: coords.altitude || 0,
              verticalAccuracy: coords.altitudeAccuracy || 0,
              // 无专门水平精度，使用位置精度替代
              horizontalAccuracy: coords.accuracy || 0,
            })
          })
          .catch((error) => {
            reject(error.message)
          })
      })
      .catch((error) => {
        reject(error.message || JSON.stringify(error))
      })
  },
  GetLocationProtocol,
  GetLocationOptions
)
