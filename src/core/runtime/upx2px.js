const EPS = 1e-4
const BASE_DEVICE_WIDTH = 750
let isIOS = false
let deviceWidth = 0
let deviceDPR = 0

function checkDeviceWidth () {
  let windowWidth, pixelRatio, platform

  if (__PLATFORM__ === 'mp-weixin') {
    const windowInfo = typeof wx.getWindowInfo === 'function' && wx.getWindowInfo() ? wx.getWindowInfo() : wx.getSystemInfoSync()
    const deviceInfo = typeof wx.getDeviceInfo === 'function' && wx.getDeviceInfo() ? wx.getDeviceInfo() : wx.getSystemInfoSync()

    windowWidth = windowInfo.windowWidth
    pixelRatio = windowInfo.pixelRatio
    platform = deviceInfo.platform
  } else {
    const baseInfo = __GLOBAL__.getSystemInfoSync()
    windowWidth = baseInfo.windowWidth
    pixelRatio = baseInfo.pixelRatio
    platform = baseInfo.platform
  }

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
      result = 1
    } else {
      result = 0.5
    }
  }
  return number < 0 ? -result : result
}
