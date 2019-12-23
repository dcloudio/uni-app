import {
  onMethod,
  getCurrentPageId
} from '../../../../../core/service/platform'

const isAndroid = plus.os.name.toLowerCase() === 'android'
const FOCUS_TIMEOUT = isAndroid ? 300 : 700
const HIDE_TIMEOUT = 300
let keyboardHeight = 0
let onKeyboardShow
let focusTimer
let hideKeyboardTimeout

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
    onKeyboardShow && onKeyboardShow()
    if (hideKeyboardTimeout) {
      clearTimeout(hideKeyboardTimeout)
      hideKeyboardTimeout = null
    }
  } else {
    // 安卓/iOS13收起键盘时通知view层失去焦点
    if (isAndroid || parseInt(plus.os.version) >= 13) {
      hideKeyboardTimeout = setTimeout(function () {
        hideKeyboardTimeout = null
        var pageId = getCurrentPageId()
        UniServiceJSBridge.publishHandler('hideKeyboard', {}, pageId)
      }, HIDE_TIMEOUT)
    }
  }
})
