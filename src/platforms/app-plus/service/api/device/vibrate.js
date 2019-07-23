export function vibrateLong () {
  plus.device.vibrate(400)
  return {
    errMsg: 'vibrateLong:ok'
  }
}
export function vibrateShort () {
  plus.device.vibrate(15)
  return {
    errMsg: 'vibrateShort:ok'
  }
}
