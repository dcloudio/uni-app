function hideKeyboard () {
  document.activeElement.blur()
}

export default {
  name: 'Keyboard',
  props: {
    cursorSpacing: {
      type: Number,
      default: 0
    },
    adjustPosition: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    focus (val) {
      if (val) {
        this.showSoftKeybord()
      }
    }
  },
  mounted () {
    if (this.autoFocus || this.focus) {
      this.showSoftKeybord()
    }
  },
  beforeDestroy () {
    UniViewJSBridge.unsubscribe('hideKeyboard', hideKeyboard)
  },
  methods: {
    plusReady (callback) {
      if (!callback) {
        return
      }
      if (window.plus) {
        return callback()
      }
      document.addEventListener('plusready', callback)
    },
    initKeyboard (el) {
      el.addEventListener('focus', () => {
        UniViewJSBridge.subscribe('hideKeyboard', hideKeyboard)
        this.setSoftinputTemporary()
      })
      el.addEventListener('blur', () => {
        UniViewJSBridge.unsubscribe('hideKeyboard', hideKeyboard)
      })
    },
    showSoftKeybord () {
      this.plusReady(() => {
        plus.key.showSoftKeybord()
      })
    },
    setSoftinputTemporary () {
      this.plusReady(() => {
        var currentWebview = plus.webview.currentWebview()
        var style = currentWebview.getStyle() || {}
        if (style.softinputMode === 'adjustResize') {
          return
        }
        var rect = this.$el.getBoundingClientRect()
        currentWebview.setSoftinputTemporary && currentWebview.setSoftinputTemporary({
          mode: this.adjustPosition ? 'adjustPan' : 'nothing',
          position: {
            top: rect.top,
            height: rect.height + this.cursorSpacing
          }
        })
      })
    }
  }
}
