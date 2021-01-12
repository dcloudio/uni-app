import {
  plusReady
} from 'uni-shared'
import emitter from './emitter'

/**
 * 保证iOS点击输入框外隐藏键盘
 */
function iosHideKeyboard () { }

function setSoftinputTemporary (vm, reset) {
  plusReady(() => {
    const MODE_ADJUSTRESIZE = 'adjustResize'
    const MODE_ADJUSTPAN = 'adjustPan'
    const MODE_NOTHING = 'nothing'
    const currentWebview = plus.webview.currentWebview()
    const style = currentWebview.getStyle() || {}
    const options = {
      mode: (reset || style.softinputMode === MODE_ADJUSTRESIZE) ? MODE_ADJUSTRESIZE : (vm.adjustPosition ? MODE_ADJUSTPAN : MODE_NOTHING),
      position: {
        top: 0,
        height: 0
      }
    }
    if (options.mode === MODE_ADJUSTPAN) {
      const rect = vm.$el.getBoundingClientRect()
      options.position.top = rect.top
      options.position.height = rect.height + (Number(vm.cursorSpacing) || 0)
    }
    currentWebview.setSoftinputTemporary(options)
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

let resetTimer
let isAndroid
let osVersion
let keyboardHeight
let keyboardChangeCallback
if (__PLATFORM__ === 'app-plus') {
  plusReady(() => {
    isAndroid = plus.os.name.toLowerCase() === 'android'
    osVersion = plus.os.version
  })
  document.addEventListener('keyboardchange', function (event) {
    keyboardHeight = event.height
    keyboardChangeCallback && keyboardChangeCallback()
  }, false)
}

export default {
  name: 'Keyboard',
  mixins: [emitter],
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
      default: false
    }
  },
  directives: {
    keyboard: {
      inserted (el, binding, vnode) {
        vnode.context.initKeyboard(el)
      }
    }
  },
  methods: {
    initKeyboard (el) {
      let focus

      const keyboardChange = () => {
        this.$trigger('keyboardheightchange', {}, {
          height: keyboardHeight,
          duration: 0.25
        })
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
        clearTimeout(resetTimer)
        document.addEventListener('click', iosHideKeyboard, false)

        if (__PLATFORM__ === 'app-plus') {
          keyboardChangeCallback = keyboardChange
          if (keyboardHeight) {
            this.$trigger('keyboardheightchange', {}, {
              height: keyboardHeight,
              duration: 0
            })
          }
          setSoftinputNavBar(this)
          setSoftinputTemporary(this)
        }
      })

      if (__PLATFORM__ === 'app-plus') {
        // 安卓单独隐藏键盘后点击输入框不会触发 focus 事件
        el.addEventListener('click', () => {
          if (!this.disabled && focus && keyboardHeight === 0) {
            setSoftinputTemporary(this)
          }
        })
        if (!isAndroid && parseInt(osVersion) < 12) {
          // iOS12 以下系统 focus 事件设置较迟，改在 touchstart 设置
          el.addEventListener('touchstart', () => {
            if (!this.disabled && !focus) {
              setSoftinputTemporary(this)
            }
          })
        }
      }

      const onKeyboardHide = () => {
        document.removeEventListener('click', iosHideKeyboard, false)

        if (__PLATFORM__ === 'app-plus') {
          keyboardChangeCallback = null
          if (keyboardHeight) {
            this.$trigger('keyboardheightchange', {}, {
              height: 0,
              duration: 0
            })
          }
          resetSoftinputNavBar(this)
          if (isAndroid) {
            // 还原安卓软键盘配置，避免影响 web-view 组件
            resetTimer = setTimeout(() => {
              setSoftinputTemporary(this, true)
            }, 300)
          }
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
    }
  }
}
