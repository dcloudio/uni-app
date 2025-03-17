export {
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  onError,
  offError,
} from '@dcloudio/uni-mp-core'
import { navigateTo as _navigateTo } from '@dcloudio/uni-mp-core'
export const navigateTo = _navigateTo()

export const requestPayment = {
  name: 'requestPayment',
  args: {
    orderInfo: 'orderStr',
  },
}
