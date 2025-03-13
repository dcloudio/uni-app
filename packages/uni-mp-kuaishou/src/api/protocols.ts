import {
  navigateTo as _navigateTo,
  getSystemInfo,
  getSystemInfoSync,
  offError,
  onError,
  onSocketMessage,
  onSocketOpen,
  previewImage,
  redirectTo,
} from '@dcloudio/uni-mp-core'
import type { MPProtocol } from '@dcloudio/uni-mp-core'

const requestPayment: MPProtocol = {
  name: ks.pay ? 'pay' : 'requestPayment',
  args(fromArgs: Data, toArgs: Data) {
    if (typeof fromArgs === 'object') {
      // ks.pay 服务类型 id（固定值为 '1'）
      if (ks.pay && !fromArgs.serviceId) toArgs.serviceId = '1'
    }
  },
}

export {
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  requestPayment,
  onError,
  offError,
  onSocketOpen,
  onSocketMessage,
}

export const navigateTo = _navigateTo()
