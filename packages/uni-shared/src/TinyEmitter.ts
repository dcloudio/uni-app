interface E {
  e: Record<string, unknown>
  on: (name: EventName, callback: EventCallback, ctx?: any) => this
  once: (name: EventName, callback: EventCallback, ctx?: any) => this
  emit: (name: EventName, ...args: any[]) => this
  off: (name: EventName, callback?: EventCallback) => this
}

const E = function () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
} as unknown as { new (): E }

// export type EventName = string | number | symbol
export type EventName = string
export type EventCallback = Function

E.prototype = {
  on: function (name: EventName, callback: EventCallback, ctx?: any) {
    var e = this.e || (this.e = {})
    ;(e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx,
    })

    return this
  },

  once: function (name: EventName, callback: EventCallback, ctx?: any) {
    var self = this
    function listener() {
      self.off(name, listener)
      callback.apply(ctx, arguments)
    }

    listener._ = callback
    return this.on(name, listener, ctx)
  },

  emit: function (name: EventName) {
    var data = [].slice.call(arguments, 1)
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice()
    var i = 0
    var len = evtArr.length

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data)
    }

    return this
  },

  off: function (name: EventName, callback?: EventCallback) {
    var e = this.e || (this.e = {})
    var evts = e[name]
    var liveEvents = []

    if (evts && callback) {
      for (var i = evts.length - 1; i >= 0; i--) {
        if (evts[i].fn === callback || evts[i].fn._ === callback) {
          evts.splice(i, 1)
          break
        }
      }
      liveEvents = evts
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    liveEvents.length ? (e[name] = liveEvents) : delete e[name]

    return this
  },
}

export default E
