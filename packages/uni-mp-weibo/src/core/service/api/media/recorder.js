import {
  onMethod,
  invokeMethod
} from '../../platform'

const callbacks = {
  pause: null,
  resume: null,
  start: null,
  stop: null,
  error: null
}

class RecorderManager {
  constructor () {
    onMethod('onRecorderStateChange', res => {
      const state = res.state
      delete res.state
      delete res.errMsg
      if (typeof callbacks[state] === 'function') {
        callbacks[state](res)
      }
    })
  }

  onError (callback) {
    callbacks.error = callback
  }

  onFrameRecorded (callback) {

  }

  onInterruptionBegin (callback) {

  }

  onInterruptionEnd (callback) {

  }

  onPause (callback) {
    callbacks.pause = callback
  }

  onResume (callback) {
    callbacks.resume = callback
  }

  onStart (callback) {
    callbacks.start = callback
  }

  onStop (callback) {
    callbacks.stop = callback
  }

  pause () {
    invokeMethod('operateRecorder', {
      operationType: 'pause'
    })
  }

  resume () {
    invokeMethod('operateRecorder', {
      operationType: 'resume'
    })
  }

  start (options) {
    invokeMethod('operateRecorder', Object.assign({}, options, {
      operationType: 'start'
    }))
  }

  stop () {
    invokeMethod('operateRecorder', {
      operationType: 'stop'
    })
  }
}

let recorderManager

export function getRecorderManager () {
  return recorderManager || (recorderManager = new RecorderManager())
}
