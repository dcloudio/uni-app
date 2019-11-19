function hideKeyboard () {
  document.activeElement.blur()
}
/**
 * 保证iOS点击输入框外隐藏键盘
 */
function iosHideKeyboard () { }

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
    this.onKeyboardHide()
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
        document.addEventListener('click', iosHideKeyboard, false)
        this.setSoftinputTemporary()
      })
      el.addEventListener('blur', this.onKeyboardHide)
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
    },
    onKeyboardHide () {
      UniViewJSBridge.unsubscribe('hideKeyboard', hideKeyboard)
      document.removeEventListener('click', iosHideKeyboard, false)
    }
  }
}
