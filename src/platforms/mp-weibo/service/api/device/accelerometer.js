let listener

const callbackIds = []

export function startAccelerometer (options, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  if (!window.DeviceMotionEvent) {
    return {
      errMsg: 'startAccelerometer:fail'
    }
  }
  function addEventListener () {
    listener = function (event) {
      const acceleration = event.acceleration || event.accelerationIncludingGravity
      callbackIds.forEach(callbackId => {
        invoke(callbackId, {
          x: acceleration.x || 0,
          y: acceleration.y || 0,
          z: acceleration.z || 0
        })
      })
    }
    window.addEventListener('devicemotion', listener, false)
  }
  if (!listener) {
    if (DeviceMotionEvent.requestPermission) {
      DeviceMotionEvent.requestPermission().then((res) => {
        if (res === 'granted') {
          addEventListener()
          invoke(callbackId, {
            errMsg: 'startAccelerometer:ok'
          })
        } else {
          invoke(callbackId, {
            errMsg: `startAccelerometer:fail ${res}`
          })
        }
      }).catch(error => {
        invoke(callbackId, {
          errMsg: `startAccelerometer:fail ${error}`
        })
      })
      return
    }
    addEventListener()
  }
  return {}
}

export function stopAccelerometer () {
  if (listener) {
    window.removeEventListener('devicemotion', listener, false)
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
