export default class EventChannel {
  constructor (id, events) {
    this.id = id
    this.listener = {}
    this.emitCache = {}
    if (events) {
      Object.keys(events).forEach(name => {
        this.on(name, events[name])
      })
    }
  }

  emit (eventName, ...args) {
    const fns = this.listener[eventName]
    if (!fns) {
      return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args)
    }
    fns.forEach(opt => {
      opt.fn.apply(opt.fn, args)
    })
    this.listener[eventName] = fns.filter(opt => opt.type !== 'once')
  }

  on (eventName, fn) {
    this._addListener(eventName, 'on', fn)
    this._clearCache(eventName)
  }

  once (eventName, fn) {
    this._addListener(eventName, 'once', fn)
    this._clearCache(eventName)
  }

  off (eventName, fn) {
    const fns = this.listener[eventName]
    if (!fns) {
      return
    }
    if (fn) {
      for (let i = 0; i < fns.length;) {
        if (fns[i].fn === fn) {
          fns.splice(i, 1)
          i--
        }
        i++
      }
    } else {
      delete this.listener[eventName]
    }
  }

  _clearCache (eventName) {
    const cacheArgs = this.emitCache[eventName]
    if (cacheArgs) {
      for (; cacheArgs.length > 0;) {
        this.emit.apply(this, [eventName].concat(cacheArgs.shift()))
      }
    }
  }

  _addListener (eventName, type, fn) {
    (this.listener[eventName] || (this.listener[eventName] = [])).push({
      fn,
      type
    })
  }
}
