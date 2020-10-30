import {
  getJSONP
} from '../../../helpers/get-jsonp'

/**
 * 获取定位信息
 * @param {*} options
 * @param {*} callbackId
 */
export function getLocation ({
  type,
  altitude
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  const key = __uniConfig.qqMapKey

  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => resolve(res.coords), reject, {
        enableHighAccuracy: altitude,
        timeout: 1000 * 60 * 5
      })
    } else {
      reject(new Error('device nonsupport geolocation'))
    }
  }).catch(() => {
    return new Promise((resolve, reject) => {
      getJSONP(`https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${key}`, {
        callback: 'callback'
      }, (res) => {
        if ('result' in res && res.result.location) {
          const location = res.result.location
          resolve({
            latitude: location.lat,
            longitude: location.lng
          })
        } else {
          reject(new Error(JSON.stringify(res)))
        }
      }, () => reject(new Error('network error')))
    })
  }).then(coords => {
    if (type.toUpperCase() === 'WGS84') {
      return coords
    }
    return new Promise((resolve, reject) => {
      getJSONP(`https://apis.map.qq.com/ws/coord/v1/translate?locations=${coords.latitude},${coords.longitude}&type=1&key=${key}&output=jsonp`, {}, (res) => {
        if ('locations' in res && res.locations.length) {
          const location = res.locations[0]
          resolve(Object.assign({}, coords, {
            longitude: location.lng,
            latitude: location.lat
          }))
        } else {
          reject(new Error(JSON.stringify(res)))
        }
      }, () => reject(new Error('network error')))
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
