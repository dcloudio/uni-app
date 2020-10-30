import {
  DEVICE_FREQUENCY
} from '../constants'

import {
  invoke
} from '../../bridge'

let listener

const callbackIds = []

export function startCompass (options, callbackId) {
  listener = listener || plus.orientation.watchOrientation((res) => {
    callbackIds.forEach(callbackId => {
      invoke(callbackId, {
        direction: res.magneticHeading
      })
    })
  }, err => {
    listener = null
    invoke(callbackId, {
      errMsg: `startCompass:fail ${err.message}`
    })
  }, {
    frequency: DEVICE_FREQUENCY
  })
  setTimeout(() => {
    invoke(callbackId, {
      errMsg: 'startCompass:ok'
    })
  }, DEVICE_FREQUENCY)
}

export function stopCompass () {
  if (listener) {
    plus.orientation.clearWatch(listener)
    listener = null
  }
  return {}
}

export function onCompassChange (callbackId) {
  if (!callbackIds.length) {
    startCompass()
  }
  callbackIds.push(callbackId)
}

export function offCompassChange (callbackId) {
  // 暂不支持移除所有监听
  if (callbackId) {
    const index = callbackIds.indexOf(callbackId)
    if (index >= 0) {
      callbackIds.splice(index, 1)
    }
  }
  if (!callbackIds.length) {
    stopCompass()
  }
}
