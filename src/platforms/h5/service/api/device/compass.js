let listener

const callbackIds = []

export function startCompass (options, callbackId) {
  const {
    invokeCallbackHandler: invoke
  } = UniServiceJSBridge
  if (!window.DeviceOrientationEvent) {
    return {
      errMsg: 'startCompass:fail'
    }
  }
  function addEventListener () {
    listener = function (event) {
      const direction = 360 - event.alpha
      callbackIds.forEach(callbackId => {
        invoke(callbackId, {
          direction: direction || 0
        })
      })
    }
    window.addEventListener('deviceorientation', listener, false)
  }
  if (!listener) {
    if (DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission().then((res) => {
        if (res === 'granted') {
          addEventListener()
          invoke(callbackId, {
            errMsg: 'startCompass:ok'
          })
        } else {
          invoke(callbackId, {
            errMsg: `startCompass:fail ${res}`
          })
        }
      }).catch(error => {
        invoke(callbackId, {
          errMsg: `startCompass:fail ${error}`
        })
      })
      return
    }
    addEventListener()
  }
  return {}
}

export function stopCompass () {
  if (listener) {
    window.removeEventListener('deviceorientation', listener, false)
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
