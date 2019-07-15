const EPS = 1e-4
const BASE_DEVICE_WIDTH = 750
let isIOS = false
let deviceWidth = 0
let deviceDPR = 0

export function upx2px (number, newDeviceWidth) {
  number = Number(number)
  if (number === 0) {
    return 0
  }
  let result = (number / BASE_DEVICE_WIDTH) * (newDeviceWidth || deviceWidth)
  if (result < 0) {
    result = -result
  }
  result = Math.floor(result + EPS)
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1
    } else {
      return 0.5
    }
  }
  return number < 0 ? -result : result
}

export default function initUpx2px (nvue) {
  const env = nvue.config.env

  deviceDPR = env.scale
  deviceWidth = Math.ceil(env.deviceWidth / deviceDPR)
  isIOS = env.platform === 'iOS'
}
