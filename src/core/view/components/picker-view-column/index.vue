<script>
import touchtrack from 'uni-mixins/touchtrack'
import scroller from 'uni-mixins/scroller/index'
import {
  Friction
} from 'uni-mixins/scroller/Friction'
import {
  Spring
} from 'uni-mixins/scroller/Spring'
import {
  disableScrollBounce
} from 'uni-shared'

function initClick (dom) {
  const MAX_MOVE = 20
  let x = 0
  let y = 0
  dom.addEventListener('touchstart', (event) => {
    const info = event.changedTouches[0]
    x = info.clientX
    y = info.clientY
  })
  dom.addEventListener('touchend', (event) => {
    const info = event.changedTouches[0]
    if (Math.abs(info.clientX - x) < MAX_MOVE && Math.abs(info.clientY - y) < MAX_MOVE) {
      let customEvent = new CustomEvent('click', {
        bubbles: true,
        cancelable: true,
        target: event.target,
        currentTarget: event.currentTarget
      });
      ['screenX', 'screenY', 'clientX', 'clientY', 'pageX', 'pageY'].forEach(key => {
        customEvent[key] = info[key]
      })
      event.target.dispatchEvent(customEvent)
    }
  })
}

export default {
  name: 'PickerViewColumn',
  mixins: [touchtrack, scroller],
  data () {
    return {
      scope: `picker-view-column-${Date.now()}`,
      inited: false,
      indicatorStyle: '',
      indicatorClass: '',
      indicatorHeight: 34,
      maskStyle: '',
      maskClass: '',
      current: this.$parent.getItemValue(this),
      length: 0
    }
  },
  computed: {
    height () {
      return this.$parent.height
    },
    maskSize () {
      return (this.height - this.indicatorHeight) / 2
    }
  },
  watch: {
    indicatorHeight (val) {
      this._setItemHeight(val)
      if (this.inited) {
        this.update()
      }
    },
    current (val) {
      this.$parent.setItemValue(this, val)
    },
    length (val) {
      if (this.inited) {
        this.update(val)
      }
    }
  },
  created: function () {
    var $parent = this.$parent
    this.indicatorStyle = $parent.indicatorStyle
    this.indicatorClass = $parent.indicatorClass
    this.maskStyle = $parent.maskStyle
    this.maskClass = $parent.maskClass
    this.deltaY = 0
  },
  mounted: function () {
    this.touchtrack(this.$refs.main, '_handleTrack', true)
    this.setCurrent(this.current)
    this.$nextTick(() => {
      this.init()
      this.update()
    })
    initClick(this.$el)
  },
  methods: {
    _setItemHeight (height) {
      var style = document.createElement('style')
      style.innerText = `.uni-picker-view-content.${this.scope}>*{height: ${height}px;overflow: hidden;}`
      document.head.appendChild(style)
    },
    _handleTrack: function (e) {
      if (this._scroller) {
        switch (e.detail.state) {
          case 'start':
            this._handleTouchStart(e)
            disableScrollBounce({
              disable: true
            })
            break
          case 'move':
            this._handleTouchMove(e)
            break
          case 'end':
          case 'cancel':
            this._handleTouchEnd(e)
            disableScrollBounce({
              disable: false
            })
        }
      }
    },
    _handleTap: function ({
      clientY
    }) {
      if (!this._scroller.isScrolling()) {
        var rect = this.$el.getBoundingClientRect()
        var r = clientY - rect.top - this.height / 2
        var o = this.indicatorHeight / 2
        if (!(Math.abs(r) <= o)) {
          var a = Math.ceil((Math.abs(r) - o) / this.indicatorHeight)
          var s = r < 0 ? -a : a
          var current = Math.min(this.current + s, this.length - 1)
          this.current = current = Math.max(current, 0)
          this._scroller.scrollTo(current * this.indicatorHeight)
        }
      }
    },
    _handleWheel ($event) {
      const deltaY = this.deltaY + $event.deltaY
      if (Math.abs(deltaY) > 10) {
        this.deltaY = 0
        var current = Math.min(this.current + (deltaY < 0 ? -1 : 1), this.length - 1)
        this.current = current = Math.max(current, 0)
        this._scroller.scrollTo(current * this.indicatorHeight)
      } else {
        this.deltaY = deltaY
      }
      $event.preventDefault()
    },
    setCurrent: function (current) {
      if (current !== this.current) {
        this.current = current
        if (this.inited) {
          this.update()
        }
      }
    },
    init: function () {
      this.initScroller(this.$refs.content, {
        enableY: true,
        enableX: false,
        enableSnap: true,
        itemSize: this.indicatorHeight,
        friction: new Friction(0.0001),
        spring: new Spring(2, 90, 20),
        onSnap: (index) => {
          if ((!isNaN(index)) && index !== this.current) {
            this.current = index
          }
        }
      })
      this.inited = true
    },
    update: function () {
      this.$nextTick(() => {
        var current = Math.min(this.current, this.length - 1)
        current = Math.max(current, 0)
        this._scroller.update(current * this.indicatorHeight, undefined, this.indicatorHeight)
      })
    },
    _resize ({
      height
    }) {
      this.indicatorHeight = height
    }
  },
  render (createElement) {
    this.length = (this.$slots.default && this.$slots.default.length) || 0
    return createElement('uni-picker-view-column', {
      on: {
        on: this.$listeners
      }
    }, [
      createElement('div', {
        ref: 'main',
        staticClass: 'uni-picker-view-group',
        on: {
          wheel: this._handleWheel,
          click: this._handleTap
        }
      },
      [
        createElement('div', {
          ref: 'mask',
          staticClass: 'uni-picker-view-mask',
          class: this.maskClass,
          style: `background-size: 100% ${this.maskSize}px;${this.maskStyle}`
        }),
        createElement('div', {
          ref: 'indicator',
          staticClass: 'uni-picker-view-indicator',
          class: this.indicatorClass,
          style: this.indicatorStyle
        }, [createElement('v-uni-resize-sensor', {
          attrs: {
            initial: true
          },
          on: {
            resize: this._resize
          }
        })]),
        createElement('div', {
          ref: 'content',
          staticClass: 'uni-picker-view-content',
          class: this.scope,
          style: `padding: ${this.maskSize}px 0;`
        },
        [this.$slots.default]
        )
      ])
    ])
  }
}
</script>
<style>
  uni-picker-view-column {
    -webkit-flex: 1;
    flex: 1;
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  uni-picker-view-column[hidden] {
    display: none;
  }

  .uni-picker-view-group {
    height: 100%;
  }

  .uni-picker-view-mask {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }

  .uni-picker-view-indicator,
  .uni-picker-view-mask {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 3;
  }

  .uni-picker-view-mask {
    top: 0;
    height: 100%;
    margin: 0 auto;
    background: linear-gradient(180deg,
      hsla(0, 0%, 100%, 0.95),
      hsla(0, 0%, 100%, 0.6)),
      linear-gradient(0deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
    background-position: top, bottom;
    background-size: 100% 102px;
    background-repeat: no-repeat;
  }

  .uni-picker-view-indicator {
    height: 34px;
    /* top: 102px; */
    top: 50%;
    transform: translateY(-50%);
  }

  .uni-picker-view-indicator,
  .uni-picker-view-mask {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 3;
    pointer-events: none;
  }

  .uni-picker-view-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    will-change: transform;
    padding: 102px 0;
    cursor: pointer;
  }

  .uni-picker-view-content>* {
    height: 34px;
    overflow: hidden;
  }

  .uni-picker-view-indicator:after,
  .uni-picker-view-indicator:before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    color: #e5e5e5;
  }

  .uni-picker-view-indicator:before {
    top: 0;
    border-top: 1px solid #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .uni-picker-view-indicator:after {
    bottom: 0;
    border-bottom: 1px solid #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .uni-picker-view-indicator:after,
  .uni-picker-view-indicator:before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    color: #e5e5e5;
  }
</style>
