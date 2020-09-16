import { API_TYPE_SYNC, createApi } from '../../helpers/api'
import { Upx2pxProtocol } from '../../protocols/base/upx2px'

const EPS = 1e-4
const BASE_DEVICE_WIDTH = 750
let isIOS = false
let deviceWidth = 0
let deviceDPR = 0

function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = __GLOBAL__.getSystemInfoSync()
  deviceWidth = windowWidth as number
  deviceDPR = pixelRatio as number
  isIOS = platform === 'ios'
}

export const upx2px = createApi<typeof uni.upx2px>(
  { type: API_TYPE_SYNC, name: 'upx2px' },
  (number, newDeviceWidth?: number) => {
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
  },
  Upx2pxProtocol
)
