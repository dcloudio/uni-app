export default {
  methods: {
    touchtrack: function (method) {
      const self = this
      let x0 = 0
      let y0 = 0
      let x1 = 0
      let y1 = 0
      const fn = function ($event, state, x, y) {
        if (self[method]({
          target: $event.target,
          currentTarget: $event.currentTarget,
          stopPropagation: $event.stopPropagation.bind($event),
          touches: $event.touches,
          changedTouches: $event.changedTouches,
          detail: {
            state,
            x0: x,
            y0: y,
            dx: x - x0,
            dy: y - y0,
            ddx: x - x1,
            ddy: y - y1,
            timeStamp: $event.timeStamp
          }
        }) === false) {
          return false
        }
      }

      let $eventOld = null
      this.addListener('touchstart', function ($event) {
        if (!$eventOld) {
          $eventOld = $event
          x0 = x1 = $event.touches[0].pageX
          y0 = y1 = $event.touches[0].pageY
          return fn($event, 'start', x0, y0)
        }
      })
      this.addListener('touchmove', function ($event) {
        if ($eventOld) {
          const res = fn($event, 'move', $event.touches[0].pageX, $event.touches[0].pageY)
          x1 = $event.touches[0].pageX
          y1 = $event.touches[0].pageY
          return res
        }
      })
      this.addListener('touchend', function ($event) {
        if ($eventOld) {
          $eventOld = null
          return fn($event, 'end', $event.changedTouches[0].pageX, $event.changedTouches[0].pageY)
        }
      })
    },
    touchstart ($event) {
      this.callback('touchstart', $event)
    },
    touchmove ($event) {
      this.callback('touchmove', $event)
    },
    touchend ($event) {
      this.callback('touchend', $event)
    },
    addListener (type, callback) {
      this.__event[type] = function ($event) {
        if (typeof callback === 'function') {
          $event.touches = $event.changedTouches
          if (callback($event) === false) {
            $event.stopPropagation()
          }
        }
      }
    },
    callback (type, $event) {
      if (this.__event[type]) {
        this.__event[type]($event)
      }
    }
  },
  created () {
    this.__event = {}
  }
}
