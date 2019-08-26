import {
  wgs84togcj02,
  gcj02towgs84
} from '../util'

import {
  invoke
} from '../../bridge'

function getLocationSuccess (type, position, callbackId) {
  const coords = position.coords
  if (type !== position.coordsType) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `UNIAPP[location]:before[${position.coordsType}][lng:${
          coords.longitude
        },lat:${coords.latitude}]`
      )
    }
    let coordArray
    if (type === 'wgs84') {
      coordArray = gcj02towgs84(coords.longitude, coords.latitude)
    } else if (type === 'gcj02') {
      coordArray = wgs84togcj02(coords.longitude, coords.latitude)
    }
    if (coordArray) {
      coords.longitude = coordArray[0]
      coords.latitude = coordArray[1]
      if (process.env.NODE_ENV !== 'production') {
        console.log(
          `UNIAPP[location]:after[${type}][lng:${coords.longitude},lat:${
            coords.latitude
          }]`
        )
      }
    }
  }

  invoke(callbackId, {
    type,
    altitude: coords.altitude || 0,
    latitude: coords.latitude,
    longitude: coords.longitude,
    speed: coords.speed,
    accuracy: coords.accuracy,
    address: position.address,
    errMsg: 'getLocation:ok'
  })
}

export function getLocation ({
  type = 'wgs84',
  geocode = false,
  altitude = false
} = {}, callbackId) {
  plus.geolocation.getCurrentPosition(
    position => {
      getLocationSuccess(type, position, callbackId)
    },
    e => {
      // 坐标地址解析失败
      if (e.code === 1501) {
        getLocationSuccess(type, e, callbackId)
        return
      }

      invoke(callbackId, {
        errMsg: 'getLocation:fail ' + e.message
      })
    }, {
      geocode: geocode,
      enableHighAccuracy: altitude
    }
  )
}
