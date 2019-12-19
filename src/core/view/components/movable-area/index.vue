<script>
import {
  disableScrollBounce
} from 'uni-shared'

function calc (e) {
  return Math.sqrt(e.x * e.x + e.y * e.y)
}

export default {
  name: 'MovableArea',
  props: {
    scaleArea: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      width: 0,
      height: 0,
      items: []
    }
  },
  created: function () {
    this.gapV = {
      x: null,
      y: null
    }
    this.pinchStartLen = null
  },
  mounted: function () {
    this._resize()
  },
  methods: {
    _resize () {
      this._getWH()
      this.items.forEach(function (item, index) {
        item.componentInstance.setParent()
      })
    },
    _find (target, items = this.items) {
      var root = this.$el

      function get (node) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (node === item.componentInstance.$el) {
            return item
          }
        }
        if (node === root || node === document.body || node === document) {
          return null
        }
        return get(node.parentNode)
      }
      return get(target)
    },
    _touchstart (t) {
      disableScrollBounce({
        disable: true
      })
      var i = t.touches
      if (i) {
        if (i.length > 1) {
          var r = {
            x: i[1].pageX - i[0].pageX,
            y: i[1].pageY - i[0].pageY
          }
          this.pinchStartLen = calc(r)
          this.gapV = r
          if (!this.scaleArea) {
            var touch0 = this._find(i[0].target)
            var touch1 = this._find(i[1].target)
            this._scaleMovableView = touch0 && touch0 === touch1 ? touch0 : null
          }
        }
      }
    },
    _touchmove (t) {
      var n = t.touches
      if (n) {
        if (n.length > 1) {
          t.preventDefault()
          var i = {
            x: n[1].pageX - n[0].pageX,
            y: n[1].pageY - n[0].pageY
          }
          if (this.gapV.x !== null && this.pinchStartLen > 0) {
            var r = calc(i) / this.pinchStartLen
            this._updateScale(r)
          }
          this.gapV = i
        }
      }
    },
    _touchend (e) {
      disableScrollBounce({
        disable: false
      })
      var t = e.touches
      if (!(t && t.length)) {
        if (e.changedTouches) {
          this.gapV.x = 0
          this.gapV.y = 0
          this.pinchStartLen = null
          if (this.scaleArea) {
            this.items.forEach(function (item) {
              item.componentInstance._endScale()
            })
          } else {
            if (this._scaleMovableView) {
              this._scaleMovableView.componentInstance._endScale()
            }
          }
        }
      }
    },
    _updateScale (e) {
      if (e && e !== 1) {
        if (this.scaleArea) {
          this.items.forEach(function (item) {
            item.componentInstance._setScale(e)
          })
        } else {
          if (this._scaleMovableView) {
            this._scaleMovableView.componentInstance._setScale(e)
          }
        }
      }
    },
    _getWH () {
      var style = window.getComputedStyle(this.$el)
      var rect = this.$el.getBoundingClientRect()
      this.width = rect.width - ['Left', 'Right'].reduce(function (all, item) {
        return all + parseFloat(style['border' + item + 'Width']) + parseFloat(style['padding' + item])
      }, 0)
      this.height = rect.height - ['Top', 'Bottom'].reduce(function (all, item) {
        return all + parseFloat(style['border' + item + 'Width']) + parseFloat(style['padding' + item])
      }, 0)
    }
  },
  render (createElement) {
    var items = []
    if (this.$slots.default) {
      this.$slots.default.forEach(vnode => {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'v-uni-movable-view') {
          items.push(vnode)
        }
      })
    }
    this.items = items
    var $listeners = Object.assign({}, this.$listeners)
    var events = ['touchstart', 'touchmove', 'touchend']
    events.forEach(event => {
      var existing = $listeners[event]
      var ours = this[`_${event}`]
      $listeners[event] = existing ? [].concat(existing, ours) : ours
    })
    return createElement('uni-movable-area', {
      on: $listeners
    }, [createElement('v-uni-resize-sensor', {
      on: {
        resize: this._resize
      }
    }), this.$slots.default])
  }
}
</script>
<style>
  uni-movable-area {
    display: block;
    position: relative;
    width: 10px;
    height: 10px;
  }

  uni-movable-area[hidden] {
    display: none;
  }
</style>
