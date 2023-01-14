import { Ref, watch, computed } from 'vue'
import { CustomEventTrigger } from './useEvent'
import { plusReady } from '@dcloudio/uni-shared'

let resetTimer: ReturnType<typeof setTimeout>
let isAndroid: boolean
let osVersion: string
let keyboardHeight: number
let keyboardChangeCallback: Function | null
let webviewStyle: PlusWebviewWebviewStyles
interface KeyboardChangeEvent extends Event {
  height: number
}
if (__PLATFORM__ === 'app') {
  plusReady(() => {
    isAndroid = plus.os.name === 'Android'
    osVersion = plus.os.version || ''
  })
  document.addEventListener(
    'keyboardchange',
    function (event: Event) {
      keyboardHeight = (event as KeyboardChangeEvent).height
      keyboardChangeCallback && keyboardChangeCallback()
    },
    false
  )
}

/**
 * 保证iOS点击输入框外隐藏键盘
 */
function iosHideKeyboard() {}

function setSoftinputTemporary(
  props: { cursorSpacing: number | string; adjustPosition: any },
  el: HTMLElement,
  reset?: boolean
) {
  plusReady(() => {
    const MODE_ADJUSTRESIZE = 'adjustResize'
    const MODE_ADJUSTPAN = 'adjustPan'
    const MODE_NOTHING = 'nothing'
    const currentWebview = plus.webview.currentWebview()
    const style = webviewStyle || currentWebview.getStyle() || {}
    const options = {
      mode:
        reset || style.softinputMode === MODE_ADJUSTRESIZE
          ? MODE_ADJUSTRESIZE
          : props.adjustPosition
          ? MODE_ADJUSTPAN
          : MODE_NOTHING,
      position: {
        top: 0,
        height: 0,
      },
    }
    if (options.mode === MODE_ADJUSTPAN) {
      const rect = el.getBoundingClientRect()
      options.position.top = rect.top
      options.position.height = rect.height + (Number(props.cursorSpacing) || 0)
    }
    currentWebview.setSoftinputTemporary(options)
  })
}

function setSoftinputNavBar(
  props: { showConfirmBar: any },
  state: KeyboardState
) {
  if (props.showConfirmBar === 'auto') {
    delete state.softinputNavBar
    return
  }
  plusReady(() => {
    const currentWebview = plus.webview.currentWebview()
    const { softinputNavBar } = currentWebview.getStyle() || {}
    const showConfirmBar = softinputNavBar !== 'none'
    if (showConfirmBar !== props.showConfirmBar) {
      state.softinputNavBar = softinputNavBar || 'auto'
      currentWebview.setStyle({
        softinputNavBar: props.showConfirmBar ? 'auto' : 'none',
      })
    } else {
      delete state.softinputNavBar
    }
  })
}

function resetSoftinputNavBar(state: KeyboardState) {
  const softinputNavBar = state.softinputNavBar
  if (softinputNavBar) {
    plusReady(() => {
      const currentWebview = plus.webview.currentWebview()
      currentWebview.setStyle({
        softinputNavBar,
      })
    })
  }
}

interface KeyboardState {
  softinputNavBar?: any
}

export const props = {
  cursorSpacing: {
    type: [Number, String],
    default: 0,
  },
  showConfirmBar: {
    type: [Boolean, String],
    default: 'auto',
  },
  adjustPosition: {
    type: [Boolean, String],
    default: true,
  },
  autoBlur: {
    type: [Boolean, String],
    default: false,
  },
}

export const emit = ['keyboardheightchange']

interface Props extends Record<keyof typeof props, any> {
  disabled?: any
  readOnly?: any
}

export function useKeyboard(
  props: Props,
  elRef: Ref<HTMLElement | null>,
  trigger: CustomEventTrigger
) {
  const state = {}
  function initKeyboard(el: HTMLElement) {
    let focus: boolean
    const isApple = computed(
      () => String(navigator.vendor).indexOf('Apple') === 0
    )

    const keyboardChange = () => {
      trigger('keyboardheightchange', {} as Event, {
        height: keyboardHeight,
        duration: 0.25,
      })
      // 安卓切换不同键盘类型时会导致键盘收回，需重新设置
      if (focus && keyboardHeight === 0) {
        setSoftinputTemporary(props, el)
      }
      // 安卓/iOS13收起键盘时主动失去焦点
      if (
        props.autoBlur &&
        focus &&
        keyboardHeight === 0 &&
        (isAndroid || parseInt(osVersion) >= 13)
      ) {
        ;(document.activeElement as HTMLElement).blur()
      }
    }

    el.addEventListener('focus', () => {
      focus = true
      clearTimeout(resetTimer)
      document.addEventListener('click', iosHideKeyboard, false)

      if (__PLATFORM__ === 'app') {
        keyboardChangeCallback = keyboardChange
        if (keyboardHeight) {
          trigger('keyboardheightchange', {} as Event, {
            height: keyboardHeight,
            duration: 0,
          })
        }
        setSoftinputNavBar(props, state)
        setSoftinputTemporary(props, el)
      }
    })

    if (__PLATFORM__ === 'app') {
      // 安卓单独隐藏键盘后点击输入框不会触发 focus 事件
      if (isAndroid) {
        el.addEventListener('click', () => {
          if (
            !props.disabled &&
            !props.readOnly &&
            focus &&
            keyboardHeight === 0
          ) {
            setSoftinputTemporary(props, el)
          }
        })
      }
      if (!isAndroid) {
        if (parseInt(osVersion) < 12) {
          // iOS12 以下系统 focus 事件设置较迟，改在 touchstart 设置
          el.addEventListener('touchstart', () => {
            if (!props.disabled && !props.readOnly && !focus) {
              setSoftinputTemporary(props, el)
            }
          })
        }
        // iOS 14.6 调用同步方法导致键盘弹卡顿
        if (parseFloat(osVersion) >= 14.6 && !webviewStyle) {
          plusReady(() => {
            const currentWebview = plus.webview.currentWebview()
            webviewStyle = currentWebview.getStyle() || {}
          })
        }
      }
    }

    const onKeyboardHide = () => {
      document.removeEventListener('click', iosHideKeyboard, false)

      if (__PLATFORM__ === 'app') {
        keyboardChangeCallback = null
        if (keyboardHeight) {
          trigger('keyboardheightchange', {} as Event, {
            height: 0,
            duration: 0,
          })
        }
        resetSoftinputNavBar(state)
        if (isAndroid) {
          // 还原安卓软键盘配置，避免影响 web-view 组件
          resetTimer = setTimeout(() => {
            setSoftinputTemporary(props, el, true)
          }, 300)
        }
      }

      // 修复ios端显示与点击位置错位的Bug by:wyq
      if (isApple.value) {
        document.documentElement.scrollTo(
          document.documentElement.scrollLeft,
          document.documentElement.scrollTop
        )
      }
    }

    el.addEventListener('blur', () => {
      // 在iOS设备上，手动调用uni.hideKeyboard()，键盘收起并且触发blur，但实际并没有blur。
      // 此时如果再点击页面其他地方会重新聚焦，此处做处理
      if (isApple.value) {
        el.blur()
      }
      focus = false
      onKeyboardHide()
    })
  }
  watch(
    () => elRef.value,
    (el) => el && initKeyboard(el)
  )
}
