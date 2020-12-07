import {
  invoke
} from '../../bridge'

import {
  warpPlusErrorCallback
} from '../util'

export function requestPayment (params, callbackId) {
  const provider = params.provider
  const errorCallback = warpPlusErrorCallback(callbackId, 'requestPayment')

  plus.payment.getChannels(services => {
    const service = services.find(({
      id
    }) => id === provider)
    if (!service) {
      invoke(callbackId, {
        errMsg: 'requestPayment:fail 支付服务[' + provider + ']不存在'
      })
    } else {
      plus.payment.request(service, params.orderInfo, res => {
        res.errMsg = 'requestPayment:ok'
        invoke(callbackId, res)
      }, errorCallback)
    }
  }, errorCallback)
}
