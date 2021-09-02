const addListenerToElement = function (element, type, callback, capture) {
  // 暂时忽略 capture
  element.addEventListener(type, $event => {
    if (typeof callback === 'function') {
      if (callback($event) === false) {
        $event.preventDefault()
        $event.stopPropagation()
      }
    }
  }, {
    capture,
    passive: false
  })
}

export default {
  beforeDestroy () {
    document.removeEventListener('mousemove', this.__mouseMoveEventListener)
    document.removeEventListener('mouseup', this.__mouseUpEventListener)
  },
  methods: {
    touchtrack: function (element, method, useCancel) {
      const self = this
      let x0 = 0
      let y0 = 0
      let x1 = 0
      let y1 = 0
      const fn = function ($event, state, x, y) {
        if (self[method]({
          target: $event.target,
          currentTarget: $event.currentTarget,
          preventDefault: $event.preventDefault.bind($event),
          stopPropagation: $event.stopPropagation.bind($event),
          touches: $event.touches,
          changedTouches: $event.changedTouches,
          detail: {
            state,
            x: x,
            y: y,
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
      let hasClickListenerOld
      let hasTouchStart
      let hasMouseDown
      addListenerToElement(element, 'touchstart', function ($event) {
        hasTouchStart = true
        if ($event.touches.length === 1 && !$eventOld) {
          $eventOld = $event
          x0 = x1 = $event.touches[0].pageX
          y0 = y1 = $event.touches[0].pageY
          return fn($event, 'start', x0, y0)
        }
      })
      addListenerToElement(element, 'mousedown', function ($event) {
        hasMouseDown = true
        if (!hasTouchStart && !$eventOld) {
          // TODO touches changedTouches
          $eventOld = $event
          x0 = x1 = $event.pageX
          y0 = y1 = $event.pageY
          return fn($event, 'start', x0, y0)
        }
      })
      addListenerToElement(element, 'touchmove', function ($event) {
        if ($event.touches.length === 1 && $eventOld) {
          const res = fn($event, 'move', $event.touches[0].pageX, $event.touches[0].pageY)
          x1 = $event.touches[0].pageX
          y1 = $event.touches[0].pageY
          return res
        }
      })

      // 阻止点击事件传播，处理拖拽和点击冲突，鼠标移动则添加监听，停止移动则移除监听
      const clickEventListener = this.__clickEventListener = function ($event) {
        $event.preventDefault()
        $event.stopPropagation()
      }

      const mouseMoveEventListener = this.__mouseMoveEventListener = function ($event) {
        if (!hasTouchStart && hasMouseDown && $eventOld) {
          // 存在鼠标移动，则在 document 上添加点击监听（好处是不用管具体使用拖拽的是什么元素）
          if (!hasClickListenerOld && (Math.abs(x1 - x0) > 2 || Math.abs(y1 - y0) > 2)) {
            document.addEventListener('click', clickEventListener, true)
            hasClickListenerOld = true
          }
          // TODO target currentTarget touches changedTouches
          const res = fn($event, 'move', $event.pageX, $event.pageY)
          x1 = $event.pageX
          y1 = $event.pageY
          return res
        }
      }
      document.addEventListener('mousemove', mouseMoveEventListener)
      addListenerToElement(element, 'touchend', function ($event) {
        if ($event.touches.length === 0 && $eventOld) {
          hasTouchStart = false
          $eventOld = null
          return fn($event, 'end', $event.changedTouches[0].pageX, $event.changedTouches[0].pageY)
        }
      })
      const mouseUpEventListener = this.__mouseUpEventListener = ($event) => {
        hasMouseDown = false
        if (!hasTouchStart && $eventOld) {
          // 鼠标抬起，存在监听，则 mouseup 结束后移除就监听事件
          if (hasClickListenerOld) {
            setTimeout(() => {
              document.removeEventListener('click', this.__clickEventListener, true)
              hasClickListenerOld = false
            }, 0)
          }
          // TODO target currentTarget touches changedTouches
          $eventOld = null
          return fn($event, 'end', $event.pageX, $event.pageY)
        }
      }
      document.addEventListener('mouseup', mouseUpEventListener)

      addListenerToElement(element, 'touchcancel', function ($event) {
        if ($eventOld) {
          hasTouchStart = false
          const $eventTemp = $eventOld
          $eventOld = null
          return fn($event, useCancel ? 'cancel' : 'end', $eventTemp.touches[0].pageX, $eventTemp.touches[0].pageY)
        }
      })
    }
  }
}
