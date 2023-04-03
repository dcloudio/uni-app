import { extend, capitalize, isFunction } from '@vue/shared'
import {
  defineSyncApi,
  API_GET_BACKGROUND_AUDIO_MANAGER,
  API_TYPE_GET_BACKGROUND_AUDIO_MANAGER,
} from '@dcloudio/uni-api'
import { once } from '@dcloudio/uni-shared'
import { getRealPath } from '../../../platform/getRealPath'

type eventNames =
  | 'canplay'
  | 'play'
  | 'pause'
  | 'stop'
  | 'ended'
  | 'timeUpdate'
  | 'prev'
  | 'next'
  | 'error'
  | 'waiting'
type onEventNames =
  | 'onNext'
  | 'onPrev'
  | 'onWaiting'
  | 'onTimeUpdate'
  | 'onEnded'
  | 'onStop'
  | 'onPause'
  | 'onPlay'
  | 'onCanplay'
  | 'onError'
type AudioEvents =
  | 'canplay'
  | 'play'
  | 'pause'
  | 'stop'
  | 'ended'
  | 'error'
  | 'waiting'
  | 'seeking'
  | 'seeked'
type Events = 'play' | 'pause' | 'ended' | 'stop' | 'canplay'
type Audio = PlusAudioAudioPlayer & {
  src?: string
  title?: string
  epname?: string
  singer?: string
  coverImgUrl?: string
  webUrl?: string
  startTime?: number
  isStopped?: boolean
  playbackRate?: (rate: number) => void
}

const eventNames: eventNames[] = [
  'canplay',
  'play',
  'pause',
  'stop',
  'ended',
  'timeUpdate',
  'prev',
  'next',
  'error',
  'waiting',
]

const callbacks: Record<eventNames, Function[]> = {
  canplay: [],
  play: [],
  pause: [],
  stop: [],
  ended: [],
  timeUpdate: [],
  prev: [],
  next: [],
  error: [],
  waiting: [],
}

let audio: Audio
let timeUpdateTimer: ReturnType<typeof setInterval> | null = null
const TIME_UPDATE = 250
const events: Events[] = ['play', 'pause', 'ended', 'stop', 'canplay']

function startTimeUpdateTimer() {
  stopTimeUpdateTimer()
  onBackgroundAudioStateChange({ state: 'timeUpdate' })
  timeUpdateTimer = setInterval(() => {
    onBackgroundAudioStateChange({ state: 'timeUpdate' })
  }, TIME_UPDATE)
}

function stopTimeUpdateTimer() {
  if (timeUpdateTimer !== null) {
    clearInterval(timeUpdateTimer)
  }
}

function initMusic() {
  if (audio) {
    return
  }
  const publish = UniServiceJSBridge.invokeOnCallback
  audio = plus.audio.createPlayer({
    autoplay: true,
    backgroundControl: true,
  })
  audio.src =
    audio.title =
    audio.epname =
    audio.singer =
    audio.coverImgUrl =
    audio.webUrl =
      ''
  audio.startTime = 0
  events.forEach((event) => {
    audio.addEventListener(event as AudioEvents, () => {
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

      const eventName = `onMusic${event[0].toUpperCase() + event.slice(1)}`
      publish(eventName, {
        dataUrl: audio.src,
        errMsg: `${eventName}:ok`,
      })
      onBackgroundAudioStateChange({
        state: event,
        dataUrl: audio.src,
      })
    })
  })
  audio.addEventListener('waiting', () => {
    stopTimeUpdateTimer()
    onBackgroundAudioStateChange({
      state: 'waiting',
      dataUrl: audio.src,
    })
  })
  audio.addEventListener('error', (err) => {
    stopTimeUpdateTimer()
    publish('onMusicError', {
      dataUrl: audio.src,
      errMsg: 'Error:' + err.message,
    })
    onBackgroundAudioStateChange({
      state: 'error',
      dataUrl: audio.src,
      errMsg: err.message,
      errCode: err.code,
    })
  })
  // @ts-expect-error
  audio.addEventListener('prev', () => {
    onBackgroundAudioStateChange({ state: 'prev' })
  })
  // @ts-expect-error
  audio.addEventListener('next', () => {
    onBackgroundAudioStateChange({ state: 'next' })
  })
}

function getBackgroundAudioState() {
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
    errMsg: 'getBackgroundAudioState:ok',
  }
  if (audio) {
    const newData = {
      duration: audio.getDuration() || 0,
      currentTime: audio.isStopped ? 0 : audio.getPosition(),
      paused: audio.isPaused(),
      src: audio.src,
      buffered: audio.getBuffered(),
      title: audio.title,
      epname: audio.epname,
      singer: audio.singer,
      coverImgUrl: audio.coverImgUrl,
      webUrl: audio.webUrl,
      startTime: audio.startTime,
    }
    data = extend(data, newData)
  }
  return data
}

function setMusicState(args: Partial<Audio>, name?: string) {
  initMusic()
  const props = [
    'src',
    'startTime',
    'coverImgUrl',
    'webUrl',
    'singer',
    'epname',
    'title',
  ]

  if (name === 'playbackRate') {
    let val = (args as any)[name]
    audio.playbackRate && audio.playbackRate(parseFloat(val as string))
    return
  }

  const style: PlusAudioAudioPlayerStyles = {}
  Object.keys(args).forEach((key) => {
    if (props.indexOf(key) >= 0) {
      let val = (args as any)[key]
      if (key === props[0] && val) {
        val = getRealPath(val as string)
      }
      ;(audio as any)[key] = (style as any)[key] = val
    }
  })
  audio.setStyles(style)
}

function operateMusicPlayer({
  operationType,
  src,
  position,
  api = 'operateMusicPlayer',
  title,
  coverImgUrl,
}: {
  operationType: string
  position: number
  api: string
  src?: string
  title?: string
  coverImgUrl?: string
}) {
  var operationTypes = ['resume', 'pause', 'stop']
  if (operationTypes.indexOf(operationType) > 0) {
    audio && (audio as any)[operationType]()
  } else if (operationType === 'play') {
    setMusicState({
      src,
      startTime: position,
      title,
      coverImgUrl,
    })
    audio.play()
  } else if (operationType === 'seek') {
    audio && audio.seekTo(position)
  }
  return {
    errMsg: `${api}:ok`,
  }
}

function operateBackgroundAudio({
  operationType,
  src,
  startTime,
  currentTime,
}: {
  operationType: string
  src?: string
  startTime?: number
  currentTime?: number
}) {
  return operateMusicPlayer({
    operationType,
    src,
    position: startTime || currentTime || 0,
    api: 'operateBackgroundAudio',
  })
}

function onBackgroundAudioStateChange({
  state,
  errMsg,
  errCode,
  dataUrl,
}: {
  state: eventNames
  errMsg?: string
  errCode?: number
  dataUrl?: string
}) {
  callbacks[state].forEach((callback) => {
    if (isFunction(callback)) {
      callback(
        state === 'error'
          ? {
              errMsg,
              errCode,
            }
          : {}
      )
    }
  })
}

const onInitBackgroundAudioManager = /*#__PURE__*/ once(() => {
  eventNames.forEach((item) => {
    BackgroundAudioManager.prototype[`on${capitalize(item)}` as onEventNames] =
      function (callback: Function) {
        callbacks[item].push(callback)
      }
  })
})

const props = [
  {
    name: 'duration',
    readonly: true,
  },
  {
    name: 'currentTime',
    readonly: true,
  },
  {
    name: 'paused',
    readonly: true,
  },
  {
    name: 'src',
    cache: true,
  },
  {
    name: 'startTime',
    default: 0,
    cache: true,
  },
  {
    name: 'buffered',
    readonly: true,
  },
  {
    name: 'title',
    cache: true,
  },
  {
    name: 'epname',
    cache: true,
  },
  {
    name: 'singer',
    cache: true,
  },
  {
    name: 'coverImgUrl',
    cache: true,
  },
  {
    name: 'webUrl',
    cache: true,
  },
  {
    name: 'protocol',
    readonly: true,
    default: 'http',
  },
  {
    name: 'playbackRate',
    default: 1,
    cache: true,
  },
]

class BackgroundAudioManager implements UniApp.BackgroundAudioManager {
  'duration': UniApp.BackgroundAudioManager['duration']
  'startTime': UniApp.BackgroundAudioManager['startTime']
  'currentTime': UniApp.BackgroundAudioManager['currentTime']
  'paused': UniApp.BackgroundAudioManager['paused']
  'src': UniApp.BackgroundAudioManager['src']
  'buffered': UniApp.BackgroundAudioManager['buffered']
  'title': UniApp.BackgroundAudioManager['title']
  'epname': UniApp.BackgroundAudioManager['epname']
  'singer': UniApp.BackgroundAudioManager['singer']
  'coverImgUrl': UniApp.BackgroundAudioManager['coverImgUrl']
  'webUrl': UniApp.BackgroundAudioManager['webUrl']
  'protocol': UniApp.BackgroundAudioManager['protocol']
  'playbackRate': UniApp.BackgroundAudioManager['playbackRate']

  _options: Data
  constructor() {
    this._options = {}

    props.forEach((item) => {
      const name = item.name
      Object.defineProperty(this, name, {
        get: () => {
          const result = item.cache ? this._options : getBackgroundAudioState()
          return name in result ? (result as any)[name] : item.default
        },
        set: item.readonly
          ? undefined
          : (value) => {
              this._options[name] = value
              setMusicState(this._options as any, name)
            },
      })
    })

    onInitBackgroundAudioManager()
  }

  play() {
    this._operate('play')
  }

  pause() {
    this._operate('pause')
  }

  stop() {
    this._operate('stop')
  }

  seek(position: number) {
    this._operate('seek', {
      currentTime: position,
    })
  }

  _operate(type: string, options?: Data) {
    operateBackgroundAudio(
      extend({}, options, {
        operationType: type,
      })
    )
  }

  'onCanplay': UniApp.BackgroundAudioManager['onCanplay']
  'onPlay': UniApp.BackgroundAudioManager['onPlay']
  'onPause': UniApp.BackgroundAudioManager['onPause']
  'onStop': UniApp.BackgroundAudioManager['onStop']
  'onEnded': UniApp.BackgroundAudioManager['onEnded']
  'onTimeUpdate': UniApp.BackgroundAudioManager['onTimeUpdate']
  'onWaiting': UniApp.BackgroundAudioManager['onWaiting']
  'onPrev': UniApp.BackgroundAudioManager['onPrev']
  'onNext': UniApp.BackgroundAudioManager['onNext']
  'onError': (...args: any) => void
}

let backgroundAudioManager: BackgroundAudioManager

export const getBackgroundAudioManager =
  defineSyncApi<API_TYPE_GET_BACKGROUND_AUDIO_MANAGER>(
    API_GET_BACKGROUND_AUDIO_MANAGER,
    () =>
      backgroundAudioManager ||
      (backgroundAudioManager = new BackgroundAudioManager())
  )
