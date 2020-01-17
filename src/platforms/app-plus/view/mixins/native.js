const TITLEBAR_HEIGHT = 44

function getStatusbarHeight () {
  // 横屏时 iOS 获取的状态栏高度错误，进行纠正
  return plus.navigator.isImmersedStatusbar() ? Math.round(plus.os.name === 'iOS' ? plus.navigator.getSafeAreaInsets().top : plus.navigator.getStatusbarHeight()) : 0
}

function getNavigationBarHeight () {
  const webview = plus.webview.currentWebview()
  let style = webview.getStyle()
  style = style && style.titleNView
  if (style && style.type === 'default') {
    return TITLEBAR_HEIGHT + getStatusbarHeight()
  }
  return 0
}

function getFixed ($el) {
  let fixed
  while ($el) {
    const style = getComputedStyle($el)
    const transform = style.transform || style.webkitTransform
    fixed = transform && transform !== 'none' ? false : fixed
    fixed = style.position === 'fixed' ? true : fixed
    $el = $el.parentElement
  }
  return fixed
}

export default {
  name: 'Native',
  data () {
    return {
      position: {
        top: '0px',
        left: '0px',
        width: '0px',
        height: '0px',
        position: 'static'
      },
      hidden: false
    }
  },
  created () {
    this.isNative = true
    this.onCanInsertCallbacks = []
  },
  mounted () {
    this._updatePosition()
    this.$nextTick(() => {
      this.onCanInsertCallbacks.forEach(callback => callback())
    })
    this.$on('uni-view-update', this._requestPositionUpdate)
  },
  methods: {
    _updatePosition () {
      const rect = (this.$refs.container || this.$el).getBoundingClientRect()
      this.hidden = rect.width === 0 || rect.height === 0
      if (!this.hidden) {
        const position = this.position
        position.position = getFixed(this.$el) ? 'absolute' : 'static'
        const keys = ['top', 'left', 'width', 'height']
        keys.forEach(key => {
          let val = rect[key]
          val = key === 'top' ? val + (position.position === 'static' ? (document.documentElement.scrollTop || document.body.scrollTop || 0) : getNavigationBarHeight()) : val
          position[key] = val + 'px'
        })
      }
    },
    _requestPositionUpdate () {
      if (this._positionUpdateRequest) {
        cancelAnimationFrame(this._positionUpdateRequest)
      }
      this._positionUpdateRequest = requestAnimationFrame(() => {
        delete this._positionUpdateRequest
        this._updatePosition()
      })
    }
  }
}
