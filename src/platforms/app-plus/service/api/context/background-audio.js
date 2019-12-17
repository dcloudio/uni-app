import {
  getRealPath
} from '../util'

import {
  publish
} from '../../bridge'

let audio

let timeUpdateTimer = null
const TIME_UPDATE = 250

const publishBackgroundAudioStateChange = (state, res = {}) => publish('onBackgroundAudioStateChange', Object.assign({
  state
}, res))

const events = ['play', 'pause', 'ended', 'stop']

function initMusic () {
  if (audio) {
    return
  }
  audio = plus.audio.createPlayer({
    autoplay: true,
    backgroundControl: true
  })
  audio.src = audio.title = audio.epname = audio.singer = audio.coverImgUrl = audio.webUrl = ''
  audio.startTime = 0
  events.forEach(event => {
    audio.addEventListener(event, () => {
      // 添加 isStopped 属性是为了解决 安卓设备停止播放后获取播放进度不正确的问题
      if (event === 'play') {
        audio.isStopped = false
        startTimeUpdateTimer()
      } else if (event === 'stop') {
        audio.isStopped = true
      }

      if (event === 'pause' || event === 'ended' || event === 'stop') {
        stopTimeUpdateTimer()
      }

      const eventName = `onMusic${event[0].toUpperCase() + event.substr(1)}`
      publish(eventName, {
        dataUrl: audio.src,
        errMsg: `${eventName}:ok`
      })
      publishBackgroundAudioStateChange(event, {
        dataUrl: audio.src
      })
    })
  })
  audio.addEventListener('waiting', () => {
    stopTimeUpdateTimer()
    publishBackgroundAudioStateChange('waiting', {
      dataUrl: audio.src
    })
  })
  audio.addEventListener('error', err => {
    stopTimeUpdateTimer()
    publish('onMusicError', {
      dataUrl: audio.src,
      errMsg: 'Error:' + err.message
    })
    publishBackgroundAudioStateChange('error', {
      dataUrl: audio.src,
      errMsg: err.message,
      errCode: err.code
    })
  })
  audio.addEventListener('prev', () => publish('onBackgroundAudioPrev'))
  audio.addEventListener('next', () => publish('onBackgroundAudioNext'))
}

function startTimeUpdateTimer () {
  stopTimeUpdateTimer()
  timeUpdateTimer = setInterval(() => {
    publishBackgroundAudioStateChange('timeUpdate', {})
  }, TIME_UPDATE)
}

function stopTimeUpdateTimer () {
  if (timeUpdateTimer !== null) {
    clearInterval(timeUpdateTimer)
  }
}

function setMusicState (args) {
  initMusic()
  const props = ['src', 'startTime', 'coverImgUrl', 'webUrl', 'singer', 'epname', 'title']
  const style = {}
  Object.keys(args).forEach(key => {
    if (props.indexOf(key) >= 0) {
      let val = args[key]
      if (key === props[0] && val) {
        val = getRealPath(val)
      }
      audio[key] = style[key] = val
    }
  })
  audio.setStyles(style)
}

function getAudio () {
  return audio
}

export function getMusicPlayerState () {
  const audio = getAudio()
  if (audio) {
    return {
      dataUrl: audio.src,
      duration: audio.getDuration() || 0,
      currentPosition: audio.getPosition(),
      status: audio.isPaused ? 0 : 1,
      downloadPercent: Math.round(100 * audio.getBuffered() / audio.getDuration()),
      errMsg: `getMusicPlayerState:ok`
    }
  }
  return {
    status: 2,
    errMsg: `getMusicPlayerState:ok`
  }
}
export function operateMusicPlayer ({
  operationType,
  dataUrl,
  position,
  api = 'operateMusicPlayer',
  title,
  coverImgUrl
}) {
  const audio = getAudio()
  var operationTypes = ['resume', 'pause', 'stop']
  if (operationTypes.indexOf(operationType) > 0) {
    audio && audio[operationType]()
  } else if (operationType === 'play') {
    setMusicState({
      src: dataUrl,
      startTime: position,
      title,
      coverImgUrl
    })
    audio.play()
  } else if (operationType === 'seek') {
    audio && audio.seekTo(position)
  }
  return {
    errMsg: `${api}:ok`
  }
}
export function setBackgroundAudioState (args) {
  setMusicState(args)
  return {
    errMsg: `setBackgroundAudioState:ok`
  }
}
export function operateBackgroundAudio ({
  operationType,
  src,
  startTime,
  currentTime
}) {
  return operateMusicPlayer({
    operationType,
    dataUrl: src,
    position: startTime || currentTime || 0,
    api: 'operateBackgroundAudio'
  })
}
export function getBackgroundAudioState () {
  let data = {
    duration: 0,
    currentTime: 0,
    paused: false,
    src: '',
    buffered: 0,
    title: '',
    epname: '',
    singer: '',
    coverImgUrl: '',
    webUrl: '',
    startTime: 0,
    errMsg: `getBackgroundAudioState:ok`
  }
  const audio = getAudio()
  if (audio) {
    let newData = {
      duration: audio.getDuration() || 0,
      currentTime: audio.isStopped ? 0 : audio.getPosition(),
      paused: audio.isPaused,
      src: audio.src,
      buffered: audio.getBuffered(),
      title: audio.title,
      epname: audio.epname,
      singer: audio.singer,
      coverImgUrl: audio.coverImgUrl,
      webUrl: audio.webUrl,
      startTime: audio.startTime
    }
    data = Object.assign(data, newData)
  }
  return data
}
