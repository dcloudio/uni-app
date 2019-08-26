import {
  TEMP_PATH
} from '../constants'

import {
  publish
} from '../../bridge'

let recorder
let recordTimeout

const publishRecorderStateChange = (state, res = {}) => {
  publish('onRecorderStateChange', Object.assign({
    state
  }, res))
}

const Recorder = {
  start ({
    duration = 60000,
    sampleRate,
    numberOfChannels,
    encodeBitRate,
    format = 'mp3',
    frameSize,
    audioSource = 'auto'
  }, callbackId) {
    if (recorder) {
      return publishRecorderStateChange('start')
    }
    recorder = plus.audio.getRecorder()
    recorder.record({
      format,
      samplerate: sampleRate,
      filename: TEMP_PATH + '/recorder/'
    }, res => publishRecorderStateChange('stop', {
      tempFilePath: res
    }), err => publishRecorderStateChange('error', {
      errMsg: err.message
    }))
    recordTimeout = setTimeout(() => {
      Recorder.stop()
    }, duration)
    publishRecorderStateChange('start')
  },
  stop () {
    if (recorder) {
      recorder.stop()
      recorder = false
      recordTimeout && clearTimeout(recordTimeout)
    }
  },
  pause () {
    if (recorder) {
      publishRecorderStateChange('error', {
        errMsg: '暂不支持录音pause操作'
      })
    }
  },
  resume () {
    if (recorder) {
      publishRecorderStateChange('error', {
        errMsg: '暂不支持录音resume操作'
      })
    }
  }
}

export function operateRecorder ({
  operationType,
  ...args
}, callbackId) {
  Recorder[operationType](args)
  return {
    errMsg: 'operateRecorder:ok'
  }
}
