type NavigateToOptionEvents = Record<string, (...args: any[]) => void>

interface EventChannelListener {
  type: 'on' | 'once'
  fn: (...args: any[]) => void
}

export class EventChannel {
  id?: number
  private listener: Record<string, EventChannelListener[]>
  private emitCache: {
    args: any[]
    eventName: string
  }[]
  constructor(id?: number, events?: NavigateToOptionEvents) {
    this.id = id
    this.listener = {}
    this.emitCache = []
    if (events) {
      Object.keys(events).forEach((name) => {
        this.on(name, events[name])
      })
    }
  }

  emit(eventName: string, ...args: any[]) {
    const fns = this.listener[eventName]
    if (!fns) {
      return this.emitCache.push({
        eventName,
        args,
      })
    }
    fns.forEach((opt) => {
      opt.fn.apply(opt.fn, args)
    })
    this.listener[eventName] = fns.filter((opt) => opt.type !== 'once')
  }

  on(eventName: string, fn: EventChannelListener['fn']) {
    this._addListener(eventName, 'on', fn)
    this._clearCache(eventName)
  }

  once(eventName: string, fn: EventChannelListener['fn']) {
    this._addListener(eventName, 'once', fn)
    this._clearCache(eventName)
  }

  off(eventName: string, fn: EventChannelListener['fn']) {
    const fns = this.listener[eventName]
    if (!fns) {
      return
    }
    if (fn) {
      for (let i = 0; i < fns.length; ) {
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

  _clearCache(eventName?: string) {
    for (let index = 0; index < this.emitCache.length; index++) {
      const cache = this.emitCache[index]
      const _name = eventName
        ? cache.eventName === eventName
          ? eventName
          : null
        : cache.eventName
      if (!_name) continue
      const location = this.emit.apply(this, [_name, ...cache.args])
      if (typeof location === 'number') {
        this.emitCache.pop()
        continue
      }
      this.emitCache.splice(index, 1)
      index--
    }
  }

  _addListener(
    eventName: string,
    type: EventChannelListener['type'],
    fn: EventChannelListener['fn']
  ) {
    ;(this.listener[eventName] || (this.listener[eventName] = [])).push({
      fn,
      type,
    })
  }
}
