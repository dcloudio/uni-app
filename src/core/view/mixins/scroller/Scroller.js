import { Scroll } from './Scroll'

function i (scroll, t, n) {
  function i (t, scroll, r, o) {
    if (!t || !t.cancelled) {
      r(scroll)
      var a = scroll.done()
      if (!a) {
        if (!t.cancelled) {
          t.id = requestAnimationFrame(i.bind(null, t, scroll, r, o))
        }
      }
      if (a && o) {
        o(scroll)
      }
    }
  }

  function r (scroll) {
    if (scroll && scroll.id) {
      cancelAnimationFrame(scroll.id)
    }
    if (scroll) {
      scroll.cancelled = true
    }
  }
  var o = {
    id: 0,
    cancelled: false
  }
  i(o, scroll, t, n)
  return {
    cancel: r.bind(null, o),
    model: scroll
  }
}

export function Scroller (element, options) {
  options = options || {}
  this._element = element
  this._options = options
  this._enableSnap = options.enableSnap || false
  this._itemSize = options.itemSize || 0
  this._enableX = options.enableX || false
  this._enableY = options.enableY || false
  this._shouldDispatchScrollEvent = !!options.onScroll
  if (this._enableX) {
    this._extent = (options.scrollWidth || this._element.offsetWidth) - this._element.parentElement.offsetWidth
    this._scrollWidth = options.scrollWidth
  } else {
    this._extent = (options.scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight
    this._scrollHeight = options.scrollHeight
  }

  this._position = 0
  this._scroll = new Scroll(this._extent)
  this._onTransitionEnd = this.onTransitionEnd.bind(this)
  this.updatePosition()
}

Scroller.prototype.onTouchStart = function () {
  this._startPosition = this._position
  this._lastChangePos = this._startPosition
  if (this._startPosition > 0) {
    this._startPosition /= 0.5
  } else {
    if (this._startPosition < -this._extent) {
      this._startPosition = (this._startPosition + this._extent) / 0.5 - this._extent
    }
  }
  if (this._animation) {
    this._animation.cancel()
    this._scrolling = false
  }
  this.updatePosition()
}
Scroller.prototype.onTouchMove = function (x, y) {
  var startPosition = this._startPosition
  if (this._enableX) {
    startPosition += x
  } else if (this._enableY) {
    startPosition += y
  }

  if (startPosition > 0) {
    startPosition *= 0.5
  } else if (startPosition < -this._extent) {
    startPosition = 0.5 * (startPosition + this._extent) - this._extent
  }
  this._position = startPosition
  this.updatePosition()
  this.dispatchScroll()
}
Scroller.prototype.onTouchEnd = function (e, r, o) {
  if (this._enableSnap && this._position > -this._extent && this._position < 0) {
    if (this._enableY && ((Math.abs(r) < this._itemSize && Math.abs(o.y) < 300) || Math.abs(o.y) < 150)) {
      this.snap()
      return
    }
    if (this._enableX && ((Math.abs(e) < this._itemSize && Math.abs(o.x) < 300) || Math.abs(o.x) < 150)) {
      this.snap()
      return
    }
  }
  if (this._enableX) {
    this._scroll.set(this._position, o.x)
  } else if (this._enableY) {
    this._scroll.set(this._position, o.y)
  }

  if (this._enableSnap) {
    var s = this._scroll._friction.x(100)
    var l = s % this._itemSize
    var c = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l
    if (c <= 0 && c >= -this._extent) {
      this._scroll.setVelocityByEnd(c)
    }
  }
  this._lastTime = Date.now()
  this._lastDelay = 0
  this._scrolling = true
  this._lastChangePos = this._position
  this._lastIdx = Math.floor(Math.abs(this._position / this._itemSize))
  this._animation = i(this._scroll, () => {
    var e = Date.now()
    var i = (e - this._scroll._startTime) / 1e3
    var r = this._scroll.x(i)
    this._position = r
    this.updatePosition()
    var o = this._scroll.dx(i)
    if (this._shouldDispatchScrollEvent && e - this._lastTime > this._lastDelay) {
      this.dispatchScroll()
      this._lastDelay = Math.abs(2e3 / o)
      this._lastTime = e
    }
  }, () => {
    if (this._enableSnap) {
      if (c <= 0 && c >= -this._extent) {
        this._position = c
        this.updatePosition()
      }
      if (typeof this._options.onSnap === 'function') {
        this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize))
      }
    }
    if (this._shouldDispatchScrollEvent) {
      this.dispatchScroll()
    }
    this._scrolling = false
  })
}
Scroller.prototype.onTransitionEnd = function () {
  this._element.style.transition = ''
  this._element.style.webkitTransition = ''
  this._element.removeEventListener('transitionend', this._onTransitionEnd)
  this._element.removeEventListener('webkitTransitionEnd', this._onTransitionEnd)
  if (this._snapping) {
    this._snapping = false
  }
  this.dispatchScroll()
}
Scroller.prototype.snap = function () {
  var e = this._itemSize
  var t = this._position % e
  var i = Math.abs(t) > this._itemSize / 2 ? this._position - (e - Math.abs(t)) : this._position - t
  if (this._position !== i) {
    this._snapping = true
    this.scrollTo(-i)
    if (typeof this._options.onSnap === 'function') {
      this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize))
    }
  }
}
Scroller.prototype.scrollTo = function (e, t) {
  if (this._animation) {
    this._animation.cancel()
    this._scrolling = false
  }
  if (typeof e === 'number') {
    this._position = -e
  }
  if (this._position < -this._extent) {
    this._position = -this._extent
  } else {
    if (this._position > 0) {
      this._position = 0
    }
  }
  this._element.style.transition = 'transform ' + (t || 0.2) + 's ease-out'
  this._element.style.webkitTransition = '-webkit-transform ' + (t || 0.2) + 's ease-out'
  this.updatePosition()
  this._element.addEventListener('transitionend', this._onTransitionEnd)
  this._element.addEventListener('webkitTransitionEnd', this._onTransitionEnd)
}
Scroller.prototype.dispatchScroll = function () {
  if (typeof this._options.onScroll === 'function' && Math.round(this._lastPos) !== Math.round(this._position)) {
    this._lastPos = this._position
    var e = {
      target: {
        scrollLeft: this._enableX ? -this._position : 0,
        scrollTop: this._enableY ? -this._position : 0,
        scrollHeight: this._scrollHeight || this._element.offsetHeight,
        scrollWidth: this._scrollWidth || this._element.offsetWidth,
        offsetHeight: this._element.parentElement.offsetHeight,
        offsetWidth: this._element.parentElement.offsetWidth
      }
    }
    this._options.onScroll(e)
  }
}
Scroller.prototype.update = function (e, t, n) {
  var i = 0
  var r = this._position
  if (this._enableX) {
    i = this._element.childNodes.length ? (t || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0
    this._scrollWidth = t
  } else {
    i = this._element.childNodes.length ? (t || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0
    this._scrollHeight = t
  }
  if (typeof e === 'number') {
    this._position = -e
  }
  if (this._position < -i) {
    this._position = -i
  } else {
    if (this._position > 0) {
      this._position = 0
    }
  }
  this._itemSize = n || this._itemSize
  this.updatePosition()
  if (r !== this._position) {
    this.dispatchScroll()
    if (typeof this._options.onSnap === 'function') {
      this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize))
    }
  }
  this._extent = i
  this._scroll._extent = i
}
Scroller.prototype.updatePosition = function () {
  var transform = ''
  if (this._enableX) {
    transform = 'translateX(' + this._position + 'px) translateZ(0)'
  } else {
    if (this._enableY) {
      transform = 'translateY(' + this._position + 'px) translateZ(0)'
    }
  }
  this._element.style.webkitTransform = transform
  this._element.style.transform = transform
}
Scroller.prototype.isScrolling = function () {
  return this._scrolling || this._snapping
}
