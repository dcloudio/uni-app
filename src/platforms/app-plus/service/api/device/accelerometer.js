import {
  DEVICE_FREQUENCY
} from '../constants'

import {
  getLastWebview
} from '../util'

import {
  publish
} from '../../bridge'

let watchAccelerationId = false
let isWatchAcceleration = false

const clearWatchAcceleration = () => {
  if (watchAccelerationId) {
    plus.accelerometer.clearWatch(watchAccelerationId)
    watchAccelerationId = false
  }
}

export function enableAccelerometer ({
  enable
}) {
  if (enable) { // 启用监听
    clearWatchAcceleration()
    watchAccelerationId = plus.accelerometer.watchAcceleration((res) => {
      publish('onAccelerometerChange', {
        x: res.xAxis,
        y: res.yAxis,
        z: res.zAxis,
        errMsg: 'enableAccelerometer:ok'
      })
    }, (e) => {
      publish('onAccelerometerChange', {
        errMsg: 'enableAccelerometer:fail'
      })
    }, {
      frequency: DEVICE_FREQUENCY
    })
    if (!isWatchAcceleration) {
      isWatchAcceleration = true
      const webview = getLastWebview()
      if (webview) {
        webview.addEventListener('close', clearWatchAcceleration)
      }
    }
  } else {
    clearWatchAcceleration()
  }
  return {
    errMsg: 'enableAccelerometer:ok'
  }
}
