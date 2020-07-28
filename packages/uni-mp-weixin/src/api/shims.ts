import { initGetProvider } from '@dcloudio/uni-mp-core'

export const getProvider = initGetProvider({
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
})
