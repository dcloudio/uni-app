import { warpPlusErrorCallback } from '../../../helpers/plus'
import {
  API_REQUEST_PAYMENT,
  type API_TYPE_REQUEST_PAYMENT,
  RequestPaymentProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const requestPayment = defineAsyncApi<API_TYPE_REQUEST_PAYMENT>(
  API_REQUEST_PAYMENT,
  (params, { resolve, reject }) => {
    const provider = params.provider
    const errorCallback = warpPlusErrorCallback(reject)

    plus.payment.getChannels((services) => {
      const service = services.find(({ id }) => id === provider)
      if (!service) {
        reject('service not found')
      } else {
        plus.payment.request(
          service,
          params.orderInfo!,
          (res) => {
            resolve(res)
          },
          errorCallback
        )
      }
    }, errorCallback)
  },
  RequestPaymentProtocol
)
