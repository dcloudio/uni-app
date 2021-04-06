import {
  API_MAKE_PHONE_CALL,
  defineAsyncApi,
  MakePhoneCallProtocol,
} from '@dcloudio/uni-api'

export const makePhoneCall = defineAsyncApi<typeof uni.makePhoneCall>(
  API_MAKE_PHONE_CALL,
  ({ phoneNumber }) => {
    window.location.href = `tel:${phoneNumber}`
    return Promise.resolve()
  },
  MakePhoneCallProtocol
)
