import {
  API_MAKE_PHONE_CALL,
  type API_TYPE_MAKE_PHONE_CALL,
  MakePhoneCallProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const makePhoneCall = defineAsyncApi<API_TYPE_MAKE_PHONE_CALL>(
  API_MAKE_PHONE_CALL,
  ({ phoneNumber }, { resolve }) => {
    plus.device.dial(phoneNumber)
    return resolve()
  },
  MakePhoneCallProtocol
)
