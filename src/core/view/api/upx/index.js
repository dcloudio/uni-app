const EPS = 1e-4
const BASE_DEVICE_WIDTH = 750
const isIOS = navigator.userAgent.match('iPhone')
let deviceWidth = global.innerWidth || global.screen.width || 375
let deviceDPR = global.devicePixelRatio || 2

export function checkDeviceWidth () {
  let newDeviceWidth = global.innerWidth || global.screen.width || 375
  const newDeviceDPR = global.devicePixelRatio || 2
  const newDeviceHeight = global.innerHeight || global.screen.height || 375
  if (global.screen.orientation && /^landscape/.test(global.screen.orientation.type || '')) {
    newDeviceWidth = newDeviceHeight
  }
  if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
    deviceWidth = newDeviceWidth
    deviceDPR = newDeviceDPR
  }
}

export function upx2px (number, newDeviceWidth) {
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
