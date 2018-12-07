const EPS = 1e-4
const BASE_DEVICE_WIDTH = 750
let isIOS = false
let deviceWidth = 0
let deviceDPR = 0

export function checkDeviceWidth () {
  const {
    platform,
    pixelRatio,
    windowWidth
  } = uni.getSystemInfoSync()

  deviceWidth = windowWidth
  deviceDPR = pixelRatio
  isIOS = platform === 'ios'
}

export function upx2px (number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth()
  }

  number = Number(number)
  if (number === 0) {
    return 0
  }
  number = (number / BASE_DEVICE_WIDTH) * (newDeviceWidth || deviceWidth)
  number = Math.floor(number + EPS)
  if (number === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1
    } else {
      return 0.5
    }
  }
  return number
}
