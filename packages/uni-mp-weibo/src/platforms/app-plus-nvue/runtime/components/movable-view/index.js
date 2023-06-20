import touchtrack from './touchtrack'

import {
  Decline,
  Friction,
  STD
} from './utils'

import {
  emitter
} from '../../mixins'

let requesting = false

function requestAnimationFrame (callback) {
  return setTimeout(callback, 16)
}

function cancelAnimationFrame (id) {
  clearTimeout(id)
}

function _requestAnimationFrame (e) {
  if (!requesting) {
    requesting = true
    requestAnimationFrame(function () {
      e()
      requesting = false
    })
  }
}

function v (a, b) {
  return +((1000 * a - 1000 * b) / 1000).toFixed(1)
}

function g (e, t, n) {
  const i = function (e) {
    if (e && e.id) {
      cancelAnimationFrame(e.id)
    }
    if (e) {
      e.cancelled = true
    }
  }
  const r = {
    id: 0,
    cancelled: false
  }
  function fn (n, i, r, o) {
    if (!n || !n.cancelled) {
      r(i)
      const a = e.done()
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

function getMovableView (weex) {
  const dom = weex.requireModule('dom')
  const animation = weex.requireModule('animation')

  return {
    name: 'MovableView',
    mixins: [touchtrack, emitter],
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
        scaleValueSync: this._getScaleNumber(this.scaleValue),
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
        const val = Number(this.damping)
        return isNaN(val) ? 20 : val
      },
      frictionNumber () {
        const val = Number(this.friction)
        return isNaN(val) || val <= 0 ? 2 : val
      },
      scaleMinNumber () {
        const val = Number(this.scaleMin)
        return isNaN(val) ? 0.5 : val
      },
      scaleMaxNumber () {
        const val = Number(this.scaleMax)
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
        this._setScaleValue(this._getScaleNumber(val))
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
      this._rect = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    },
    mounted: function () {
      this.touchtrack('_onTrack')
      setTimeout(() => {
        this._updateRect().then(() => {
          this.setParent()
        })
      }, 100)
      this._friction.reconfigure(1, this.frictionNumber)
      this._STD.reconfigure(1, 9 * Math.pow(this.dampingNumber, 2) / 40, this.dampingNumber)
    },
    methods: {
      _getPx (val) {
        // if (/\d+[ur]px$/i.test(val)) {
        //   return uni.upx2px(parseFloat(val))
        // }
        return Number(val) || 0
      },
      _getScaleNumber (val) {
        val = Number(val)
        return isNaN(val) ? 1 : val
      },
      _setX: function (val) {
        if (this.xMove) {
          if (val + this._scaleOffset.x === this._translateX) {
            return this._translateX
          }
          else {
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
          }
          else {
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
            this._checkCanMove = null
            this._firstMoveDirection = null
            this._isTouching = true
          }
        }
      },
      __handleTouchMove: function (event) {
        const self = this
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
                }
                else {
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
                }
                else {
                  this._checkCanMove = true
                }
              }
            }
          }
          this.__touchInfo.historyT.shift()
          this.__touchInfo.historyT.push(event.detail.timeStamp)

          if (!this._checkCanMove) {
            // event.preventDefault()
            let source = 'touch'
            if (x < this.minX) {
              if (this.outOfBounds) {
                source = 'touch-out-of-bounds'
                x = this.minX - this._declineX.x(this.minX - x)
              }
              else {
                x = this.minX
              }
            }
            else if (x > this.maxX) {
              if (this.outOfBounds) {
                source = 'touch-out-of-bounds'
                x = this.maxX + this._declineX.x(x - this.maxX)
              }
              else {
                x = this.maxX
              }
            }
            if (y < this.minY) {
              if (this.outOfBounds) {
                source = 'touch-out-of-bounds'
                y = this.minY - this._declineY.x(this.minY - y)
              }
              else {
                y = this.minY
              }
            }
            else {
              if (y > this.maxY) {
                if (this.outOfBounds) {
                  source = 'touch-out-of-bounds'
                  y = this.maxY + this._declineY.x(y - this.maxY)
                }
                else {
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
        const self = this
        if (!this._isScaling && !this.disabled && this._isTouching) {
          this._isTouching = false
          if (!this._checkCanMove && !this._revise('out-of-bounds') && this.inertia) {
            const xv = 1000 * (this.__touchInfo.historyX[1] - this.__touchInfo.historyX[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0])
            const yv = 1000 * (this.__touchInfo.historyY[1] - this.__touchInfo.historyY[0]) / (this.__touchInfo.historyT[1] - this.__touchInfo.historyT[0])
            this._friction.setV(xv, yv)
            this._friction.setS(this._translateX, this._translateY)
            const x0 = this._friction.delta().x
            const y0 = this._friction.delta().y
            let x = x0 + this._translateX
            let y = y0 + this._translateY
            if (x < this.minX) {
              x = this.minX
              y = this._translateY + (this.minX - this._translateX) * y0 / x0
            }
            else {
              if (x > this.maxX) {
                x = this.maxX
                y = this._translateY + (this.maxX - this._translateX) * y0 / x0
              }
            }
            if (y < this.minY) {
              y = this.minY
              x = this._translateX + (this.minY - this._translateY) * x0 / y0
            }
            else {
              if (y > this.maxY) {
                y = this.maxY
                x = this._translateX + (this.maxY - this._translateY) * x0 / y0
              }
            }
            this._friction.setEnd(x, y)
            this._FA = g(this._friction, function () {
              const t = self._friction.s()
              const x = t.x
              const y = t.y
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
        let outOfBounds = false
        if (x > this.maxX) {
          x = this.maxX
          outOfBounds = true
        }
        else {
          if (x < this.minX) {
            x = this.minX
            outOfBounds = true
          }
        }
        if (y > this.maxY) {
          y = this.maxY
          outOfBounds = true
        }
        else {
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
        if (!this.$parent.__isMounted) {
          return
        }
        if (this._FA) {
          this._FA.cancel()
        }
        if (this._SFA) {
          this._SFA.cancel()
        }
        const scale = this.scale ? this.scaleValueSync : 1
        this._updateOffset()
        this._updateWH(scale)
        this._updateBoundary()
        this._translateX = this.xSync + this._scaleOffset.x
        this._translateY = this.ySync + this._scaleOffset.y
        const limitXY = this._getLimitXY(this._translateX, this._translateY)
        const x = limitXY.x
        const y = limitXY.y
        this._setTransform(x, y, scale, '', true)
        this._updateOldScale(scale)
      },
      _updateOffset: function () {
        this._offset.x = this._rect.left - this.$parent.left
        this._offset.y = this._rect.top - this.$parent.top
      },
      _updateWH: function (scale) {
        scale = scale || this._scale
        scale = this._adjustScale(scale)
        const rect = this._rect
        this.height = rect.height / this._scale
        this.width = rect.width / this._scale
        const height = this.height * scale
        const width = this.width * scale
        this._scaleOffset.x = (width - this.width) / 2
        this._scaleOffset.y = (height - this.height) / 2
      },
      _updateBoundary: function () {
        const x = 0 - this._offset.x + this._scaleOffset.x
        const width = this.$parent.width - this.width - this._offset.x - this._scaleOffset.x
        this.minX = Math.min(x, width)
        this.maxX = Math.max(x, width)
        const y = 0 - this._offset.y + this._scaleOffset.y
        const height = this.$parent.height - this.height - this._offset.y - this._scaleOffset.y
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
        const self = this
        if (this.scale) {
          scale = this._adjustScale(scale)
          this._updateWH(scale)
          this._updateBoundary()
          const limitXY = this._getLimitXY(this._translateX, this._translateY)
          const x = limitXY.x
          const y = limitXY.y
          if (animat) {
            this._animationTo(x, y, scale, '', true, true)
          }
          else {
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
        const self = this
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
        const limitXY = this._getLimitXY(x, y)
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
          const data = self._STD.x()
          const x = data.x
          const y = data.y
          const scale = data.scale
          self._setTransform(x, y, scale, source, r, o)
        }, function () {
          self._SFA.cancel()
        })
      },
      _revise: function (source) {
        const limitXY = this._getLimitXY(this._translateX, this._translateY)
        const x = limitXY.x
        const y = limitXY.y
        const outOfBounds = limitXY.outOfBounds
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
            this.$trigger('change', {
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
          this.$trigger('scale', {
            x: x,
            y: y,
            scale: scale
          })
        }
        const transform = `translate(${x}px, ${y}px) scale(${scale})`
        animation.transition(this.$refs.el, {
          styles: {
            transform
          },
          duration: 0,
          delay: 0
        })
        this._translateX = x
        this._translateY = y
        this._scale = scale
      },
      _touchstart () {
        this.$parent.touchItem = this
      },
      _getComponentSize (el) {
        return new Promise((resolve) => {
          dom.getComponentRect(el, ({ size }) => {
            resolve(size)
          })
        })
      },
      _updateRect () {
        return this._getComponentSize(this.$refs.el).then(rect => {
          this._rect = rect
        })
      }
    },
    render (createElement) {
      const events = {
        touchstart: this._touchstart
        // touchend: this.touchend,
        // touchend: this.touchend
      }
      return createElement('div', this._g({
        ref: 'el',
        on: events,
        staticClass: ['uni-movable-view'],
        staticStyle: {
          transformOrigin: 'center'
        }
      }, this.$listeners), this.$slots.default, 2)
    },
    style: {
      'uni-movable-view': {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '10px',
        height: '10px'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('movable-view', getMovableView(weex))
}
