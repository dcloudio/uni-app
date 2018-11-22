<script>
import touchtrack from 'uni-mixins/touchtrack'
import scroller from 'uni-mixins/scroller/index'

export default {
  name: 'PickerViewColumn',
  mixins: [touchtrack, scroller],
  data () {
    return {
      scope: `picker-view-column-${Date.now()}`,
      inited: false,
      height: 34,
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
    // this.__pageRerender = this._pageRerender.bind(this)
  },
  mounted: function () {
    this.height = this.$el.offsetHeight
    this.indicatorHeight = this.$refs.indicator.offsetHeight
    this.touchtrack(this.$refs.main, '_handleTrack', true)
    this.setCurrent(this.current)
    this.$nextTick(() => {
      this.init()
      this.update()
    })
  },
  methods: {
    _setItemHeight (height) {
      var style = document.createElement('style')
      style.innerText = `.uni-picker__content.${this.scope}>*{height: ${height}px;overflow: hidden;}`
      document.head.appendChild(style)
    },
    _handleTrack: function (e) {
      if (this._scroller) {
        switch (e.detail.state) {
          case 'start':
            this._handleTouchStart(e)
            break
          case 'move':
            this._handleTouchMove(e)
            break
          case 'end':
          case 'cancel':
            this._handleTouchEnd(e)
        }
      }
    },
    _handleTap: function (e) {
      if (e.target !== e.currentTarget && !this._scroller.isScrolling()) {
        var t = e.touches && e.touches[0] && e.touches[0].clientY
        var n = typeof t === 'number' ? t : e.detail.y - document.body.scrollTop
        var i = this.$el.getBoundingClientRect()
        var r = n - i.top - this._height / 2
        var o = this.indicatorHeight / 2
        if (!(Math.abs(r) <= o)) {
          var a = Math.ceil((Math.abs(r) - o) / this.indicatorHeight)
          var s = r < 0 ? -a : a
          this.current += s
          this._scroller.scrollTo(this.current * this.indicatorHeight)
        }
      }
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
        var index = Math.max(this.length - 1, 0)
        var current = Math.min(this.current, index)
        this._scroller.update(current * this.indicatorHeight, undefined, this.indicatorHeight)
      })
    }
  },
  render (createElement) {
    this.length = (this.$slots.default && this.$slots.default.length) || 0
    return createElement('uni-picker-view-column', {
      staticClass: '_picker-view-column',
      on: {
        tap: this._handleTap
      }
    },
    [
      createElement('div', {
        ref: 'main',
        staticClass: 'uni-picker__group'
      },
      [
        createElement('div', {
          ref: 'mask',
          staticClass: 'uni-picker__mask',
          class: this.maskClass,
          style: `background-size: 100% ${this.maskSize}px;${this.maskStyle}`
        }),
        createElement('div', {
          ref: 'indicator',
          staticClass: 'uni-picker__indicator',
          class: this.indicatorClass,
          style: this.indicatorStyle
        }),
        createElement('div', {
          ref: 'content',
          staticClass: 'uni-picker__content',
          class: this.scope,
          style: `padding: ${this.maskSize}px 0;`
        },
        [this.$slots.default]
        )
      ])
    ]
    )
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

.uni-picker__group {
  height: 100%;
}

.uni-picker__mask {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.uni-picker__indicator,
.uni-picker__mask {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 3;
}

.uni-picker__mask {
  top: 0;
  height: 100%;
  margin: 0 auto;
  background: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.95),
      hsla(0, 0%, 100%, 0.6)
    ),
    linear-gradient(0deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
  background-position: top, bottom;
  background-size: 100% 102px;
  background-repeat: no-repeat;
}

.uni-picker__indicator {
  height: 34px;
  /* top: 102px; */
  top: 50%;
  transform: translateY(-50%);
}

.uni-picker__indicator,
.uni-picker__mask {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 3;
  pointer-events: none;
}

.uni-picker__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  will-change: transform;
  padding: 102px 0;
}

.uni-picker__content > * {
  height: 34px;
  overflow: hidden;
}

.uni-picker__indicator:after,
.uni-picker__indicator:before {
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  color: #e5e5e5;
}

.uni-picker__indicator:before {
  top: 0;
  border-top: 1px solid #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.uni-picker__indicator:after {
  bottom: 0;
  border-bottom: 1px solid #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.uni-picker__indicator:after,
.uni-picker__indicator:before {
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  color: #e5e5e5;
}
</style>
