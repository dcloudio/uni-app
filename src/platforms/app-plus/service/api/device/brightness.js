export function getScreenBrightness () {
  return {
    errMsg: 'getScreenBrightness:ok',
    value: plus.screen.getBrightness(false)
  }
}

export function setScreenBrightness ({
  value
} = {}) {
  plus.screen.setBrightness(value, false)
  return {
    errMsg: 'setScreenBrightness:ok'
  }
}

export function setKeepScreenOn ({
  keepScreenOn
} = {}) {
  plus.device.setWakelock(!!keepScreenOn)
  return {
    errMsg: 'setKeepScreenOn:ok'
  }
}
