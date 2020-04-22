import {
  getRealPath
} from '../util'

import {
  publish
} from '../../bridge'

const audios = {}

const evts = ['play', 'canplay', 'ended', 'stop', 'waiting', 'seeking', 'seeked', 'pause']

const publishAudioStateChange = (state, res = {}) => publish('onAudioStateChange', Object.assign({
  state
}, res))

const initStateChage = audioId => {
  const audio = audios[audioId]
  if (!audio) {
    return
  }
  if (!audio.initStateChage) {
    audio.initStateChage = true

    audio.addEventListener('error', error => {
      publishAudioStateChange('error', {
        audioId,
        errMsg: 'MediaError',
        errCode: error.code
      })
    })

    evts.forEach(event => {
      audio.addEventListener(event, () => {
        // 添加 isStopped 属性是为了解决 安卓设备停止播放后获取播放进度不正确的问题
        if (event === 'play') {
          audio.isStopped = false
        } else if (event === 'stop') {
          audio.isStopped = true
        }
        publishAudioStateChange(event, {
          audioId
        })
      })
    })
  }
}

export function createAudioInstance () {
  const audioId = `${Date.now()}${Math.random()}`
  const audio = audios[audioId] = plus.audio.createPlayer('')
  audio.src = ''
  audio.volume = 1
  audio.startTime = 0
  return {
    errMsg: 'createAudioInstance:ok',
    audioId
  }
}

export function destroyAudioInstance ({
  audioId
}) {
  if (audios[audioId]) {
    audios[audioId].close()
    delete audios[audioId]
  }
  return {
    errMsg: 'destroyAudioInstance:ok',
    audioId
  }
}

export function setAudioState ({
  audioId,
  src,
  startTime,
  autoplay = false,
  loop = false,
  obeyMuteSwitch,
  volume
}) {
  const audio = audios[audioId]
  if (audio) {
    const style = {
      loop,
      autoplay
    }
    if (src) {
      audio.src = style.src = getRealPath(src)
    }
    if (startTime) {
      audio.startTime = style.startTime = startTime
    }
    if (typeof volume === 'number') {
      audio.volume = style.volume = volume
    }
    audio.setStyles(style)
    initStateChage(audioId)
  }
  return {
    errMsg: 'setAudioState:ok'
  }
}

export function getAudioState ({
  audioId
}) {
  const audio = audios[audioId]
  if (!audio) {
    return {
      errMsg: 'getAudioState:fail'
    }
  }
  const {
    src,
    startTime,
    volume
  } = audio

  return {
    errMsg: 'getAudioState:ok',
    duration: 1e3 * (audio.getDuration() || 0),
    currentTime: audio.isStopped ? 0 : 1e3 * audio.getPosition(),
    paused: audio.isPaused(),
    src,
    volume,
    startTime: 1e3 * startTime,
    buffered: 1e3 * audio.getBuffered()
  }
}

export function operateAudio ({
  operationType,
  audioId,
  currentTime
}) {
  const audio = audios[audioId]
  const operationTypes = ['play', 'pause', 'stop']
  if (operationTypes.indexOf(operationType) >= 0) {
    audio[operationType === operationTypes[0] && audio.isPaused() ? 'resume' : operationType]()
  } else if (operationType === 'seek') {
    audio.seekTo(currentTime / 1e3)
  }
  return {
    errMsg: 'operateAudio:ok'
  }
}
