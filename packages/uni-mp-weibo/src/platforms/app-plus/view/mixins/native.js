import { getNavigationBarHeight } from '../utils'

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
  provide () {
    return {
      parentOnDraw: this._onDraw
    }
  },
  inject: {
    parentOnDraw: { default: null }
  },
  created () {
    this.isNative = true
    this.onCanInsertCallbacks = []
    this.onDrawCallbacks = []
  },
  mounted () {
    this._updatePosition()
    this.onCanInsertCallbacks.forEach(callback => callback())
    this.onCanInsertCallbacks = null
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
    },
    _onParentReady (parentReadyCallback) {
      const callback = (parentPosition) => {
        parentReadyCallback(parentPosition)
        this.onDrawCallbacks.forEach(callback => callback(this.position))
        this.onDrawCallbacks = null
      }
      this._onSelfReady(() => {
        if (this.parentOnDraw) {
          this.parentOnDraw(callback)
        } else {
          callback({
            top: '0px',
            left: '0px',
            width: Number.MAX_SAFE_INTEGER + 'px',
            height: Number.MAX_SAFE_INTEGER + 'px',
            position: 'static'
          })
        }
      })
    },
    _onSelfReady (callback) {
      if (this.onCanInsertCallbacks) {
        this.onCanInsertCallbacks.push(callback)
      } else {
        callback()
      }
    },
    _onDraw (callback) {
      if (this.onDrawCallbacks) {
        this.onDrawCallbacks.push(callback)
      } else {
        callback(this.position)
      }
    }
  }
}
