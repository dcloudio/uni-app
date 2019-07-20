import getRealPath from 'uni-platform/helpers/get-real-path'

/**
 * 可以批量设置的监听事件
 */
const innerAudioContextEventNames = ['onCanplay', 'onPlay', 'onPause', 'onStop', 'onEnded', 'onTimeUpdate', 'onError', 'onWaiting', 'onSeeking', 'onSeeked']

const innerAudioContextOffEventNames = ['offCanplay', 'offPlay', 'offPause', 'offStop', 'offEnded', 'offTimeUpdate', 'offError', 'offWaiting', 'offSeeking', 'offSeeke']

/**
 * 音频上下文对象
 */
class InnerAudioContext {
  /**
   * 原始音频对象
   */
  _audio
  /**
   * 是否暂停中
   */
  _stoping
  /**
   * 开始时间
   */
  startTime
  /**
   * 事件监听
   */
  _events
  /**
   * 音频地址
   */
  _src
  /**
   * 音频上下文初始化
   */
  constructor () {
    var audio = this._audio = new Audio()
    this._stoping = false
    // 和audio对象同名同效果的属性
    var propertys = ['src', 'autoplay', 'loop', 'duration', 'currentTime', 'paused', 'volume']
    propertys.forEach((property) => {
      Object.defineProperty(this, property, {
        set: property === 'src' ? (src) => {
          audio.src = getRealPath(src)
          this._src = src
          return src
        } : (val) => {
          audio[property] = val
          return val
        },
        get: property === 'src' ? () => {
          return this._src
        } : () => {
          return audio[property]
        }
      })
    })
    this.startTime = 0
    Object.defineProperty(this, 'obeyMuteSwitch', {
      set (val) {
        return false
      },
      get () {
        return false
      }
    })
    Object.defineProperty(this, 'buffered', {
      get () {
        var buffered = audio.buffered
        if (buffered.length) {
          return buffered.end(buffered.length - 1)
        } else {
          return 0
        }
      }
    })
    // 初始化事件监听列表
    this._events = {}
    innerAudioContextEventNames.forEach(eventName => {
      this._events[eventName] = []
    })
    audio.addEventListener('loadedmetadata', () => {
      var startTime = Number(this.startTime) || 0
      if (startTime > 0) {
        audio.currentTime = startTime
      }
    })
    // 和audio对象同名同效果的事件
    var eventNames = ['canplay', 'play', 'pause', 'ended', 'timeUpdate', 'error', 'waiting', 'seeking', 'seeked']
    var stopEventNames = ['pause', 'seeking', 'seeked', 'timeUpdate']
    eventNames.forEach(eventName => {
      audio.addEventListener(eventName.toLowerCase(), () => {
        // stop事件过滤
        if (this._stoping && stopEventNames.indexOf(eventName) >= 0) {
          return
        }
        this._events[`on${eventName.substr(0, 1).toUpperCase()}${eventName.substr(1)}`].forEach((callback) => {
          callback()
        })
      }, false)
    })
  }
  /**
   * 播放
   */
  play () {
    this._stoping = false
    this._audio.play()
  }
  /**
   * 暂停
   */
  pause () {
    this._audio.pause()
  }
  /**
   * 停止
   */
  stop () {
    this._stoping = true
    this._audio.pause()
    this._audio.currentTime = 0
    this._events.onStop.forEach((callback) => {
      callback()
    })
  }
  /**
   * 跳转到
   * @param {number} position
   */
  seek (position) {
    this._stoping = false
    position = Number(position)
    if (typeof position === 'number' && !isNaN(position)) {
      this._audio.currentTime = position
    }
  }
  /**
   * 销毁
   */
  destroy () {
    this.stop()
  }
}

// 批量设置音频上下文事件监听方法
innerAudioContextEventNames.forEach((eventName) => {
  InnerAudioContext.prototype[eventName] = function (callback) {
    if (typeof callback === 'function') {
      this._events[eventName].push(callback)
    }
  }
})

// 批量设置音频上下文事件取消监听方法
innerAudioContextOffEventNames.forEach((eventName) => {
  InnerAudioContext.prototype[eventName] = function (callback) {
    var handle = this._events[eventName.replace('off', 'on')]
    var index = handle.indexOf(callback)
    if (index >= 0) {
      handle.splice(index, 1)
    }
  }
})

/**
 * 创建音频上下文
 */
export function createInnerAudioContext () {
  return new InnerAudioContext()
}
