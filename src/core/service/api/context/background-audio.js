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
  'prev',
  'next',
  'error',
  'waiting'
]
const callbacks = {}
eventNames.forEach(name => {
  callbacks[name] = []
})

const props = [
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
    name: 'src',
    cache: true
  },
  {
    name: 'startTime',
    default: 0,
    cache: true
  },
  {
    name: 'buffered',
    readonly: true
  },
  {
    name: 'title',
    cache: true
  },
  {
    name: 'epname',
    cache: true
  },
  {
    name: 'singer',
    cache: true
  },
  {
    name: 'coverImgUrl',
    cache: true
  },
  {
    name: 'webUrl',
    cache: true
  },
  {
    name: 'protocol',
    readonly: true,
    default: 'http'
  }
]

class BackgroundAudioManager {
  constructor () {
    this._options = {}
    onMethod('onBackgroundAudioStateChange', ({
      state,
      errMsg,
      errCode
    }) => {
      callbacks[state].forEach(callback => {
        if (typeof callback === 'function') {
          callback(state === 'error' ? {
            errMsg,
            errCode
          } : {})
        }
      })
    })
    props.forEach(item => {
      const name = item.name
      const data = {
        get () {
          const result = item.cache ? this._options : invokeMethod('getBackgroundAudioState')
          return name in result ? result[name] : item.default
        }
      }
      if (!item.readonly) {
        data.set = function (value) {
          this._options[name] = value
          invokeMethod('setBackgroundAudioState', Object.assign({}, this._options, {
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
  _operate (type, options) {
    invokeMethod('operateBackgroundAudio', Object.assign({}, options, {
      operationType: type
    }))
  }
}

eventNames.forEach(item => {
  const name = item[0].toUpperCase() + item.substr(1)
  BackgroundAudioManager.prototype[`on${name}`] = function (callback) {
    callbacks[item].push(callback)
  }
})

let backgroundAudioManager

export function getBackgroundAudioManager () {
  return backgroundAudioManager || (backgroundAudioManager = new BackgroundAudioManager())
}
