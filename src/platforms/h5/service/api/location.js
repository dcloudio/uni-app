import { getJSONP } from '../../helpers/get-jsonp'
/**
 * wgs84坐标转Gcj02坐标
 * @param {object} coords
 * @param {Function} success
 * @param {Function} error
 */
function wgs84ToGcj02 (coords, success, error) {
  /**
   * uniapp 内置key
   */
  var key = 'WXTBZ-6WERU-ECCVS-BZJCK-LW5OJ-SIBOS'
  var url = `https://apis.map.qq.com/ws/coord/v1/translate?locations=${coords.latitude},${coords.longitude}&type=1&key=${key}&output=jsonp`
  getJSONP(url, {}, (res) => {
    if ('locations' in res && res.locations.length) {
      success({
        longitude: res.locations[0].lng,
        latitude: res.locations[0].lat
      })
    } else {
      error()
    }
  }, error)
}
/**
 * 获取定位信息
 * @param {*} param0
 * @param {*} callbackId
 */
export function getLocation ({
  type,
  altitude
}, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  function callback (coords) {
    invoke(callbackId, Object.assign(coords, {
      errMsg: 'getLocation:ok',
      verticalAccuracy: coords.altitudeAccuracy || 0,
      // 无专门水平精度，使用位置精度替代
      horizontalAccuracy: coords.accuracy
    }))
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var coords = position.coords
      if (type === 'WGS84') {
        callback(coords)
      } else {
        wgs84ToGcj02(coords, callback, () => {
          invoke(callbackId, {
            errMsg: 'getLocation:fail'
          })
        })
      }
    }, () => {
      invoke(callbackId, {
        errMsg: 'getLocation:fail'
      })
    }, {
      enableHighAccuracy: altitude,
      timeout: 1000 * 60 * 5
    })
  } else {
    invoke(callbackId, {
      errMsg: 'getLocation:fail device nonsupport geolocation'
    })
  }
}
