import {
  DEVICE_FREQUENCY
} from '../constants'

import {
  invoke
} from '../../bridge'

let listener

const callbackIds = []

export function startAccelerometer (options, callbackId) {
  listener = listener || plus.accelerometer.watchAcceleration((res) => {
    callbackIds.forEach(callbackId => {
      invoke(callbackId, {
        x: res.xAxis,
        y: res.yAxis,
        z: res.zAxis
      })
    })
  }, err => {
    listener = null
    invoke(callbackId, {
      errMsg: `startAccelerometer:fail ${err.message}`
    })
  }, {
    frequency: DEVICE_FREQUENCY
  })
  setTimeout(() => {
    invoke(callbackId, {
      errMsg: 'startAccelerometer:ok'
    })
  }, DEVICE_FREQUENCY)
}

export function stopAccelerometer () {
  if (listener) {
    plus.accelerometer.clearWatch(listener)
    listener = null
  }
  return {}
}

export function onAccelerometerChange (callbackId) {
  if (!callbackIds.length) {
    startAccelerometer()
  }
  callbackIds.push(callbackId)
}

export function offAccelerometerChange (callbackId) {
  // 暂不支持移除所有监听
  if (callbackId) {
    const index = callbackIds.indexOf(callbackId)
    if (index >= 0) {
      callbackIds.splice(index, 1)
    }
  }
  if (!callbackIds.length) {
    stopAccelerometer()
  }
}
