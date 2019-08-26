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
  'timeupdate',
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
      this._callbacks[name] = []
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
    this._operate('play', {
      currentTime: position
    })
  }
  destroy () {
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

onMethod('onAudioStateChange', ({
  state,
  audioId,
  errMsg,
  errCode
}) => {
  const audio = innerAudioContexts[audioId]
  audio && audio._callbacks[state].forEach(callback => {
    if (typeof callback === 'function') {
      callback(state === 'error' ? {
        errMsg,
        errCode
      } : {})
    }
  })
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
