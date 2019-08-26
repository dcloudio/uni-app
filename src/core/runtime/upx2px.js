const EPS = 1e-4
const BASE_DEVICE_WIDTH = 750
let isIOS = false
let deviceWidth = 0
let deviceDPR = 0

function checkDeviceWidth () {
  const {
    platform,
    pixelRatio,
    windowWidth
  } = __GLOBAL__.getSystemInfoSync() // uni=>__GLOBAL__ runtime 编译目标是 uni 对象，内部不允许直接使用 uni

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
