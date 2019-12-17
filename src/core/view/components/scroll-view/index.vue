<template>
  <uni-scroll-view v-on="$listeners">
    <div
      ref="wrap"
      class="uni-scroll-view">
      <div
        ref="main"
        :style="{'overflow-x': scrollX?'auto':'hidden','overflow-y': scrollY?'auto':'hidden'}"
        class="uni-scroll-view">
        <div ref="content">
          <slot/>
        </div>
      </div>
    </div>
  </uni-scroll-view>
</template>
<script>
import scroller from 'uni-mixins/scroller/index'
import {
  supportsPassive,
  disableScrollBounce
} from 'uni-shared'

const passiveOptions = supportsPassive ? {
  passive: true
} : false
export default {
  name: 'ScrollView',
  mixins: [scroller],
  props: {
    scrollX: {
      type: [Boolean, String],
      default: false
    },
    scrollY: {
      type: [Boolean, String],
      default: false
    },
    upperThreshold: {
      type: [Number, String],
      default: 50
    },
    lowerThreshold: {
      type: [Number, String],
      default: 50
    },
    scrollTop: {
      type: [Number, String],
      default: 0
    },
    scrollLeft: {
      type: [Number, String],
      default: 0
    },
    scrollIntoView: {
      type: String,
      default: ''
    },
    scrollWithAnimation: {
      type: [Boolean, String],
      default: false
    },
    enableBackToTop: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      lastScrollTop: this.scrollTopNumber,
      lastScrollLeft: this.scrollLeftNumber,
      lastScrollToUpperTime: 0,
      lastScrollToLowerTime: 0
    }
  },
  computed: {
    upperThresholdNumber () {
      var val = Number(this.upperThreshold)
      return isNaN(val) ? 50 : val
    },
    lowerThresholdNumber () {
      var val = Number(this.lowerThreshold)
      return isNaN(val) ? 50 : val
    },
    scrollTopNumber () {
      return Number(this.scrollTop) || 0
    },
    scrollLeftNumber () {
      return Number(this.scrollLeft) || 0
    }
  },
  watch: {
    scrollTopNumber (val) {
      this._scrollTopChanged(val)
    },
    scrollLeftNumber (val) {
      this._scrollLeftChanged(val)
    },
    scrollIntoView (val) {
      this._scrollIntoViewChanged(val)
    }
  },
  mounted () {
    var self = this
    this._attached = true
    this._scrollTopChanged(this.scrollTopNumber)
    this._scrollLeftChanged(this.scrollLeftNumber)
    this._scrollIntoViewChanged(this.scrollIntoView)
    this.__handleScroll = function (e) {
      event.preventDefault()
      event.stopPropagation()
      self._handleScroll.bind(self, event)()
    }
    var touchStart = null
    var needStop = null
    this.__handleTouchMove = function (event) {
      var x = event.touches[0].pageX
      var y = event.touches[0].pageY
      var main = self.$refs.main
      if (needStop === null) {
        if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
          // 横向滑动
          if (self.scrollX) {
            if (main.scrollLeft === 0 && x > touchStart.x) {
              needStop = false
              return
            } else if (main.scrollWidth === main.offsetWidth + main.scrollLeft && x < touchStart.x) {
              needStop = false
              return
            }
            needStop = true
          } else {
            needStop = false
          }
        } else {
          // 纵向滑动
          if (self.scrollY) {
            if (main.scrollTop === 0 && y > touchStart.y) {
              needStop = false
              return
            } else if (main.scrollHeight === main.offsetHeight + main.scrollTop && y < touchStart.y) {
              needStop = false
              return
            }
            needStop = true
          } else {
            needStop = false
          }
        }
      }
      if (needStop) {
        event.stopPropagation()
      }
    }

    this.__handleTouchStart = function (event) {
      if (event.touches.length === 1) {
        disableScrollBounce({
          disable: true
        })
        needStop = null
        touchStart = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        }
      }
    }
    this.__handleTouchEnd = function (event) {
      disableScrollBounce({
        disable: false
      })
    }
    this.$refs.main.addEventListener('touchstart', this.__handleTouchStart, passiveOptions)
    this.$refs.main.addEventListener('touchmove', this.__handleTouchMove, passiveOptions)
    this.$refs.main.addEventListener('scroll', this.__handleScroll, supportsPassive ? {
      passive: false
    } : false)
    this.$refs.main.addEventListener('touchend', this.__handleTouchEnd, passiveOptions)
  },
  activated () {
    // 还原 scroll-view 滚动位置
    this.scrollY && (this.$refs.main.scrollTop = this.lastScrollTop)
    this.scrollX && (this.$refs.main.scrollLeft = this.lastScrollLeft)
  },
  beforeDestroy () {
    this.$refs.main.removeEventListener('touchstart', this.__handleTouchStart, passiveOptions)
    this.$refs.main.removeEventListener('touchmove', this.__handleTouchMove, passiveOptions)
    this.$refs.main.removeEventListener('scroll', this.__handleScroll, supportsPassive ? {
      passive: false
    } : false)
    this.$refs.main.removeEventListener('touchend', this.__handleTouchEnd, passiveOptions)
  },
  methods: {
    scrollTo: function (t, n) {
      var i = this.$refs.main
      t < 0 ? t = 0 : n === 'x' && t > i.scrollWidth - i.offsetWidth ? t = i.scrollWidth - i.offsetWidth
        : n === 'y' && t > i.scrollHeight - i.offsetHeight && (t = i.scrollHeight - i.offsetHeight)
      var r = 0
      var o = ''
      n === 'x' ? r = i.scrollLeft - t : n === 'y' && (r = i.scrollTop - t)
      if (r !== 0) {
        this.$refs.content.style.transition = 'transform .3s ease-out'
        this.$refs.content.style.webkitTransition = '-webkit-transform .3s ease-out'
        if (n === 'x') {
          o = 'translateX(' + r + 'px) translateZ(0)'
        } else {
          n === 'y' && (o = 'translateY(' + r + 'px) translateZ(0)')
        }
        this.$refs.content.removeEventListener('transitionend', this.__transitionEnd)
        this.$refs.content.removeEventListener('webkitTransitionEnd', this.__transitionEnd)
        this.__transitionEnd = this._transitionEnd.bind(this, t, n)
        this.$refs.content.addEventListener('transitionend', this.__transitionEnd)
        this.$refs.content.addEventListener('webkitTransitionEnd', this.__transitionEnd)
        if (n === 'x') {
          // if (e !== 'ios') {
          i.style.overflowX = 'hidden'
          // }
        } else if (n === 'y') {
          i.style.overflowY = 'hidden'
        }

        this.$refs.content.style.transform = o
        this.$refs.content.style.webkitTransform = o
      }
    },
    _handleTrack: function ($event) {
      if ($event.detail.state === 'start') {
        this._x = $event.detail.x
        this._y = $event.detail.y
        this._noBubble = null
        return
      }
      if ($event.detail.state === 'end') {
        this._noBubble = false
      }
      if (this._noBubble === null && this.scrollY) {
        if (Math.abs(this._y - $event.detail.y) / Math.abs(this._x - $event.detail.x) > 1) {
          this._noBubble = true
        } else {
          this._noBubble = false
        }
      }
      if (this._noBubble === null && this.scrollX) {
        if (Math.abs(this._x - $event.detail.x) / Math.abs(this._y - $event.detail.y) > 1) {
          this._noBubble = true
        } else {
          this._noBubble = false
        }
      }
      this._x = $event.detail.x
      this._y = $event.detail.y
      if (this._noBubble) {
        $event.stopPropagation()
      }
    },
    _handleScroll: function ($event) {
      if (!($event.timeStamp - this._lastScrollTime < 20)) {
        this._lastScrollTime = $event.timeStamp
        let target = $event.target
        this.$trigger('scroll', $event, {
          scrollLeft: target.scrollLeft,
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          deltaX: this.lastScrollLeft - target.scrollLeft,
          deltaY: this.lastScrollTop - target.scrollTop
        })
        if (this.scrollY) {
          if (target.scrollTop <= this.upperThresholdNumber && this.lastScrollTop - target.scrollTop > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$trigger('scrolltoupper', $event, {
              direction: 'top'
            })
            this.lastScrollToUpperTime = $event.timeStamp
          }
          if (target.scrollTop + target.offsetHeight + this.lowerThresholdNumber >= target.scrollHeight && this.lastScrollTop - target.scrollTop < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$trigger('scrolltolower', $event, {
              direction: 'bottom'
            })
            this.lastScrollToLowerTime = $event.timeStamp
          }
        }
        if (this.scrollX) {
          if (target.scrollLeft <= this.upperThresholdNumber && this.lastScrollLeft - target.scrollLeft > 0 && $event.timeStamp - this.lastScrollToUpperTime > 200) {
            this.$trigger('scrolltoupper', $event, {
              direction: 'left'
            })
            this.lastScrollToUpperTime = $event.timeStamp
          }
          if (target.scrollLeft + target.offsetWidth + this.lowerThresholdNumber >= target.scrollWidth && this.lastScrollLeft - target.scrollLeft < 0 && $event.timeStamp - this.lastScrollToLowerTime > 200) {
            this.$trigger('scrolltolower', $event, {
              direction: 'right'
            })
            this.lastScrollToLowerTime = $event.timeStamp
          }
        }
        this.lastScrollTop = target.scrollTop
        this.lastScrollLeft = target.scrollLeft
      }
    },
    _scrollTopChanged: function (val) {
      if (this.scrollY) {
        if (this._innerSetScrollTop) {
          this._innerSetScrollTop = false
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, 'y')
          } else {
            this.$refs.main.scrollTop = val
          }
        }
      }
    },
    _scrollLeftChanged: function (val) {
      if (this.scrollX) {
        if (this._innerSetScrollLeft) {
          this._innerSetScrollLeft = false
        } else {
          if (this.scrollWithAnimation) {
            this.scrollTo(val, 'x')
          } else {
            this.$refs.main.scrollLeft = val
          }
        }
      }
    },
    _scrollIntoViewChanged: function (val) {
      if (val) {
        if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
          console.group('scroll-into-view="' + val + '" 有误')
          console.error('id 属性值格式错误。如不能以数字开头。')
          console.groupEnd()
          return
        }
        var element = this.$el.querySelector('#' + val)
        if (element) {
          var mainRect = this.$refs.main.getBoundingClientRect()
          var elRect = element.getBoundingClientRect()
          if (this.scrollX) {
            var left = elRect.left - mainRect.left
            var scrollLeft = this.$refs.main.scrollLeft
            var x = scrollLeft + left
            if (this.scrollWithAnimation) {
              this.scrollTo(x, 'x')
            } else {
              this.$refs.main.scrollLeft = x
            }
          }
          if (this.scrollY) {
            var top = elRect.top - mainRect.top
            var scrollTop = this.$refs.main.scrollTop
            var y = scrollTop + top
            if (this.scrollWithAnimation) {
              this.scrollTo(y, 'y')
            } else {
              this.$refs.main.scrollTop = y
            }
          }
        }
      }
    },
    _transitionEnd: function (val, type) {
      this.$refs.content.style.transition = ''
      this.$refs.content.style.webkitTransition = ''
      this.$refs.content.style.transform = ''
      this.$refs.content.style.webkitTransform = ''
      var main = this.$refs.main
      if (type === 'x') {
        main.style.overflowX = this.scrollX ? 'auto' : 'hidden'
        main.scrollLeft = val
      } else if (type === 'y') {
        main.style.overflowY = this.scrollY ? 'auto' : 'hidden'
        main.scrollTop = val
      }
      this.$refs.content.removeEventListener('transitionend', this.__transitionEnd)
      this.$refs.content.removeEventListener('webkitTransitionEnd', this.__transitionEnd)
    },
    getScrollPosition () {
      const main = this.$refs.main
      return {
        scrollLeft: main.scrollLeft,
        scrollTop: main.scrollTop
      }
    }
  }
}
</script>
<style>
uni-scroll-view {
  display: block;
  width: 100%;
}

uni-scroll-view[hidden] {
  display: none;
}

.uni-scroll-view {
  position: relative;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  /* display: flex; 时在安卓下会导致scrollWidth和offsetWidth一样 */
  height: 100%;
  max-height: inherit;
}
</style>
