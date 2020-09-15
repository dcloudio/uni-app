import { createApi, MakePhoneCallProtocol } from '@dcloudio/uni-api'

export const makePhoneCall = createApi<typeof uni.makePhoneCall>(option => {
  window.location.href = `tel:${option.phoneNumber}`
}, MakePhoneCallProtocol)
