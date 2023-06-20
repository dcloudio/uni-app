function getMovableArea (weex) {
  const dom = weex.requireModule('dom')

  return {
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
    methods: {
      _resize () {
        this._getWH().then(() => {
          this.items.forEach(function (item) {
            item.componentInstance.setParent()
          })
        })
      },
      // _find (target, items = this.items) {
      //   var root = this.$el
      //   function get (node) {
      //     for (let i = 0; i < items.length; i++) {
      //       const item = items[i]
      //       if (node === item.componentInstance.$el) {
      //         return item
      //       }
      //     }
      //     if (node === root || node === document.body || node === document) {
      //       return null
      //     }
      //     return get(node.parentNode)
      //   }
      //   return get(target)
      // },
      _touchstart (t) {
        // t.stopPropagation()
        if (this.touchItem) {
          this.touchItem.touchstart(t)
        }
        // var i = t.touches
        // if (i) {
        //   if (i.length > 1) {
        //     var r = {
        //       x: i[1].pageX - i[0].pageX,
        //       y: i[1].pageY - i[0].pageY
        //     }
        //     this.pinchStartLen = calc(r)
        //     this.gapV = r
        //     if (!this.scaleArea) {
        //       var touch0 = this._find(i[0].target)
        //       var touch1 = this._find(i[1].target)
        //       this._scaleMovableView = touch0 && touch0 === touch1 ? touch0 : null
        //     }
        //   }
        // }
      },
      _touchmove (t) {
        t.stopPropagation()
        if (this.touchItem) {
          this.touchItem.touchmove(t)
        }
        // var n = t.touches
        // if (n) {
        //   if (n.length > 1) {
        //     t.preventDefault()
        //     var i = {
        //       x: n[1].pageX - n[0].pageX,
        //       y: n[1].pageY - n[0].pageY
        //     }
        //     if (this.gapV.x !== null && this.pinchStartLen > 0) {
        //       var r = calc(i) / this.pinchStartLen
        //       this._updateScale(r)
        //     }
        //     this.gapV = i
        //   }
        // }
      },
      _touchend (e) {
        // e.stopPropagation()
        if (this.touchItem) {
          this.touchItem.touchend(e)
          this.touchItem = null
        }
        // var t = e.touches
        // if (!(t && t.length)) {
        //   if (e.changedTouches) {
        //     this.gapV.x = 0
        //     this.gapV.y = 0
        //     this.pinchStartLen = null
        //     if (this.scaleArea) {
        //       this.items.forEach(function (item) {
        //         item.componentInstance._endScale()
        //       })
        //     } else {
        //       if (this._scaleMovableView) {
        //         this._scaleMovableView.componentInstance._endScale()
        //       }
        //     }
        //   }
        // }
      },
      // _updateScale (e) {
      //   if (e && e !== 1) {
      //     if (this.scaleArea) {
      //       this.items.forEach(function (item) {
      //         item.componentInstance._setScale(e)
      //       })
      //     } else {
      //       if (this._scaleMovableView) {
      //         this._scaleMovableView.componentInstance._setScale(e)
      //       }
      //     }
      //   }
      // },
      _getWH () {
        return this._getComponentSize(this.$refs.el).then(({ width, height, top, left }) => {
          this.width = width
          this.height = height
          this.top = top
          this.left = left
        })
      },
      _getComponentSize (el) {
        return new Promise((resolve) => {
          dom.getComponentRect(el, ({ size }) => {
            resolve(size)
          })
        })
      }
    },
    created () {
      this.items = []
      this.gapV = {
        x: null,
        y: null
      }
      this.pinchStartLen = null
    },
    mounted () {
      // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要延迟执行
      setTimeout(() => {
        this.__isMounted = true
        this._resize()
      }, 200)
    },
    render (createElement) {
      const items = []
      const slots = Array.isArray(this.$slots.default) ? this.$slots.default : []

      slots.forEach(vnode => {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'movable-view') {
          items.push(vnode)
        }
      })

      this.items = items
      const listeners = {}
      const events = ['touchstart', 'touchmove', 'touchend']
      events.forEach(event => {
        listeners[event] = this[`_${event}`]
      })
      return createElement('div', this._g({
        ref: 'el',
        on: listeners,
        staticClass: ['uni-movable-area']
      }, this.$listeners), items, 2)
    },
    style: {
      'uni-movable-area': {
        width: '10px',
        height: '10px'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('movable-area', getMovableArea(weex))
}
