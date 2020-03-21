
<script>
import touchtrack from 'uni-mixins/touchtrack'

function deepClone (vnodes, createElement) {
  function cloneVNode (vnode) {
    var clonedChildren = vnode.children && vnode.children.map(cloneVNode)
    var cloned = createElement(vnode.tag, vnode.data, clonedChildren)
    cloned.text = vnode.text
    cloned.isComment = vnode.isComment
    cloned.componentOptions = vnode.componentOptions
    cloned.elm = vnode.elm
    cloned.context = vnode.context
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    return cloned
  }

  return vnodes.map(cloneVNode)
}

export default {
  name: 'Swiper',
  mixins: [touchtrack],
  props: {
    indicatorDots: {
      type: [Boolean, String],
      default: false
    },
    vertical: {
      type: [Boolean, String],
      default: false
    },
    autoplay: {
      type: [Boolean, String],
      default: false
    },
    circular: {
      type: [Boolean, String],
      default: false
    },
    interval: {
      type: [Number, String],
      default: 5e3
    },
    duration: {
      type: [Number, String],
      default: 500
    },
    current: {
      type: [Number, String],
      default: 0
    },
    indicatorColor: {
      type: String,
      default: ''
    },
    indicatorActiveColor: {
      type: String,
      default: ''
    },
    previousMargin: {
      type: String,
      default: ''
    },
    nextMargin: {
      type: String,
      default: ''
    },
    currentItemId: {
      type: String,
      default: ''
    },
    skipHiddenItemLayout: {
      type: [Boolean, String],
      default: false
    },
    displayMultipleItems: {
      type: [Number, String],
      default: 1
    },
    disableTouch: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      currentSync: Math.round(this.current) || 0,
      currentItemIdSync: this.currentItemId || '',
      userTracking: false,
      currentChangeSource: '',
      items: []
    }
  },
  computed: {
    intervalNumber () {
      const interval = Number(this.interval)
      return isNaN(interval) ? 5e3 : interval
    },
    durationNumber () {
      const duration = Number(this.duration)
      return isNaN(duration) ? 500 : duration
    },
    displayMultipleItemsNumber () {
      const displayMultipleItems = Math.round(this.displayMultipleItems)
      return isNaN(displayMultipleItems) ? 1 : displayMultipleItems
    },
    slidesStyle () {
      var style = {}
      if (this.nextMargin || this.previousMargin) {
        style = this.vertical ? {
          left: 0,
          right: 0,
          top: this._upx2px(this.previousMargin),
          bottom: this._upx2px(this.nextMargin)
        } : {
          top: 0,
          bottom: 0,
          left: this._upx2px(this.previousMargin),
          right: this._upx2px(this.nextMargin)
        }
      }
      return style
    },
    slideFrameStyle () {
      var value = Math.abs(100 / this.displayMultipleItemsNumber) + '%'
      return {
        width: this.vertical ? '100%' : value,
        height: !this.vertical ? '100%' : value
      }
    },
    circularEnabled () {
      return this.circular && this.items.length > this.displayMultipleItemsNumber
    }
  },
  watch: {
    vertical () {
      this._resetLayout()
    },
    circular () {
      this._resetLayout()
    },
    intervalNumber (val) {
      if (this._timer) {
        this._cancelSchedule()
        this._scheduleAutoplay()
      }
    },
    current (val) {
      this._currentCheck()
    },
    currentSync (val) {
      this._currentChanged(val)
      this.$emit('update:current', val)
    },
    currentItemId (val) {
      this._currentCheck()
    },
    currentItemIdSync (val) {
      this.$emit('update:currentItemId', val)
    },
    displayMultipleItemsNumber () {
      this._resetLayout()
    }
  },
  created () {
    this._invalid = true
    this._viewportPosition = 0
    this._viewportMoveRatio = 1
    this._animating = null
    this._requestedAnimation = false
    this._userDirectionChecked = false
    this._contentTrackViewport = 0
    this._contentTrackSpeed = 0
    this._contentTrackT = 0
  },
  mounted () {
    this._currentCheck()
    this.touchtrack(this.$refs.slidesWrapper, '_handleContentTrack', true)
    this._resetLayout()
    this.$watch(() => {
      return this.autoplay && !this.userTracking
    }, this._inintAutoplay)
    this._inintAutoplay(this.autoplay && !this.userTracking)
    this.$watch('items.length', this._resetLayout)
  },
  beforeDestroy () {
    this._cancelSchedule()
    cancelAnimationFrame(this._animationFrame)
  },
  methods: {
    _inintAutoplay (enable) {
      if (enable) {
        this._scheduleAutoplay()
      } else {
        this._cancelSchedule()
      }
    },
    /**
     * 页面变更检查和同步
     */
    _currentCheck () {
      var current = -1
      if (this.currentItemId) {
        for (let i = 0, items = this.items; i < items.length; i++) {
          let componentInstance = items[i].componentInstance
          if (componentInstance && componentInstance.itemId === this.currentItemId) {
            current = i
            break
          }
        }
      }
      if (current < 0) {
        current = Math.round(this.current) || 0
      }
      current = current < 0 ? 0 : current
      if (this.currentSync !== current) {
        this.currentChangeSource = ''
        this.currentSync = current
      }
    },
    _itemReady (vnode, callback) {
      if (vnode.componentInstance && vnode.componentInstance._isMounted) {
        callback()
      } else {
        vnode._callbacks = vnode._callbacks || []
        vnode._callbacks.push(callback)
      }
    },
    /**
     * 当前页面变更
     */
    _currentChanged (current) {
      var source = this.currentChangeSource
      this.currentChangeSource = ''
      if (!source) {
        this._animateViewport(current, '', 0)
      }
      var item = this.items[current]
      if (item) {
        this._itemReady(item, () => {
          var currentItemId = this.currentItemIdSync = item.componentInstance.itemId || ''
          this.$trigger('change', {}, {
            current: this.currentSync,
            currentItemId,
            source
          })
        })
      }
    },
    /**
     * 自动播放
     */
    _scheduleAutoplay () {
      var self = this
      this._cancelSchedule()
      function timer () {
        self._timer = null
        self.currentChangeSource = 'autoplay'
        if (self.circularEnabled) {
          self.currentSync = self._normalizeCurrentValue(self.currentSync + 1)
        } else {
          self.currentSync = self.currentSync + self.displayMultipleItemsNumber < self.items.length ? self.currentSync + 1 : 0
        }
        self._animateViewport(self.currentSync, 'autoplay', self.circularEnabled ? 1 : 0)
        self._timer = setTimeout(timer, self.intervalNumber)
      }
      if (!(!this._isMounted || this._invalid || this.items.length <= this.displayMultipleItemsNumber)) {
        this._timer = setTimeout(timer, this.intervalNumber)
      }
    },
    /**
     * 清除定时器
     */
    _cancelSchedule () {
      if (this._timer) {
        clearTimeout(this._timer)
        this._timer = null
      }
    },
    /**
     * 检查当前页值
     */
    _normalizeCurrentValue (current) {
      var length = this.items.length
      if (!length) {
        return -1
      }
      var index = (Math.round(current) % length + length) % length
      if (this.circularEnabled) {
        if (length <= this.displayMultipleItemsNumber) {
          return 0
        }
      } else if (index > length - this.displayMultipleItemsNumber) {
        return length - this.displayMultipleItemsNumber
      }
      return index
    },
    _upx2px (val) {
      if (/\d+[ur]px$/i.test(val)) {
        val.replace(/\d+[ur]px$/i, text => {
          return `${uni.upx2px(parseFloat(text))}px`
        })
      }
      return val || ''
    },
    /**
     * 重新布局
     */
    _resetLayout () {
      if (this._isMounted) {
        this._cancelSchedule()
        this._endViewportAnimation()
        var items = this.items

        for (var i = 0; i < items.length; i++) {
          this._updateItemPos(i, i)
        }
        this._viewportMoveRatio = 1
        if (this.displayMultipleItemsNumber === 1 && items.length) {
          var itemRect = items[0].componentInstance.$el.getBoundingClientRect()
          var slideFrameRect = this.$refs.slideFrame.getBoundingClientRect()
          this._viewportMoveRatio = itemRect.width / slideFrameRect.width
          if (!(this._viewportMoveRatio > 0 && this._viewportMoveRatio < 1)) {
            this._viewportMoveRatio = 1
          }
        }
        var position = this._viewportPosition
        this._viewportPosition = -2
        var current = this.currentSync
        if (current >= 0) {
          this._invalid = false
          if (this.userTracking) {
            this._updateViewport(position + current - this._contentTrackViewport)
            this._contentTrackViewport = current
          } else {
            this._updateViewport(current)
            if (this.autoplay) {
              this._scheduleAutoplay()
            }
          }
        } else {
          this._invalid = true
          this._updateViewport(-this.displayMultipleItemsNumber - 1)
        }
      }
    },
    _checkCircularLayout (e) {
      if (!this._invalid) {
        for (var items = this.items, n = items.length, i = e + this.displayMultipleItemsNumber, r = 0; r < n; r++) {
          var item = items[r]
          var _position = item._position
          var s = Math.floor(e / n) * n + r
          var l = s + n
          var c = s - n
          var u = Math.max(e - (s + 1), s - i, 0)
          var d = Math.max(e - (l + 1), l - i, 0)
          var h = Math.max(e - (c + 1), c - i, 0)
          var p = Math.min(u, d, h)
          var f = [s, l, c][[u, d, h].indexOf(p)]
          if (_position !== f) {
            this._updateItemPos(r, f)
          }
        }
      }
    },
    _updateItemPos (current, position) {
      var x = this.vertical ? '0' : 100 * position + '%'
      var y = this.vertical ? 100 * position + '%' : '0'
      var transform = 'translate(' + x + ', ' + y + ') translateZ(0)'
      var item = this.items[current]
      this._itemReady(item, () => {
        var el = item.componentInstance.$el
        el.style['-webkit-transform'] = transform
        el.style.transform = transform
        el._position = position
      })
    },
    _updateViewport (index) {
      if (!(Math.floor(2 * this._viewportPosition) === Math.floor(2 * index) && Math.ceil(2 * this._viewportPosition) === Math.ceil(2 * index))) {
        if (this.circularEnabled) {
          this._checkCircularLayout(index)
        }
      }

      var x = this.vertical ? '0' : 100 * -index * this._viewportMoveRatio + '%'
      var y = this.vertical ? 100 * -index * this._viewportMoveRatio + '%' : '0'
      var transform = 'translate(' + x + ', ' + y + ') translateZ(0)'
      var slideFrame = this.$refs.slideFrame
      if (slideFrame) {
        slideFrame.style['-webkit-transform'] = transform
        slideFrame.style.transform = transform
      }
      this._viewportPosition = index
      if (!this._transitionStart) {
        if (index % 1 === 0) {
          return
        }
        this._transitionStart = index
      }
      index -= Math.floor(this._transitionStart)
      if (index <= -(this.items.length - 1)) {
        index += this.items.length
      } else if (index >= this.items.length) {
        index -= this.items.length
      }
      index = this._transitionStart % 1 > 0.5 || this._transitionStart < 0 ? index - 1 : index
      this.$trigger('transition', {}, {
        dx: this.vertical ? 0 : index * slideFrame.offsetWidth,
        dy: this.vertical ? index * slideFrame.offsetHeight : 0
      })
    },
    _animateFrameFuncProto () {
      if (!this._animating) {
        this._requestedAnimation = false
        return
      }
      var _animating = this._animating
      var toPos = _animating.toPos
      var acc = _animating.acc
      var endTime = _animating.endTime
      var source = _animating.source
      var time = endTime - Date.now()
      if (time <= 0) {
        this._updateViewport(toPos)
        this._animating = null
        this._requestedAnimation = false
        this._transitionStart = null
        var item = this.items[this.currentSync]
        if (item) {
          this._itemReady(item, () => {
            var currentItemId = item.componentInstance.itemId || ''
            this.$trigger('animationfinish', {}, {
              current: this.currentSync,
              currentItemId,
              source
            })
          })
        }
        return
      }
      var s = acc * time * time / 2
      var l = toPos + s
      this._updateViewport(l)
      this._animationFrame = requestAnimationFrame(this._animateFrameFuncProto.bind(this))
    },
    _animateViewport (current, source, n) {
      this._cancelViewportAnimation()
      var duration = this.durationNumber
      var length = this.items.length
      var position = this._viewportPosition
      if (this.circularEnabled) {
        if (n < 0) {
          for (; position < current;) {
            position += length
          }
          for (; position - length > current;) {
            position -= length
          }
        } else if (n > 0) {
          for (; position > current;) {
            position -= length
          }
          for (; position + length < current;) {
            position += length
          }
        } else {
          for (; position + length < current;) {
            position += length
          }
          for (; position - length > current;) {
            position -= length
          }
          if (position + length - current < current - position) {
            position += length
          }
        }
      }

      this._animating = {
        toPos: current,
        acc: 2 * (position - current) / (duration * duration),
        endTime: Date.now() + duration,
        source: source
      }
      if (!this._requestedAnimation) {
        this._requestedAnimation = true
        this._animationFrame = requestAnimationFrame(this._animateFrameFuncProto.bind(this))
      }
    },
    _cancelViewportAnimation () {
      this._animating = null
    },
    /**
     * 结束动画
     */
    _endViewportAnimation () {
      if (this._animating) {
        this._updateViewport(this._animating.toPos)
        this._animating = null
      }
    },
    _handleTrackStart () {
      this._cancelSchedule()
      this._contentTrackViewport = this._viewportPosition
      this._contentTrackSpeed = 0
      this._contentTrackT = Date.now()
      this._cancelViewportAnimation()
    },
    _handleTrackMove (data) {
      var self = this
      var contentTrackT = this._contentTrackT
      this._contentTrackT = Date.now()
      var length = this.items.length
      var other = length - this.displayMultipleItemsNumber
      function calc (val) {
        return 0.5 - 0.25 / (val + 0.5)
      }

      function move (oldVal, newVal) {
        var val = self._contentTrackViewport + oldVal
        self._contentTrackSpeed = 0.6 * self._contentTrackSpeed + 0.4 * newVal
        if (!self.circularEnabled) {
          if (val < 0 || val > other) {
            if (val < 0) {
              val = -calc(-val)
            } else {
              if (val > other) {
                val = other + calc(val - other)
              }
            }
            self._contentTrackSpeed = 0
          }
        }
        self._updateViewport(val)
      }
      var time = (this._contentTrackT - contentTrackT) || 1
      if (this.vertical) {
        move(-data.dy / this.$refs.slideFrame.offsetHeight, -data.ddy / time)
      } else {
        move(-data.dx / this.$refs.slideFrame.offsetWidth, -data.ddx / time)
      }
    },
    _handleTrackEnd (isCancel) {
      this.userTracking = false
      var t = this._contentTrackSpeed / Math.abs(this._contentTrackSpeed)
      var n = 0
      if (!isCancel && Math.abs(this._contentTrackSpeed) > 0.2) {
        n = 0.5 * t
      }
      var current = this._normalizeCurrentValue(this._viewportPosition + n)
      if (isCancel) {
        this._updateViewport(this._contentTrackViewport)
      } else {
        this.currentChangeSource = 'touch'
        this.currentSync = current
        this._animateViewport(current, 'touch', n !== 0 ? n : current === 0 && (this.circularEnabled && this._viewportPosition >= 1) ? 1 : 0)
      }
    },
    _handleContentTrack (e) {
      if (this.disableTouch) {
        return
      }
      if (!this._invalid) {
        if (e.detail.state === 'start') {
          this.userTracking = true
          this._userDirectionChecked = false
          return this._handleTrackStart()
        }
        // fixed by xxxxxx
        if (e.detail.state === 'end') {
          return this._handleTrackEnd(false)
        }
        if (e.detail.state === 'cancel') {
          return this._handleTrackEnd(true)
        }
        if (this.userTracking) {
          if (!this._userDirectionChecked) {
            this._userDirectionChecked = true
            var t = Math.abs(e.detail.dx)
            var n = Math.abs(e.detail.dy)
            if (t >= n && this.vertical) {
              this.userTracking = false
            } else {
              if (t <= n && !this.vertical) {
                this.userTracking = false
              }
            }
            if (!this.userTracking) {
              if (this.autoplay) {
                this._scheduleAutoplay()
              }
              return
            }
          }
          this._handleTrackMove(e.detail)
          return false
        }
      }
    }
  },
  render (createElement) {
    var slidesDots = []
    var swiperItems = []
    if (this.$slots.default) {
      deepClone(this.$slots.default, createElement).forEach(vnode => {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'v-uni-swiper-item') {
          swiperItems.push(vnode)
        }
      })
    }
    for (let index = 0, length = swiperItems.length; index < length; index++) {
      let currentSync = this.currentSync
      slidesDots.push(createElement('div', {
        on: {
          click: () => {
            this._animateViewport(this.currentSync = index, this.currentChangeSource = 'click', this.circularEnabled ? 1 : 0)
          }
        },
        class: {
          'uni-swiper-dot': true,
          'uni-swiper-dot-active': (index < currentSync + this.displayMultipleItemsNumber && index >= currentSync) || (index < currentSync + this.displayMultipleItemsNumber - length)
        },
        style: {
          'background': index === currentSync ? this.indicatorActiveColor : this.indicatorColor
        }
      }))
    }
    this.items = swiperItems
    var slidesWrapperChild = [createElement('div', {
      ref: 'slides',
      style: this.slidesStyle,
      'class': 'uni-swiper-slides'
    }, [
      createElement('div', {
        ref: 'slideFrame',
        class: 'uni-swiper-slide-frame',
        style: this.slideFrameStyle
      }, swiperItems)
    ])]
    if (this.indicatorDots) {
      slidesWrapperChild.push(createElement('div', {
        ref: 'slidesDots',
        'class': ['uni-swiper-dots', this.vertical ? 'uni-swiper-dots-vertical' : 'uni-swiper-dots-horizontal']
      }, slidesDots))
    }

    return createElement(
      'uni-swiper', {
        on: this.$listeners
      }, [createElement('div', {
        ref: 'slidesWrapper',
        'class': 'uni-swiper-wrapper'
      }, slidesWrapperChild)]
    )
  }
}
</script>
<style>
uni-swiper {
  display: block;
  height: 150px;
}

uni-swiper[hidden] {
  display: none;
}

uni-swiper .uni-swiper-wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

uni-swiper .uni-swiper-slides {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

uni-swiper .uni-swiper-slide-frame {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

uni-swiper .uni-swiper-dots {
  position: absolute;
  font-size: 0;
}

uni-swiper .uni-swiper-dots-horizontal {
  left: 50%;
  bottom: 10px;
  text-align: center;
  white-space: nowrap;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}

uni-swiper .uni-swiper-dots-horizontal .uni-swiper-dot {
  margin-right: 8px;
}

uni-swiper .uni-swiper-dots-horizontal .uni-swiper-dot:last-child {
  margin-right: 0;
}

uni-swiper .uni-swiper-dots-vertical {
  right: 10px;
  top: 50%;
  text-align: right;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}

uni-swiper .uni-swiper-dots-vertical .uni-swiper-dot {
  display: block;
  margin-bottom: 9px;
}

uni-swiper .uni-swiper-dots-vertical .uni-swiper-dot:last-child {
  margin-bottom: 0;
}

uni-swiper .uni-swiper-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  cursor: pointer;
  transition-property: background-color;
  transition-timing-function: ease;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
}

uni-swiper .uni-swiper-dot-active {
  background-color: #000000;
}
</style>
