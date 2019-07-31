import {
  onMethod,
  invokeMethod
} from '../../platform'

const callbacks = {
  pause: [],
  resume: [],
  start: [],
  stop: []
}

class RecorderManager {
  constructor () {
    onMethod('onRecorderStateChange', res => {
      const state = res.state
      delete res.state
      delete res.errMsg
      callbacks[state].forEach(callback => {
        if (typeof callback === 'function') {
          callback(res)
        }
      })
    })
  }
  onError (callback) {
    callbacks.error.push(callback)
  }
  onFrameRecorded (callback) {

  }
  onInterruptionBegin (callback) {

  }
  onInterruptionEnd (callback) {

  }
  onPause (callback) {
    callbacks.pause.push(callback)
  }
  onResume (callback) {
    callbacks.resume.push(callback)
  }
  onStart (callback) {
    callbacks.start.push(callback)
  }
  onStop (callback) {
    callbacks.stop.push(callback)
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
