import { initGetProvider } from '@dcloudio/uni-mp-core'

export const getProvider = initGetProvider({
  oauth: ['kuaishou'],
  share: ['kuaishou'],
  payment: ['kuaishoupay'],
  push: ['kuaishou'],
})
