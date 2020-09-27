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
  } = uni.getSystemInfoSync()

  deviceWidth = windowWidth
  deviceDPR = pixelRatio
  isIOS = platform === 'ios'
}

function checkValue (value, defaultValue) {
  value = Number(value)
  return isNaN(value) ? defaultValue : value
}

export function upx2px (number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth()
  }

  number = Number(number)
  if (number === 0) {
    return 0
  }
  const config = __uniConfig.globalStyle || __uniConfig.window || {}
  const maxWidth = checkValue(config.rpxCalcMaxDeviceWidth, 960)
  const baseWidth = checkValue(config.rpxCalcBaseDeviceWidth, 375)
  const includeWidth = checkValue(config.rpxCalcIncludeWidth, 750)
  let width = newDeviceWidth || deviceWidth
  width = number === includeWidth || width <= maxWidth ? width : baseWidth
  let result = (number / BASE_DEVICE_WIDTH) * width
  if (result < 0) {
    result = -result
  }
  result = Math.floor(result + EPS)
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1
    } else {
      result = 0.5
    }
  }
  return number < 0 ? -result : result
}
