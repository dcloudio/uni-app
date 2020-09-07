import {
  plusReady
} from 'uni-shared'

/**
 * 保证iOS点击输入框外隐藏键盘
 */
function iosHideKeyboard () { }

function showSoftKeybord () {
  plusReady(() => {
    plus.key.showSoftKeybord()
  })
}

function setSoftinputTemporary (vm) {
  plusReady(() => {
    const currentWebview = plus.webview.currentWebview()
    const style = currentWebview.getStyle() || {}
    const rect = vm.$el.getBoundingClientRect()
    currentWebview.setSoftinputTemporary && currentWebview.setSoftinputTemporary({
      mode: style.softinputMode === 'adjustResize' ? 'adjustResize' : (vm.adjustPosition ? 'adjustPan' : 'nothing'),
      position: {
        top: rect.top,
        height: rect.height + (Number(vm.cursorSpacing) || 0)
      }
    })
  })
}

function setSoftinputNavBar (vm) {
  if (vm.showConfirmBar === 'auto') {
    delete vm.__softinputNavBar
    return
  }
  plusReady(() => {
    const currentWebview = plus.webview.currentWebview()
    const { softinputNavBar } = currentWebview.getStyle() || {}
    const showConfirmBar = softinputNavBar !== 'none'
    if (showConfirmBar !== vm.showConfirmBar) {
      vm.__softinputNavBar = softinputNavBar || 'auto'
      currentWebview.setStyle({
        softinputNavBar: vm.showConfirmBar ? 'auto' : 'none'
      })
    } else {
      delete vm.__softinputNavBar
    }
  })
}

function resetSoftinputNavBar (vm) {
  const softinputNavBar = vm.__softinputNavBar
  if (softinputNavBar) {
    plusReady(() => {
      const currentWebview = plus.webview.currentWebview()
      currentWebview.setStyle({
        softinputNavBar
      })
    })
  }
}

let isAndroid
let osVersion
if (__PLATFORM__ === 'app-plus') {
  plusReady(() => {
    isAndroid = plus.os.name.toLowerCase() === 'android'
    osVersion = plus.os.version
  })
}

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
      type: [Boolean, String],
      default: true
    },
    autoBlur: {
      type: [Boolean, String],
      default: true
    }
  },
  watch: {
    focus (val) {
      if (val && __PLATFORM__ === 'app-plus') {
        showSoftKeybord()
      }
    }
  },
  directives: {
    keyboard: {
      inserted (el, binding, vnode) {
        vnode.context.initKeyboard(el)
      }
    }
  },
  mounted () {
    if ((this.autoFocus || this.focus) && __PLATFORM__ === 'app-plus') {
      showSoftKeybord()
    }
  },
  methods: {
    initKeyboard (el) {
      let focus
      let keyboardHeight

      const keyboardChange = (event) => {
        keyboardHeight = event.height
        // 安卓切换不同键盘类型时会导致键盘收回，需重新设置
        if (focus && keyboardHeight === 0) {
          setSoftinputTemporary(this)
        }
        // 安卓/iOS13收起键盘时主动失去焦点
        if (this.autoBlur && focus && keyboardHeight === 0 && (isAndroid || parseInt(osVersion) >= 13)) {
          document.activeElement.blur()
        }
      }

      el.addEventListener('focus', () => {
        focus = true
        document.addEventListener('click', iosHideKeyboard, false)

        if (__PLATFORM__ === 'app-plus') {
          document.addEventListener('keyboardchange', keyboardChange, false)
          setSoftinputNavBar(this)
          setSoftinputTemporary(this)
        }
      })

      if (__PLATFORM__ === 'app-plus') {
        el.addEventListener('click', () => {
          if (focus && keyboardHeight === 0) {
            setSoftinputTemporary(this)
          }
        })
      }

      const onKeyboardHide = () => {
        document.removeEventListener('click', iosHideKeyboard, false)

        if (__PLATFORM__ === 'app-plus') {
          document.removeEventListener('keyboardchange', keyboardChange, false)
          resetSoftinputNavBar(this)
        }

        // 修复ios端显示与点击位置错位的Bug by:wyq
        if (String(navigator.vendor).indexOf('Apple') === 0) {
          document.documentElement.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollTop)
        }
      }

      el.addEventListener('blur', () => {
        focus = false
        onKeyboardHide()
      })

      this.$on('hook:beforeDestroy', () => {
        onKeyboardHide()
      })
    }
  }
}
