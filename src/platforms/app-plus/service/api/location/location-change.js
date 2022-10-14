import { invoke } from '../../bridge'
const callbackIds = []
const callbackOnErrorIds = []
const callbackOffErrorIds = []
let watchId

/**
 * 开始更新定位
 */
export function startLocationUpdate ({ type = 'wgs84' }) {
  watchId = plus.geolocation.watchPosition(
    res => {
      callbackIds.forEach(callbackId => {
        invoke(callbackId, res.coords)
      })
    },
    error => {
      callbackOnErrorIds.forEach(callbackId => {
        invoke(callbackId, {
          errMsg: 'onLocationChange:fail' + error.message
        })
      })
    },
    {
      coordsType: type
    }
  )
}

/**
 * 暂停更新定位
 * @param {*} callbackId
 */
export function stopLocationUpdate (callbackId) {
  if (watchId) {
    plus.geolocation.clearWatch(watchId)
  } else {
    invoke(callbackId, { errMsg: 'stopLocationUpdate:fail' })
  }
  return {}
}

/**
 * 监听更新定位
 * @param {*} callbackId
 */
export function onLocationChange (callbackId) {
  callbackIds.push(callbackId)
}

/**
 * 监听更新定位失败
 * @param {*} callbackId
 */
export function onLocationChangeError (callbackId) {
  callbackOnErrorIds.push(callbackId)
}

// 移除实时地理位置变化事件的监听函数
export function offLocationChange (callbackId) {
  if (callbackId) {
    const index = callbackIds.indexOf(callbackId)
    if (index >= 0) {
      callbackIds.splice(index, 1)
    } else {
      callbackOffErrorIds.forEach(callbackId => {
        invoke(callbackId, {
          errMsg: 'offLocationChange:fail'
        })
      })
    }
  } else {
    callbackIds.length = 0
  }
}

// 移除实时地理位置变化事件的监听函数
export function offLocationChangeError (callbackId) {
  callbackOffErrorIds.push(callbackId)
}
