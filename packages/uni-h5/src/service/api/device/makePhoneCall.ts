import { createAsyncApi, MakePhoneCallProtocol } from '@dcloudio/uni-api'

export const makePhoneCall = createAsyncApi<typeof uni.makePhoneCall>(
  'makePhoneCall',
  (option) => {
    window.location.href = `tel:${option.phoneNumber}`
  },
  MakePhoneCallProtocol
)
