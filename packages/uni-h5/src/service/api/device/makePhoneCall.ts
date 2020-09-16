import {
  API_TYPE_ASYNC,
  createApi,
  MakePhoneCallProtocol
} from '@dcloudio/uni-api'

export const makePhoneCall = createApi<typeof uni.makePhoneCall>(
  { type: API_TYPE_ASYNC, name: 'makePhoneCall' },
  option => {
    window.location.href = `tel:${option.phoneNumber}`
  },
  MakePhoneCallProtocol
)
