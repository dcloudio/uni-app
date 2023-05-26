import { translateCoordinateSystem } from '../../../helpers/location'

const { invokeCallbackHandler: invoke } = UniServiceJSBridge
let successCallbackIds = []
let errorCallbackIds = []
let started = false
let watchId = 0

export function startLocationUpdate ({ type = 'gcj02' }, callbackId) {
  if (!navigator.geolocation) {
    return {
      errMsg: 'startLocationUpdate:fail'
    }
  }

  watchId = watchId || navigator.geolocation.watchPosition(
    res => {
      started = true
      translateCoordinateSystem(type, res.coords)
        .then((coords) => {
          successCallbackIds.forEach(callbackId => {
            invoke(callbackId, coords)
          })
        }).catch(error => {
          errorCallbackIds.forEach(callbackId => {
            invoke(callbackId, {
              errMsg: `onLocationChange:fail ${error.message}`
            })
          })
        })
    },
    error => {
      if (!started) {
        invoke(callbackId, { errMsg: `startLocationUpdate:fail ${error.message}` })
        started = true
      }
      errorCallbackIds.forEach(callbackId => {
        invoke(callbackId, {
          errMsg: `onLocationChange:fail ${error.message}`
        })
      })
    }
  )
  setTimeout(() => {
    invoke(callbackId, {
      errMsg: 'startLocationUpdate:ok'
    })
  }, 100)
}

export function stopLocationUpdate () {
  if (watchId !== 0) {
    navigator.geolocation.clearWatch(watchId)
    started = false
    watchId = 0
  }
  return {}
}

export function onLocationChange (callbackId) {
  successCallbackIds.push(callbackId)
}

export function offLocationChange (callbackId) {
  if (callbackId) {
    const index = successCallbackIds.indexOf(callbackId)
    if (index >= 0) {
      successCallbackIds.splice(index, 1)
    }
  } else {
    successCallbackIds = []
  }
}

export function onLocationChangeError (callbackId) {
  errorCallbackIds.push(callbackId)
}

export function offLocationChangeError (callbackId) {
  if (callbackId) {
    const index = errorCallbackIds.indexOf(callbackId)
    if (index >= 0) {
      errorCallbackIds.splice(index, 1)
    }
  } else {
    errorCallbackIds = []
  }
}
