<template>
  <uni-movable-view v-on="$listeners">
    <v-uni-resize-sensor @resize="setParent"/>
    <slot/>
  </uni-movable-view>
</template>
<script>
import touchtrack from 'uni-mixins/touchtrack'
import {
  Decline,
  Friction,
  STD
} from './utils'
import {
  disableScrollBounce
} from 'uni-shared'
var requesting = false

function _requestAnimationFrame (e) {
  if (!requesting) {
    requesting = true
    requestAnimationFrame(function () {
      e()
      requesting = false
    })
  }
}

function p (t, n) {
  if (t === n) {
    return 0
  }
  var i = t.offsetLeft
  return t.offsetParent ? (i += p(t.offsetParent, n)) : 0
}
function f (t, n) {
  if (t === n) {
    return 0
  }
  var i = t.offsetTop
  return t.offsetParent ? (i += f(t.offsetParent, n)) : 0
}
function v (a, b) {
  return +((1000 * a - 1000 * b) / 1000).toFixed(1)
}
function g (e, t, n) {
  var i = function (e) {
    if (e && e.id) {
      cancelAnimationFrame(e.id)
    }
    if (e) {
      e.cancelled = true
    }
  }
  var r = {
    id: 0,
    cancelled: false
  }
  function fn (n, i, r, o) {
    if (!n || !n.cancelled) {
      r(i)
      var a = e.done()
      if (!a) {
        if (!n.cancelled) {
          (n.id = requestAnimationFrame(fn.bind(null, n, i, r, o)))
        }
      }
      if (a && o) {
        o(i)
      }
    }
  }
  fn(r, e, t, n)
  return {
    cancel: i.bind(null, r),
    model: e
  }
}

export default {
  name: 'MovableView',
  mixins: [touchtrack],
  props: {
    direction: {
      type: String,
      default: 'none'
    },
    inertia: {
      type: [Boolean, String],
      default: false
    },
    outOfBounds: {
      type: [Boolean, String],
      default: false
    },
    x: {
      type: [Number, String],
      default: 0
    },
    y: {
      type: [Number, String],
      default: 0
    },
    damping: {
      type: [Number, String],
      default: 20
    },
    friction: {
      type: [Number, String],
      default: 2
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    scale: {
      type: [Boolean, String],
      default: false
    },
    scaleMin: {
      type: [Number, String],
      default: 0.5
    },
    scaleMax: {
      type: [Number, String],
      default: 10
    },
    scaleValue: {
      type: [Number, String],
      default: 1
    },
    animation: {
      type: [Boolean, String],
      default: true
    }
  },
  data () {
    return {
      xSync: this._getPx(this.x),
      ySync: this._getPx(this.y),
      scaleValueSync: Number(this.scaleValue) || 1,
      width: 0,
      height: 0,
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0
    }
  },
  computed: {
    dampingNumber () {
      var val = Number(this.damping)
      return isNaN(val) ? 20 : val
    },
    frictionNumber () {
      var val = Number(this.friction)
      return isNaN(val) || val <= 0 ? 2 : val
    },
    scaleMinNumber () {
      var val = Number(this.scaleMin)
      return isNaN(val) ? 0.5 : val
    },
    scaleMaxNumber () {
      var val = Number(this.scaleMax)
      return isNaN(val) ? 10 : val
    },
    xMove () {
      return this.direction === 'all' || this.direction === 'horizontal'
    },
    yMove () {
      return this.direction === 'all' || this.direction === 'vertical'
    }
  },
  watch: {
    x (val) {
      this.xSync = this._getPx(val)
    },
    xSync (val) {
      this._setX(val)
    },
    y (val) {
      this.ySync = this._getPx(val)
    },
    ySync (val) {
      this._setY(val)
    },
    scaleValue (val) {
      this.scaleValueSync = Number(val) || 0
    },
    scaleValueSync (val) {
      this._setScaleValue(val)
    },
    scaleMinNumber () {
      this._setScaleMinOrMax()
    },
    scaleMaxNumber () {
      this._setScaleMinOrMax()
    }
  },
  created: function () {
    this._offset = {
      x: 0,
      y: 0
    }
    this._scaleOffset = {
      x: 0,
      y: 0
    }
    this._translateX = 0
    this._translateY = 0
    this._scale = 1
    this._oldScale = 1

    this._STD = new STD(1, 9 * Math.pow(this.dampingNumber, 2) / 40, this.dampingNumber)
    this._friction = new Friction(1, this.frictionNumber)
    this._declineX = new Decline()
    this._declineY = new Decline()
    this.__touchInfo = {
      historyX: [0, 0],
      historyY: [0, 0],
      historyT: [0, 0]
    }
  },
  mounted: function () {
    this.touchtrack(this.$el, '_onTrack')
    this.setParent()
    this._friction.reconfigure(1, this.frictionNumber)
    this._STD.reconfigure(1, 9 * Math.pow(this.dampingNumber, 2) / 40, this.dampingNumber)
    this.$el.style.transformOrigin = 'center'
  },
  methods: {
    _getPx (val) {
      if (/\d+[ur]px$/i.test(val)) {
        return uni.upx2px(parseFloat(val))
      }
      return Number(val) || 0
    },
    _setX: function (val) {
      if (this.xMove) {
        if (val + this._scaleOffset.x === this._translateX) {
          return this._translateX
        } else {
          if (this._SFA) {
            this._SFA.cancel()
          }
          this._animationTo(val + this._scaleOffset.x, this.ySync + this._scaleOffset.y, this._scale)
        }
      }
      return val
    },
    _setY: function (val) {
      if (this.yMove) {
        if (val + this._scaleOffset.y === this._translateY) {
          return this._translateY
        } else {
          if (this._SFA) {
            this._SFA.cancel()
          }
          this._animationTo(this.xSync + this._scaleOffset.x, val + this._scaleOffset.y, this._scale)
        }
      }
      return val
    },
    _setScaleMinOrMax: function () {
      if (!this.scale) {
        return false
      }
      this._updateScale(this._scale, true)
      this._updateOldScale(this._scale)
    },
    _setScaleValue: function (scale) {
      if (!this.scale) {
        return false
      }
      scale = this._adjustScale(scale)
      this._updateScale(scale, true)
      this._updateOldScale(scale)
      return scale
    },
    __handleTouchStart: function () {
      if (!this._isScaling) {
        if (!this.disabled) {
          disableScrollBounce({
            disable: true
          })
          if (this._FA) {
            this._FA.cancel()
          }
          if (this._SFA) {
            this._SFA.cancel()
          }
          this.__touchInfo.historyX = [0, 0]
          this.__touchInfo.historyY = [0, 0]
          this.__touchInfo.historyT = [0, 0]
          if (this.xMove) {
            this.__baseX = this._translateX
          }
          if (this.yMove) {
            this.__baseY = this._translateY
          }
          this.$el.style.willChange = 'transform'
          this._checkCanMove = null
          this._firstMoveDirection = null
          this._isTouching = true
        }
      }
    },
    __handleTouchMove: function (event) {
      var self = this
      if (!this._isScaling && !this.disabled && this._isTouching) {
        let x = this._translateX
        let y = this._translateY
        if (this._firstMoveDirection === null) {
          this._firstMoveDirection = Math.abs(event.detail.dx / event.detail.dy) > 1 ? 'htouchmove' : 'vtouchmove'
        }
        if (this.xMove) {
          x = event.detail.dx + this.__baseX
          this.__touchInfo.historyX.shift()
          this.__touchInfo.historyX.push(x)
          if (!this.yMove) {
            if (!null !== this._checkCanMove) {
              if (Math.abs(event.detail.dx / event.detail.dy) > 1) {
                this._checkCanMove = false
              } else {
                this._checkCanMove = true
              }
            }
          }
        }
        if (this.yMove) {
          y = event.detail.dy + this.__baseY
          this.__touchInfo.historyY.shift()
          this.__touchInfo.historyY.push(y)
          if (!this.xMove) {
            if (!null !== this._checkCanMove) {
              if (Math.abs(event.detail.dy / event.detail.dx) > 1) {
                this._checkCanMove = false
              } else {
                this._checkCanMove = true
              }
            }
          }
        }
        this.__touchInfo.historyT.shift()
        this.__touchInfo.historyT.push(event.detail.timeStamp)

        if (!this._checkCanMove) {
          event.preventDefault()
          let source = 'touch'
          if (x < this.minX) {
            if (this.outOfBounds) {
              source = 'touch-out-of-bounds'
              x = this.minX - this._declineX.x(this.minX - x)
            } else {
              x = this.minX
            }
          } else if (x > this.maxX) {
            if (this.outOfBounds) {
              source = 'touch-out-of-bounds'
              x = this.maxX + this._declineX.x(x - this.maxX)
            } else {
              x = this.maxX
            }
          }
          if (y < this.minY) {
            if (this.outOfBounds) {
              source = 'touch-out-of-bounds'
              y = this.minY - this._declineY.x(this.minY - y)
            } else {
              y = this.minY
            }
          } else {
            if (y > this.maxY) {
              if (this.outOfBounds) {
                source = 'touch-out-of-bounds'
                y = this.maxY + this._declineY.x(y - this.maxY)
              } else {
                y = this.maxY
              }
            }
          }
          _requestAnimationFrame(function () {
            self._setTransform(x, y, self._scale, source)
          })
        }
      }
    },
    __handleTouchEnd: function () {
      var self = this
      if (!this._isScaling && !this.disabled && this._isTouching) {
        disableScrollBounce({
          disable: true
        })
        this.$el.style.willChange = 'auto'
        this._isTouching = false
        if (!this._checkCanMove && !this._revise('out-of-bounds') && this.inertia) {
          let xv = 1000 * (this.__touchInfo.historyX[1] - this.__touchInfo.historyX[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0])
          let yv = 1000 * (this.__touchInfo.historyY[1] - this.__touchInfo.historyY[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0])
          this._friction.setV(xv, yv)
          this._friction.setS(this._translateX, this._translateY)
          let x0 = this._friction.delta().x
          let y0 = this._friction.delta().y
          let x = x0 + this._translateX
          let y = y0 + this._translateY
          if (x < this.minX) {
            x = this.minX
            y = this._translateY + (this.minX - this._translateX) * y0 / x0
          } else {
            if (x > this.maxX) {
              x = this.maxX
              y = this._translateY + (this.maxX - this._translateX) * y0 / x0
            }
          }
          if (y < this.minY) {
            y = this.minY
            x = this._translateX + (this.minY - this._translateY) * x0 / y0
          } else {
            if (y > this.maxY) {
              y = this.maxY
              x = this._translateX + (this.maxY - this._translateY) * x0 / y0
            }
          }
          this._friction.setEnd(x, y)
          this._FA = g(this._friction, function () {
            var t = self._friction.s()
            var x = t.x
            var y = t.y
            self._setTransform(x, y, self._scale, 'friction')
          }, function () {
            self._FA.cancel()
          })
        }
      }
    },
    _onTrack: function (event) {
      switch (event.detail.state) {
        case 'start':
          this.__handleTouchStart()
          break
        case 'move':
          this.__handleTouchMove(event)
          break
        case 'end':
          this.__handleTouchEnd()
      }
    },
    _getLimitXY: function (x, y) {
      var outOfBounds = false
      if (x > this.maxX) {
        x = this.maxX
        outOfBounds = true
      } else {
        if (x < this.minX) {
          x = this.minX
          outOfBounds = true
        }
      }
      if (y > this.maxY) {
        y = this.maxY
        outOfBounds = true
      } else {
        if (y < this.minY) {
          y = this.minY
          outOfBounds = true
        }
      }
      return {
        x,
        y,
        outOfBounds
      }
    },
    setParent: function () {
      if (!this.$parent._isMounted) {
        return
      }
      if (this._FA) {
        this._FA.cancel()
      }
      if (this._SFA) {
        this._SFA.cancel()
      }
      var scale = this.scale ? this.scaleValueSync : 1
      this._updateOffset()
      this._updateWH(scale)
      this._updateBoundary()
      this._translateX = this.xSync + this._scaleOffset.x
      this._translateY = this.ySync + this._scaleOffset.y
      var limitXY = this._getLimitXY(this._translateX, this._translateY)
      var x = limitXY.x
      var y = limitXY.y
      this._setTransform(x, y, scale, '', true)
      this._updateOldScale(scale)
    },
    _updateOffset: function () {
      this._offset.x = p(this.$el, this.$parent.$el)
      this._offset.y = f(this.$el, this.$parent.$el)
    },
    _updateWH: function (scale) {
      scale = scale || this._scale
      scale = this._adjustScale(scale)
      var rect = this.$el.getBoundingClientRect()
      this.height = rect.height / this._scale
      this.width = rect.width / this._scale
      var height = this.height * scale
      var width = this.width * scale
      this._scaleOffset.x = (width - this.width) / 2
      this._scaleOffset.y = (height - this.height) / 2
    },
    _updateBoundary: function () {
      var x = 0 - this._offset.x + this._scaleOffset.x
      var width = this.$parent.width - this.width - this._offset.x - this._scaleOffset.x
      this.minX = Math.min(x, width)
      this.maxX = Math.max(x, width)
      var y = 0 - this._offset.y + this._scaleOffset.y
      var height = this.$parent.height - this.height - this._offset.y - this._scaleOffset.y
      this.minY = Math.min(y, height)
      this.maxY = Math.max(y, height)
    },
    _beginScale: function () {
      this._isScaling = true
    },
    _endScale: function () {
      this._isScaling = false
      this._updateOldScale(this._scale)
    },
    _setScale: function (scale) {
      if (this.scale) {
        scale = this._adjustScale(scale)
        scale = this._oldScale * scale
        this._beginScale()
        this._updateScale(scale)
      }
    },
    _updateScale: function (scale, animat) {
      var self = this
      if (this.scale) {
        scale = this._adjustScale(scale)
        this._updateWH(scale)
        this._updateBoundary()
        let limitXY = this._getLimitXY(this._translateX, this._translateY)
        let x = limitXY.x
        let y = limitXY.y
        if (animat) {
          this._animationTo(x, y, scale, '', true, true)
        } else {
          _requestAnimationFrame(function () {
            self._setTransform(x, y, scale, '', true, true)
          })
        }
      }
    },
    _updateOldScale: function (scale) {
      this._oldScale = scale
    },
    _adjustScale: function (scale) {
      scale = Math.max(0.5, this.scaleMinNumber, scale)
      scale = Math.min(10, this.scaleMaxNumber, scale)
      return scale
    },
    _animationTo: function (x, y, scale, source, r, o) {
      var self = this
      if (this._FA) {
        this._FA.cancel()
      }
      if (this._SFA) {
        this._SFA.cancel()
      }
      if (!this.xMove) {
        x = this._translateX
      }
      if (!this.yMove) {
        y = this._translateY
      }
      if (!this.scale) {
        scale = this._scale
      }
      var limitXY = this._getLimitXY(x, y)
      x = limitXY.x
      y = limitXY.y
      if (!this.animation) {
        this._setTransform(x, y, scale, source, r, o)
        return
      }
      this._STD._springX._solution = null
      this._STD._springY._solution = null
      this._STD._springScale._solution = null
      this._STD._springX._endPosition = this._translateX
      this._STD._springY._endPosition = this._translateY
      this._STD._springScale._endPosition = this._scale
      this._STD.setEnd(x, y, scale, 1)
      this._SFA = g(this._STD, function () {
        var data = self._STD.x()
        var x = data.x
        var y = data.y
        var scale = data.scale
        self._setTransform(x, y, scale, source, r, o)
      }, function () {
        self._SFA.cancel()
      })
    },
    _revise: function (source) {
      var limitXY = this._getLimitXY(this._translateX, this._translateY)
      var x = limitXY.x
      var y = limitXY.y
      var outOfBounds = limitXY.outOfBounds
      if (outOfBounds) {
        this._animationTo(x, y, this._scale, source)
      }
      return outOfBounds
    },
    _setTransform: function (x, y, scale, source = '', r, o) {
      if (!(x !== null && x.toString() !== 'NaN' && typeof x === 'number')) {
        x = this._translateX || 0
      }
      if (!(y !== null && y.toString() !== 'NaN' && typeof y === 'number')) {
        y = this._translateY || 0
      }
      x = Number(x.toFixed(1))
      y = Number(y.toFixed(1))
      scale = Number(scale.toFixed(1))
      if (!(this._translateX === x && this._translateY === y)) {
        if (!r) {
          this.$trigger('change', {}, {
            x: v(x, this._scaleOffset.x),
            y: v(y, this._scaleOffset.y),
            source: source
          })
        }
      }
      if (!this.scale) {
        scale = this._scale
      }
      scale = this._adjustScale(scale)
      scale = +scale.toFixed(3)
      if (o && scale !== this._scale) {
        this.$trigger('scale', {}, {
          x: x,
          y: y,
          scale: scale
        })
      }
      var transform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0px) scale(' + scale + ')'
      this.$el.style.transform = transform
      this.$el.style.webkitTransform = transform
      this._translateX = x
      this._translateY = y
      this._scale = scale
    }
  }
}
</script>
<style>
uni-movable-view {
  display: inline-block;
  width: 10px;
  height: 10px;
  top: 0px;
  left: 0px;
  position: absolute;
  cursor: grab;
}

uni-movable-view[hidden] {
  display: none;
}
</style>
