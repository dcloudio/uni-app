export default {
  data () {
    return {
      hovering: false
    }
  },

  props: {
    hoverClass: {
      type: String,
      default: 'none'
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      type: [Number, String],
      default: 50
    },
    hoverStayTime: {
      type: [Number, String],
      default: 400
    }
  },

  methods: {
    _hoverTouchStart (evt) {
      if (evt.touches.length > 1) {
        return
      }
      this._handleHoverStart(evt)
    },

    _hoverMousedown (evt) {
      if (this._hoverTouch) {
        return
      }

      this._handleHoverStart(evt)
      window.addEventListener('mouseup', this._hoverMouseup)
    },

    _handleHoverStart (evt) {
      // TODO detect scrolling
      if (evt._hoverPropagationStopped) {
        return
      }
      if (!this.hoverClass || this.hoverClass === 'none' || this.disabled) {
        return
      }
      if (this.hoverStopPropagation) {
        evt._hoverPropagationStopped = true
      }
      this._hoverTouch = true
      this._hoverStartTimer = setTimeout(() => {
        this.hovering = true
        if (!this._hoverTouch) { // 防止在hoverStartTime时间内触发了 touchend 或 touchcancel
          this._hoverReset()
        }
      }, this.hoverStartTime)
    },

    _hoverMouseup () {
      if (!this._hoverTouch) {
        return
      }

      this._handleHoverEnd()
      window.removeEventListener('mouseup', this._hoverMouseup)
    },

    _hoverTouchEnd () {
      this._handleHoverEnd()
    },

    _handleHoverEnd () {
      this._hoverTouch = false
      if (this.hovering) {
        this._hoverReset()
      }
    },

    _hoverReset () {
      requestAnimationFrame(() => {
        clearTimeout(this._hoverStayTimer)
        this._hoverStayTimer = setTimeout(() => {
          this.hovering = false
        }, this.hoverStayTime)
      })
    },

    _hoverTouchCancel () {
      this._hoverTouch = false
      this.hovering = false
      clearTimeout(this._hoverStartTimer)
    }
  }
}
