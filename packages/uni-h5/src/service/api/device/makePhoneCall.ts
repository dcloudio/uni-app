import { createApi, MakePhoneCallProtocol } from '@dcloudio/uni-api'

export const makePhoneCall = createApi(
  ({ phoneNumber }: { phoneNumber: string }) => {
    window.location.href = `tel:${phoneNumber}`
    return {
      errMsg: 'makePhoneCall:ok'
    }
  },
  MakePhoneCallProtocol
)
