import {
  getJSONP
} from '../../../helpers/get-jsonp'
import {
  MapType,
  getMapInfo
} from '../../../helpers/location'

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
      navigator.geolocation.getCurrentPosition(res => resolve(res.coords), reject, {
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
              latitude: location.lat,
              longitude: location.lng
            }, true)
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
                latitude: data.location.lat,
                longitude: data.location.lng,
                accuracy: data.accuracy
              })
            } else {
              reject(new Error((data.error && data.error.message) || JSON.stringify(res)))
            }
          },
          fail () {
            reject(new Error('network error'))
          }
        })
      } else {
        reject(new Error('network error'))
      }
    })
  }).then((coords, skip) => {
    if (type.toUpperCase() === 'WGS84' || mapInfo.type !== MapType.QQ || skip) {
      return coords
    }
    return new Promise((resolve, reject) => {
      getJSONP(`https://apis.map.qq.com/jsapi?qt=translate&type=1&points=${coords.longitude},${coords.latitude}&key=${mapInfo.key}&output=jsonp&pf=jsapi&ref=jsapi`, {
        callback: 'cb'
      }, (res) => {
        if ('detail' in res && 'points' in res.detail && res.detail.points.length) {
          const location = res.detail.points[0]
          resolve(Object.assign({}, coords, {
            longitude: location.lng,
            latitude: location.lat
          }))
        } else {
          resolve(coords)
        }
      }, () => resolve(coords))
    })
  }).then(coords => {
    invoke(callbackId, Object.assign(coords, {
      errMsg: 'getLocation:ok',
      verticalAccuracy: coords.altitudeAccuracy || 0,
      // 无专门水平精度，使用位置精度替代
      horizontalAccuracy: coords.accuracy
    }))
  }).catch(error => {
    invoke(callbackId, {
      errMsg: 'getLocation:fail ' + error.message
    })
  })
}
