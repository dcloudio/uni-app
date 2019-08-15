export function getScreenBrightness () {
  return {
    errMsg: 'getScreenBrightness:ok',
    value: plus.screen.getBrightness()
  }
}

export function setScreenBrightness ({
  value
} = {}) {
  plus.screen.setBrightness(value)
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
