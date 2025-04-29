import { getBaseSystemInfo } from '@dcloudio/uni-platform'
import { defineSyncApi } from '../../helpers/api'
import {
  type API_TYPE_UPX2PX,
  API_UPX2PX,
  Upx2pxProtocol,
} from '../../protocols/base/upx2px'

const EPS = 1e-4
const BASE_DEVICE_WIDTH = 750
let isIOS = false
let deviceWidth = 0
let deviceDPR = 0
let maxWidth = 960
let baseWidth = 375
let includeWidth = 750

function checkDeviceWidth() {
  let windowWidth: number, pixelRatio: number, platform: string

  if (__PLATFORM__ === 'mp-weixin') {
    const windowInfo = wx.getWindowInfo?.() ?? wx.getSystemInfoSync()
    const deviceInfo = wx.getDeviceInfo?.() ?? wx.getSystemInfoSync()

    windowWidth = windowInfo.windowWidth
    pixelRatio = windowInfo.pixelRatio
    platform = deviceInfo.platform
  } else {
    const { windowWidth: w, pixelRatio: p, platform: pf } = getBaseSystemInfo()
    windowWidth = w
    pixelRatio = p
    platform = pf
  }

  deviceWidth = windowWidth as number
  deviceDPR = pixelRatio as number
  isIOS = (platform as string) === 'ios'
}

function checkValue(value: unknown, defaultValue: number) {
  const newValue = Number(value) as number
  return isNaN(newValue) ? defaultValue : newValue
}

function checkMaxWidth() {
  const config = __uniConfig.globalStyle || {}

  maxWidth = checkValue(config.rpxCalcMaxDeviceWidth, 960)
  baseWidth = checkValue(config.rpxCalcBaseDeviceWidth, 375)
  includeWidth = checkValue(config.rpxCalcBaseDeviceWidth, 750)
}

export const upx2px = defineSyncApi<API_TYPE_UPX2PX>(
  API_UPX2PX,
  (number, newDeviceWidth?: number) => {
    // ssr nodejs 中，暂不支持 rpx,upx 转 px
    if (__NODE_JS__) {
      return number
    }
    if (deviceWidth === 0) {
      checkDeviceWidth()
      if (__PLATFORM__ === 'app' || __PLATFORM__ === 'h5') {
        checkMaxWidth()
      }
    }

    number = Number(number)
    if (number === 0) {
      return 0
    }
    let width = newDeviceWidth || deviceWidth
    if (__PLATFORM__ === 'app' || __PLATFORM__ === 'h5') {
      width = number === includeWidth || width <= maxWidth ? width : baseWidth
    }
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
  },
  Upx2pxProtocol
)
