import {
  getJSONP
} from '../../../helpers/get-jsonp'
import {
  MapType,
  getMapInfo,
  translateCoordinateSystem
} from '../../../helpers/location'
import { loadMaps } from '../../../view/components/map/maps'

/**
 * 获取定位信息
 * @param {*} options
 * @param {*} callbackId
 */
export function getLocation ({
  type,
  altitude,
  isHighAccuracy,
  highAccuracyExpireTime
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  const mapInfo = getMapInfo()

  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => resolve({ coords: res.coords }), reject, {
        enableHighAccuracy: isHighAccuracy || altitude,
        timeout: highAccuracyExpireTime || 1000 * 100
      })
    } else {
      reject(new Error('device nonsupport geolocation'))
    }
  }).catch(() => {
    return new Promise((resolve, reject) => {
      if (mapInfo.type === MapType.QQ) {
        getJSONP(`https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${mapInfo.key}`, {
          callback: 'callback'
        }, (res) => {
          if ('result' in res && res.result.location) {
            const location = res.result.location
            resolve({
              coords: {
                latitude: location.lat,
                longitude: location.lng
              },
              skip: true
            })
          } else {
            reject(new Error(res.message || JSON.stringify(res)))
          }
        }, () => reject(new Error('network error')))
      } else if (mapInfo.type === MapType.GOOGLE) {
        uni.request({
          method: 'POST',
          url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${mapInfo.key}`,
          success (res) {
            const data = res.data
            if ('location' in data) {
              resolve({
                coords: {
                  latitude: data.location.lat,
                  longitude: data.location.lng,
                  accuracy: data.accuracy
                },
                skip: true
              })
            } else {
              reject(new Error((data.error && data.error.message) || JSON.stringify(res)))
            }
          },
          fail () {
            reject(new Error('network error'))
          }
        })
      } else if (mapInfo.type === MapType.AMAP) {
        loadMaps([], () => {
          window.AMap.plugin('AMap.Geolocation', () => {
            const geolocation = new window.AMap.Geolocation({
              enableHighAccuracy: true,
              timeout: 10000
            })

            geolocation.getCurrentPosition((status, data) => {
              if (status === 'complete') {
                resolve({
                  coords: {
                    latitude: data.position.lat,
                    longitude: data.position.lng,
                    accuracy: data.accuracy
                  },
                  skip: true
                })
              } else {
                reject(new Error(data.message))
              }
            })
          })
        })
      } else {
        reject(new Error('network error'))
      }
    })
  }).then(({ coords, skip }) => {
    translateCoordinateSystem(type, coords, skip)
      .then(coords => {
        invoke(
          callbackId,
          Object.assign(coords, {
            errMsg: 'getLocation:ok',
            verticalAccuracy: coords.altitudeAccuracy || 0,
            // 无专门水平精度，使用位置精度替代
            horizontalAccuracy: coords.accuracy
          })
        )
      })
      .catch(error => {
        invoke(callbackId, {
          errMsg: 'getLocation:fail ' + error.message
        })
      })
  }).catch((error) => {
    invoke(callbackId, {
      errMsg: 'getLocation:fail ' + error.message || JSON.stringify(error)
    })
  })
}
