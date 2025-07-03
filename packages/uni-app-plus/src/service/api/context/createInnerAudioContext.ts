import { capitalize, extend, isFunction } from '@vue/shared'
import {
  API_CREATE_INNER_AUDIO_CONTEXT,
  defineSyncApi,
} from '@dcloudio/uni-api'
import type { API_TYPE_CREATEE_INNER_AUDIO_CONTEXT } from '@dcloudio/uni-api'
import { once } from '@dcloudio/uni-shared'
import {
  type InnerAudioContextEvent,
  innerAudioContextEventNames,
  innerAudioContextOffEventNames,
} from '@dcloudio/uni-api'

import { getRealPath } from '../../../platform/getRealPath'

type ExtendAudio = {
  src?: string
  volume?: number
  startTime?: number
  isStopped?: boolean
  initStateChage?: boolean
  playbackRate?: (rate: number) => void
}
type Audio = PlusAudioAudioPlayer & ExtendAudio
type AudioEvnets = NonNullable<
  Parameters<PlusAudioAudioPlayer['addEventListener']>[0]
>
type OperationType = 'play' | 'pause' | 'stop' | 'seek'
type AudioState = {
  audioId: string
  autoplay?: boolean
  loop?: boolean
  obeyMuteSwitch?: boolean
  src?: string
  startTime?: number
  volume?: number
  sessionCategory?: string
  playbackRate?: number
}

const audios: Record<string, Audio> = {}
const evts: AudioEvnets[] = [
  'play',
  'canplay',
  'ended',
  'stop',
  'waiting',
  'seeking',
  'seeked',
  'pause',
]

const AUDIO_DEFAULT_SESSION_CATEGORY: string = 'playback'
const TIME_UPDATE = 200

const initStateChage = (audioId: string) => {
  const audio = audios[audioId]
  if (!audio) {
    return
  }
  if (!audio.initStateChage) {
    audio.initStateChage = true

    audio.addEventListener('error', (error) => {
      onAudioStateChange({
        state: 'error',
        audioId,
        errMsg: 'MediaError',
        errCode: error.code,
      })
    })

    evts.forEach((event) => {
      audio.addEventListener(event, () => {
        // 添加 isStopped 属性是为了解决 安卓设备停止播放后获取播放进度不正确的问题
        if (event === 'play') {
          audio.isStopped = false
        } else if (event === 'stop') {
          audio.isStopped = true
        }
        onAudioStateChange({
          state: event,
          audioId,
        })
      })
    })
  }
}

function createAudioInstance() {
  const audioId = `${Date.now()}${Math.random()}`
  const audio: Audio = (audios[audioId] = plus.audio.createPlayer('')) // 此处空字符串必填
  audio.src = ''
  audio.volume = 1
  audio.startTime = 0
  audio.setSessionCategory(AUDIO_DEFAULT_SESSION_CATEGORY)
  return {
    errMsg: 'createAudioInstance:ok',
    audioId,
  }
}

function setAudioState({
  audioId,
  src,
  startTime,
  autoplay = false,
  loop = false,
  obeyMuteSwitch,
  volume,
  sessionCategory = AUDIO_DEFAULT_SESSION_CATEGORY,
  playbackRate,
}: AudioState) {
  const audio = audios[audioId]
  if (audio) {
    const style: { loop: boolean; autoplay: boolean } & ExtendAudio = {
      loop,
      autoplay,
    }
    if (src) {
      // iOS 设置 src 会重新播放
      const realSrc = getRealPath(src)
      if (audio.src !== realSrc) audio.src = style.src = realSrc
    }
    if (startTime) {
      audio.startTime = style.startTime = startTime
    }
    if (typeof volume === 'number') {
      audio.volume = style.volume = volume
    }
    audio.setStyles(style)
    if (sessionCategory) {
      audio.setSessionCategory(sessionCategory)
    }
    if (playbackRate && audio.playbackRate) {
      audio.playbackRate(playbackRate)
    }
    initStateChage(audioId)
  }
  return {
    errMsg: 'setAudioState:ok',
  }
}

function getAudioState({ audioId }: { audioId: string }) {
  const audio = audios[audioId]
  if (!audio) {
    return {
      errMsg: 'getAudioState:fail',
    }
  }
  const { src, startTime, volume } = audio

  return {
    errMsg: 'getAudioState:ok',
    duration: 1e3 * (audio.getDuration() || 0),
    currentTime: audio.isStopped ? 0 : 1e3 * audio.getPosition(),
    paused: audio.isPaused(),
    src,
    volume,
    startTime: 1e3 * startTime!,
    buffered: 1e3 * audio.getBuffered(),
  }
}

function operateAudio({
  operationType,
  audioId,
  currentTime,
}: {
  operationType: OperationType
  audioId: string
  currentTime?: number
}) {
  const audio = audios[audioId]
  switch (operationType) {
    case 'play':
    case 'pause':
    case 'stop':
      audio[
        operationType === 'play' && audio.isPaused() ? 'resume' : operationType
      ]()
      break
    case 'seek':
      typeof currentTime != 'undefined' ? audio.seekTo(currentTime / 1e3) : ''
      break
  }
  return {
    errMsg: 'operateAudio:ok',
  }
}

const innerAudioContexts: Record<string, InnerAudioContext> =
  Object.create(null)

const onAudioStateChange = ({
  state,
  audioId,
  errMsg,
  errCode,
}: {
  state: AudioEvnets
  audioId: string
  errMsg?: string
  errCode?: unknown
}) => {
  const audio = innerAudioContexts[audioId]
  if (audio) {
    emit(audio, state, errMsg, errCode)
    if (state === 'play') {
      const oldCurrentTime = audio.currentTime
      emit(audio, 'timeUpdate' as any)
      audio.__timing = setInterval(() => {
        const currentTime = audio.currentTime
        if (currentTime !== oldCurrentTime) {
          emit(audio, 'timeUpdate' as any)
        }
      }, TIME_UPDATE)
    } else if (state === 'pause' || state === 'stop' || state === 'error') {
      clearInterval(audio.__timing!)
    }
  }
}

const props = [
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
    name: 'autoplay',
    default: false,
    cache: true,
  },
  {
    name: 'loop',
    default: false,
    cache: true,
  },
  {
    name: 'obeyMuteSwitch',
    default: true,
    readonly: true,
    cache: true,
  },
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
    name: 'buffered',
    readonly: true,
  },
  {
    name: 'volume',
  },
  {
    name: 'playbackRate',
    cache: true,
  },
]

class InnerAudioContext implements UniApp.InnerAudioContext {
  /**
   * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
   */
  'duration': UniApp.InnerAudioContext['duration']
  /**
   * 音频开始播放的位置（单位：s）
   */
  'startTime': UniApp.InnerAudioContext['startTime']
  /**
   * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回
   */
  'currentTime': UniApp.InnerAudioContext['currentTime']
  /**
   * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
   */
  'paused': UniApp.InnerAudioContext['paused']
  /**
   * 音频的数据链接，用于直接播放。
   */
  'src': UniApp.InnerAudioContext['src']
  /**
   * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲
   */
  'buffered': UniApp.InnerAudioContext['buffered']
  /**
   * 是否自动开始播放，默认 false
   */
  'autoplay': UniApp.InnerAudioContext['autoplay']
  /**
   * 是否循环播放，默认 false
   */
  'loop': UniApp.InnerAudioContext['loop']
  /**
   * 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true
   */
  'obeyMuteSwitch': UniApp.InnerAudioContext['obeyMuteSwitch']
  /**
   * 音量。范围 0~1。
   */
  'volume': UniApp.InnerAudioContext['volume']
  /**
   * 播放的倍率。可取值： 0.5/0.8/1.0/1.25/1.5/2.0，默认值为1.0。（仅 App 支持）。
   */
  'playbackRate': UniApp.InnerAudioContext['playbackRate']
  /**
   * 事件监听
   */
  _callbacks: Partial<
    Record<InnerAudioContextEvent, Array<Function | undefined>>
  >
  /**
   *
   * @param id 当前Audio示例id
   */
  id: string
  /**
   *
   * @param __timing 当前Audio所使用的timer
   */
  __timing?: ReturnType<typeof setInterval>
  _options: Data
  constructor(id: string) {
    this.id = id
    this._callbacks = {}
    this._options = {}
    // 初始化事件监听列表
    innerAudioContextEventNames.forEach((eventName) => {
      this._callbacks[eventName] = []
    })
    props.forEach((item) => {
      const name = item.name

      Object.defineProperty(this, name, {
        get: () => {
          const result = item.cache
            ? this._options
            : getAudioState({
                audioId: this.id,
              })
          const value = name in result ? (result as any)[name] : item.default
          return typeof value === 'number' && name !== 'volume'
            ? value / 1e3
            : value
        },
        set: item.readonly
          ? undefined
          : (value) => {
              this._options[name] = value
              setAudioState(
                extend({}, this._options, {
                  audioId: this.id,
                })
              )
            },
      })
    })

    initInnerAudioContextEventOnce()
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
      currentTime: position * 1e3,
    })
  }

  destroy() {
    clearInterval(this.__timing!)
    if (audios[this.id]) {
      audios[this.id].close()
      delete audios[this.id]
    }
    delete innerAudioContexts[this.id]
  }

  _operate(type: OperationType, options?: Data) {
    operateAudio(
      extend({}, options, {
        audioId: this.id,
        operationType: type,
      })
    )
  }

  'onCanplay': UniApp.InnerAudioContext['onCanplay']
  'onPlay': UniApp.InnerAudioContext['onPlay']
  'onPause': UniApp.InnerAudioContext['onPause']
  'onStop': UniApp.InnerAudioContext['onStop']
  'onEnded': UniApp.InnerAudioContext['onEnded']
  'onTimeUpdate': UniApp.InnerAudioContext['onTimeUpdate']
  'onError': UniApp.InnerAudioContext['onError']
  'onWaiting': UniApp.InnerAudioContext['onWaiting']
  'onSeeking': UniApp.InnerAudioContext['onSeeking']
  'onSeeked': UniApp.InnerAudioContext['onSeeked']

  'offCanplay': UniApp.InnerAudioContext['offCanplay']
  'offPlay': UniApp.InnerAudioContext['offPlay']
  'offPause': UniApp.InnerAudioContext['offPause']
  'offStop': UniApp.InnerAudioContext['offStop']
  'offEnded': UniApp.InnerAudioContext['offEnded']
  'offTimeUpdate': UniApp.InnerAudioContext['offTimeUpdate']
  'offError': UniApp.InnerAudioContext['offError']
  'offWaiting': UniApp.InnerAudioContext['offWaiting']
  'offSeeking': UniApp.InnerAudioContext['offSeeking']
  'offSeeked': UniApp.InnerAudioContext['offSeeked']
}

const initInnerAudioContextEventOnce = /*#__PURE__*/ once(() => {
  // 批量设置音频上下文事件监听方法
  innerAudioContextEventNames.forEach((eventName) => {
    InnerAudioContext.prototype[eventName] = function (callback: Function) {
      if (isFunction(callback)) {
        this._callbacks[eventName]!.push(callback)
      }
    }
  })

  // 批量设置音频上下文事件取消监听方法
  innerAudioContextOffEventNames.forEach((eventName) => {
    InnerAudioContext.prototype[eventName] = function (callback: Function) {
      const callbacks = this._callbacks[eventName as InnerAudioContextEvent]!
      const index = callbacks.indexOf(callback)
      if (index >= 0) {
        callbacks.splice(index, 1)
      }
    }
  })
})

function emit(
  audio: InnerAudioContext,
  state: AudioEvnets,
  errMsg?: string,
  errCode?: unknown
) {
  const name = `on${capitalize(state)}` as InnerAudioContextEvent
  audio._callbacks[name]!.forEach((callback) => {
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

/**
 * 创建音频上下文
 */
export const createInnerAudioContext =
  defineSyncApi<API_TYPE_CREATEE_INNER_AUDIO_CONTEXT>(
    API_CREATE_INNER_AUDIO_CONTEXT,
    () => {
      const { audioId } = createAudioInstance()
      const innerAudioContext = new InnerAudioContext(audioId)
      innerAudioContexts[audioId] = innerAudioContext
      return innerAudioContext
    }
  )
