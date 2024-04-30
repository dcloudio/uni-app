import { extend, isFunction } from '@vue/shared'
import {
  API_GET_RECORDER_MANAGER,
  type API_TYPE_GET_RECORDER_MANAGER,
  defineSyncApi,
} from '@dcloudio/uni-api'
import { TEMP_PATH } from '../constants'

interface Recorder {
  start: (args: UniApp.RecorderManagerStartOptions) => void
  stop: Function
  pause: Function
  resume: Function
}

let recorder: PlusAudioAudioRecorder
let recording: boolean = false
let recordTimeout: ReturnType<typeof setTimeout>

const publishRecorderStateChange = (state: string, res = {}) => {
  onRecorderStateChange(
    extend(
      {
        state,
      },
      res
    )
  )
}

const Recorder: Recorder = {
  start({
    duration = 60000,
    sampleRate,
    numberOfChannels,
    encodeBitRate,
    format = 'mp3',
    frameSize,
    // audioSource = 'auto',
  } = {}) {
    if (recording) {
      return publishRecorderStateChange('start')
    }
    recorder = plus.audio.getRecorder()
    recorder.record(
      {
        format,
        samplerate: sampleRate ? String(sampleRate) : undefined,
        filename: TEMP_PATH + '/recorder/',
      },
      (res) =>
        publishRecorderStateChange('stop', {
          tempFilePath: res,
        }),
      (err) =>
        publishRecorderStateChange('error', {
          errMsg: err.message,
        })
    )
    recordTimeout = setTimeout(() => {
      Recorder.stop()
    }, duration)
    publishRecorderStateChange('start')
    recording = true
  },
  stop() {
    if (recording) {
      recorder.stop()
      recording = false
      recordTimeout && clearTimeout(recordTimeout)
    }
  },
  pause() {
    if (recording) {
      publishRecorderStateChange('error', {
        errMsg: 'Unsupported operation: pause',
      })
    }
  },
  resume() {
    if (recording) {
      publishRecorderStateChange('error', {
        errMsg: 'Unsupported operation: resume',
      })
    }
  },
}

const callbacks: Record<string, null | Function> = {
  pause: null,
  resume: null,
  start: null,
  stop: null,
  error: null,
}

function onRecorderStateChange(res: { state?: string; errMsg?: string }) {
  const state = res.state
  delete res.state
  delete res.errMsg
  if (state && isFunction(callbacks[state])) {
    callbacks[state]!(res)
  }
}

class RecorderManager implements UniApp.RecorderManager {
  constructor() {}

  onError(callback: Function) {
    callbacks.error = callback
  }

  onFrameRecorded(callback: Function) {}

  onInterruptionBegin(callback: Function) {}

  onInterruptionEnd(callback: Function) {}

  onPause(callback: Function) {
    callbacks.pause = callback
  }

  onResume(callback: Function) {
    callbacks.resume = callback
  }

  onStart(callback: Function) {
    callbacks.start = callback
  }

  onStop(callback: Function) {
    callbacks.stop = callback
  }

  pause() {
    Recorder.pause()
  }

  resume() {
    Recorder.resume()
  }

  start(options: UniApp.RecorderManagerStartOptions = {}) {
    Recorder.start(options)
  }

  stop() {
    Recorder.stop()
  }
}

let recorderManager: RecorderManager

export const getRecorderManager = defineSyncApi<API_TYPE_GET_RECORDER_MANAGER>(
  API_GET_RECORDER_MANAGER,
  () => recorderManager || (recorderManager = new RecorderManager())
)
