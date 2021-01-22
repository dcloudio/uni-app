import { initGetProvider } from '@dcloudio/uni-mp-core'

export const getProvider = initGetProvider({
  oauth: ['qq'],
  share: ['qq'],
  payment: ['qqpay'],
  push: ['qq'],
})
