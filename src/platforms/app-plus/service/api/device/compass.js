import {
  DEVICE_FREQUENCY
} from '../constants'

import {
  getLastWebview
} from '../util'

import {
  publish
} from '../../bridge'

let watchOrientationId = false
let isWatchOrientation = false

const clearWatchOrientation = () => {
  if (watchOrientationId) {
    plus.orientation.clearWatch(watchOrientationId)
    watchOrientationId = false
  }
}

export function enableCompass ({
  enable
}) {
  if (enable) {
    clearWatchOrientation()
    watchOrientationId = plus.orientation.watchOrientation((o) => {
      publish('onCompassChange', {
        direction: o.magneticHeading,
        errMsg: 'enableCompass:ok'
      })
    }, (e) => {
      publish('onCompassChange', {
        errMsg: 'enableCompass:fail'
      })
    }, {
      frequency: DEVICE_FREQUENCY
    })
    if (!isWatchOrientation) {
      isWatchOrientation = true
      const webview = getLastWebview()
      if (webview) {
        webview.addEventListener('close', () => {
          plus.orientation.clearWatch(watchOrientationId)
        })
      }
    }
  } else {
    clearWatchOrientation()
  }
  return {
    errMsg: 'enableCompass:ok'
  }
}
