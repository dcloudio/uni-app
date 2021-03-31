import { defineAsyncApi, MakePhoneCallProtocol } from '@dcloudio/uni-api'

export const makePhoneCall = defineAsyncApi<typeof uni.makePhoneCall>(
  'makePhoneCall',
  (option) => {
    window.location.href = `tel:${option.phoneNumber}`
  },
  MakePhoneCallProtocol
)
