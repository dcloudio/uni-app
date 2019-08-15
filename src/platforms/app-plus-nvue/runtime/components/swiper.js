import {
  emitter
} from '../mixins'

function getSwiper (weex) {
  return {
    name: 'Swiper',
    mixins: [emitter],
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
        default: 'rgba(0,0,0,.3)'
      },
      indicatorActiveColor: {
        type: String,
        default: '#000000'
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
      }
    },
    data () {
      return {
        currentSync: this.current,
        currentChangeSource: 'autoplay',
        touching: false,
        touchendTime: 0
      }
    },
    watch: {
      current () {
        this._currentCheck()
      },
      currentItemId () {
        this._currentCheck()
      },
      currentSync () {
        const source = this.touching && this.currentChangeSource ? 'touch' : this.currentChangeSource
        if (source) {
          this.$trigger('change', this._getDetail())
        }
        else {
          this.currentChangeSource = 'autoplay'
        }
      }
    },
    methods: {
      onChange (event) {
        this.currentSync = event.detail.index
      },
      onScroll (event) {
        const offsetXRatio = event.detail.offsetXRatio
        if (!this.touching && Math.abs(offsetXRatio) === 0) {
          const detail = this._getDetail()
          if (Date.now() - this.touchendTime < this.interval - 1) {
            detail.source = 'touch'
          }
          this.$trigger('animationfinish', detail)
        }
      },
      onTouchmove () {
        this.touching = true
      },
      onTouchend () {
        this.touching = false
        this.touchendTime = Date.now()
      },
      _getDetail () {
        const current = this.currentSync
        const currentItem = this.items[current] || {}
        const currentItemId = (currentItem.componentInstance && currentItem.componentInstance.itemId) || ''
        const source = this.touching && this.currentChangeSource ? 'touch' : this.currentChangeSource
        return {
          current,
          currentItemId,
          source
        }
      },
      _currentCheck () {
        let current = -1
        if (this.currentItemId) {
          for (let i = 0, items = this.items; i < items.length; i++) {
            const componentInstance = items[i].componentInstance
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
      }
    },
    created () {
      this.items = []
    },
    mounted () {
      this._currentCheck()
    },
    render (createElement) {
      const swiperItems = []
      const slots = Array.isArray(this.$slots.default) ? this.$slots.default : []

      slots.forEach(vnode => {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'swiper-item') {
          swiperItems.push(vnode)
        }
      })
      this.items = swiperItems
      const event = {}
      const $listeners = this.$listeners
      if ($listeners.change || $listeners.animationfinish) {
        event.panmove = this.onTouchmove
        event.panend = this.onTouchend
      }
      if ($listeners.change) {
        event.change = this.onChange
      }
      if ($listeners.animationfinish) {
        event.scroll = this.onScroll
      }
      return createElement('div', this._g({
        staticClass: ['uni-swiper']
      }, $listeners), [createElement('slider', {
        staticClass: ['uni-swiper-slider'],
        attrs: {
          autoPlay: this.autoplay,
          interval: this.interval,
          index: this.currentSync,
          showIndicators: this.indicatorDots,
          infinite: this.circular,
          vertical: this.vertical
        },
        on: event
      }, [...swiperItems, createElement('indicator', {
        staticClass: ['uni-swiper-dots'],
        style: {
          itemColor: this.indicatorColor,
          itemSelectedColor: this.indicatorActiveColor,
          itemSize: 8,
          // 动态创建 indicator 在安卓上有问题，改成透明度控制显示和隐藏
          opacity: this.indicatorDots ? 1 : 0
        }
      })], 2)])
    },
    style: {
      'uni-swiper': {
        position: 'relative',
        height: '150px'
      },
      'uni-swiper-slider': {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      'uni-swiper-dots': {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '10',
        height: '10'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('swiper', getSwiper(weex))
}
