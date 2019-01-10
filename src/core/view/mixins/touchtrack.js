var addListenerToElement = function (element, type, callback, r) {
  // 暂时忽略capture
  element.addEventListener(type, $event => {
    if (typeof callback === 'function') {
      if (callback($event) === false) {
        $event.preventDefault()
        $event.stopPropagation()
      }
    }
  }, {
    passive: false
  })
}

export default {
  methods: {
    touchtrack: function (element, method, useCancel) {
      var self = this
      var x0 = 0
      var y0 = 0
      var x1 = 0
      var y1 = 0
      var fn = function ($event, state, x, y) {
        if (self[method]({
          target: $event.target,
          currentTarget: $event.currentTarget,
          preventDefault: $event.preventDefault.bind($event),
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

      var $eventOld = null
      addListenerToElement(element, 'touchstart', function ($event) {
        if ($event.touches.length === 1 && !$eventOld) {
          $eventOld = $event
          x0 = x1 = $event.touches[0].pageX
          y0 = y1 = $event.touches[0].pageY
          return fn($event, 'start', x0, y0)
        }
      })
      addListenerToElement(element, 'touchmove', function ($event) {
        if ($event.touches.length === 1 && $eventOld) {
          var res = fn($event, 'move', $event.touches[0].pageX, $event.touches[0].pageY)
          x1 = $event.touches[0].pageX
          y1 = $event.touches[0].pageY
          return res
        }
      })
      addListenerToElement(element, 'touchend', function ($event) {
        if ($event.touches.length === 0 && $eventOld) {
          $eventOld = null
          return fn($event, 'end', $event.changedTouches[0].pageX, $event.changedTouches[0].pageY)
        }
      })
      addListenerToElement(element, 'touchcancel', function ($event) {
        if ($eventOld) {
          var $eventTemp = $eventOld
          $eventOld = null
          return fn($event, useCancel ? 'cancel' : 'end', $eventTemp.touches[0].pageX, $eventTemp.touches[0].pageY)
        }
      })
    }
  }
}
