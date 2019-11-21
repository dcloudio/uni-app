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
    initKeyboard (el) {
      el.addEventListener('focus', () => {
        UniViewJSBridge.subscribe('hideKeyboard', hideKeyboard)
        document.addEventListener('click', iosHideKeyboard, false)
        this.setSoftinputTemporary()
      })
      el.addEventListener('blur', this.onKeyboardHide)
    },
    showSoftKeybord () {
      plusReady(() => {
        plus.key.showSoftKeybord()
      })
    },
    setSoftinputTemporary () {
      plusReady(() => {
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
