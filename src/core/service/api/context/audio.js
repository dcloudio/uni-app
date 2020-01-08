import {
  onMethod,
  invokeMethod
} from '../../platform'

const eventNames = [
  'canplay',
  'play',
  'pause',
  'stop',
  'ended',
  'timeUpdate',
  'error',
  'waiting',
  'seeking',
  'seeked'
]

const props = [
  {
    name: 'src',
    cache: true
  },
  {
    name: 'startTime',
    default: 0,
    cache: true
  },
  {
    name: 'autoplay',
    default: false,
    cache: true
  },
  {
    name: 'loop',
    default: false,
    cache: true
  },
  {
    name: 'obeyMuteSwitch',
    default: true,
    readonly: true,
    cache: true
  },
  {
    name: 'duration',
    readonly: true
  },
  {
    name: 'currentTime',
    readonly: true
  },
  {
    name: 'paused',
    readonly: true
  },
  {
    name: 'buffered',
    readonly: true
  },
  {
    name: 'volume'
  }
]

class InnerAudioContext {
  constructor (id) {
    this.id = id
    this._callbacks = {}
    this._options = {}
    eventNames.forEach(name => {
      this._callbacks[name.toLowerCase()] = []
    })
    props.forEach(item => {
      const name = item.name
      const data = {
        get () {
          const result = item.cache ? this._options : invokeMethod('getAudioState', {
            audioId: this.id
          })
          const value = name in result ? result[name] : item.default
          return typeof value === 'number' && name !== 'volume' ? value / 1e3 : value
        }
      }
      if (!item.readonly) {
        data.set = function (value) {
          this._options[name] = value
          invokeMethod('setAudioState', Object.assign({}, this._options, {
            audioId: this.id
          }))
        }
      }
      Object.defineProperty(this, name, data)
    })
  }
  play () {
    this._operate('play')
  }
  pause () {
    this._operate('pause')
  }
  stop () {
    this._operate('stop')
  }
  seek (position) {
    this._operate('seek', {
      currentTime: position * 1e3
    })
  }
  destroy () {
    clearInterval(audio.__timing)
    invokeMethod('destroyAudioInstance', {
      audioId: this.id
    })
    delete innerAudioContexts[this.id]
  }
  _operate (type, options) {
    invokeMethod('operateAudio', Object.assign({}, options, {
      audioId: this.id,
      operationType: type
    }))
  }
}

eventNames.forEach(item => {
  const name = item[0].toUpperCase() + item.substr(1)
  item = item.toLowerCase()
  InnerAudioContext.prototype[`on${name}`] = function (callback) {
    this._callbacks[item].push(callback)
  }
  InnerAudioContext.prototype[`off${name}`] = function (callback) {
    const callbacks = this._callbacks[item]
    const index = callbacks.indexOf(callback)
    if (index >= 0) {
      callbacks.splice(index, 1)
    }
  }
})

function emit (audio, state, errMsg, errCode) {
  audio._callbacks[state].forEach(callback => {
    if (typeof callback === 'function') {
      callback(state === 'error' ? {
        errMsg,
        errCode
      } : {})
    }
  })
}

onMethod('onAudioStateChange', ({
  state,
  audioId,
  errMsg,
  errCode
}) => {
  const audio = innerAudioContexts[audioId]
  if (audio) {
    emit(audio, state, errMsg, errCode)
    if (state === 'play') {
      const oldCurrentTime = audio.currentTime
      audio.__timing = setInterval(() => {
        const currentTime = audio.currentTime
        if (currentTime !== oldCurrentTime) {
          emit(audio, 'timeupdate')
        }
      }, 200)
    } else if (state === 'pause' || state === 'stop' || state === 'error') {
      clearInterval(audio.__timing)
    }
  }
})

const innerAudioContexts = Object.create(null)

export function createInnerAudioContext () {
  const {
    audioId
  } = invokeMethod('createAudioInstance')
  const innerAudioContext = new InnerAudioContext(audioId)
  innerAudioContexts[audioId] = innerAudioContext
  return innerAudioContext
}
