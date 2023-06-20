import {
  onMethod
} from '../../../../../core/service/platform'

const isAndroid = plus.os.name.toLowerCase() === 'android'
const FOCUS_TIMEOUT = isAndroid ? 300 : 700
let keyboardHeight = 0
let onKeyboardShow
let focusTimer

export function hookKeyboardEvent (event, callback) {
  onKeyboardShow = null
  focusTimer && clearTimeout(focusTimer)
  if (event.type === 'focus') {
    if (keyboardHeight > 0) {
      event.detail.height = keyboardHeight
    } else {
      focusTimer = setTimeout(function () {
        event.detail.height = keyboardHeight
        callback(event)
      }, FOCUS_TIMEOUT)
      onKeyboardShow = function () {
        clearTimeout(focusTimer)
        event.detail.height = keyboardHeight
        callback(event)
      }
      return
    }
  }
  callback(event)
}

onMethod('onKeyboardHeightChange', res => {
  keyboardHeight = res.height
  if (keyboardHeight > 0) {
    const callback = onKeyboardShow
    onKeyboardShow = null
    callback && callback()
  }
})
