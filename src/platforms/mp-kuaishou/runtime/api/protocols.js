import navigateTo from 'uni-helpers/navigate-to'
import redirectTo from '../../../mp-weixin/helpers/redirect-to'
import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'
import getSystemInfo from '../../../mp-weixin/helpers/system-info'
import getUserProfile from '../../../mp-weixin/helpers/get-user-profile'

export const protocols = {
  navigateTo: navigateTo(),
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  getUserProfile,
  requestPayment: {
    name: ks.pay ? 'pay' : 'requestPayment',
    args (fromArgs) {
      if (typeof fromArgs === 'object') {
        // ks.pay 服务类型 id（固定值为 '1'）
        if (ks.pay && !fromArgs.serviceId) fromArgs.serviceId = '1'
      }
    }
  }
}
export const todos = [
  'vibrate'
]
export const canIUses = []
