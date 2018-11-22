const _isSupport = !!window.navigator.vibrate

export function vibrateLong () {
  if (_isSupport && window.navigator.vibrate(400)) {
    return {
      errMsg: 'vibrateLong:ok'
    }
  } else {
    return {
      errMsg: 'vibrateLong:fail'
    }
  }
}

export function vibrateShort () {
  if (_isSupport && window.navigator.vibrate(15)) {
    return {
      errMsg: 'vibrateShort:ok'
    }
  } else {
    return {
      errMsg: 'vibrateShort:fail'
    }
  }
}
