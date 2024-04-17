import { ON_KEYBOARD_HEIGHT_CHANGE, type UniEvent } from '@dcloudio/uni-shared'

let focusTimeout = 0
let keyboardHeight = 0
let onKeyboardShow: (() => void) | null = null
let focusTimer: ReturnType<typeof setTimeout> | null = null

export function hookKeyboardEvent(
  event: UniEvent,
  callback: (event: UniEvent) => void
) {
  onKeyboardShow = null
  if (focusTimer) {
    clearTimeout(focusTimer)
    focusTimer = null
  }
  if (event.type === 'onFocus') {
    if (keyboardHeight > 0) {
      event.detail!.height = keyboardHeight
    } else {
      focusTimer = setTimeout(function () {
        event.detail!.height = keyboardHeight
        callback(event)
      }, focusTimeout)
      onKeyboardShow = function () {
        if (focusTimer) {
          clearTimeout(focusTimer)
          focusTimer = null
        }
        event.detail!.height = keyboardHeight
        callback(event)
      }
      return
    }
  }
  callback(event)
}

export function initKeyboardEvent() {
  const isAndroid = plus.os.name!.toLowerCase() === 'android'
  focusTimeout = isAndroid ? 300 : 700

  UniServiceJSBridge.on(
    ON_KEYBOARD_HEIGHT_CHANGE,
    (res: { height: number }) => {
      keyboardHeight = res.height
      if (keyboardHeight > 0) {
        const callback = onKeyboardShow
        onKeyboardShow = null
        if (callback) {
          callback()
        }
      }
    }
  )
}
