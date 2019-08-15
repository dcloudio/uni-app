export function showKeyboard () {
  plus.key.showSoftKeybord()
  return {
    errMsg: 'showKeyboard:ok'
  }
}

export function hideKeyboard () {
  plus.key.hideSoftKeybord()
  return {
    errMsg: 'hideKeyboard:ok'
  }
}
