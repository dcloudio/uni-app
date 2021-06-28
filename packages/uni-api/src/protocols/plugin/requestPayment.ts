export const API_REQUEST_PAYMENT = 'requestPayment'
export type API_TYPE_REQUEST_PAYMENT = typeof uni.requestPayment
export const RequestPaymentProtocol: ApiProtocol<API_TYPE_REQUEST_PAYMENT> = {
  provider: {
    type: String as any,
    required: true,
  },
  orderInfo: {
    type: [String, Object],
    required: true,
  },
  timeStamp: String,
  nonceStr: String,
  package: String,
  signType: String,
  paySign: String,
}
