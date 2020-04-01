import {
  plusReady
} from 'uni-shared'

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
      type: [Number, String],
      default: 0
    },
    showConfirmBar: {
      type: [Boolean, String],
      default: 'auto'
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
    initKeyboard (el) {
      el.addEventListener('focus', () => {
        this.hideKeyboardTemp = function () {
          hideKeyboard()
        }
        UniViewJSBridge.subscribe('hideKeyboard', this.hideKeyboardTemp)
        document.addEventListener('click', iosHideKeyboard, false)
        this.setSoftinputNavBar()
        this.setSoftinputTemporary()
      })
      el.addEventListener('blur', this.onKeyboardHide.bind(this))
    },
    showSoftKeybord () {
      plusReady(() => {
        plus.key.showSoftKeybord()
      })
    },
    setSoftinputTemporary () {
      plusReady(() => {
        const currentWebview = plus.webview.currentWebview()
        const style = currentWebview.getStyle() || {}
        const rect = this.$el.getBoundingClientRect()
        currentWebview.setSoftinputTemporary && currentWebview.setSoftinputTemporary({
          mode: style.softinputMode === 'adjustResize' ? 'adjustResize' : (this.adjustPosition ? 'adjustPan' : 'nothing'),
          position: {
            top: rect.top,
            height: rect.height + (Number(this.cursorSpacing) || 0)
          }
        })
      })
    },
    setSoftinputNavBar () {
      if (this.showConfirmBar === 'auto') {
        delete this.__softinputNavBar
        return
      }
      plusReady(() => {
        const currentWebview = plus.webview.currentWebview()
        const { softinputNavBar } = currentWebview.getStyle() || {}
        const showConfirmBar = softinputNavBar !== 'none'
        if (showConfirmBar !== this.showConfirmBar) {
          this.__softinputNavBar = softinputNavBar || 'auto'
          currentWebview.setStyle({
            softinputNavBar: this.showConfirmBar ? 'auto' : 'none'
          })
        } else {
          delete this.__softinputNavBar
        }
      })
    },
    resetSoftinputNavBar () {
      const softinputNavBar = this.__softinputNavBar
      if (softinputNavBar) {
        plusReady(() => {
          const currentWebview = plus.webview.currentWebview()
          currentWebview.setStyle({
            softinputNavBar
          })
        })
      }
    },
    onKeyboardHide () {
      UniViewJSBridge.unsubscribe('hideKeyboard', this.hideKeyboardTemp)
      document.removeEventListener('click', iosHideKeyboard, false)
      this.resetSoftinputNavBar()
    }
  }
}
