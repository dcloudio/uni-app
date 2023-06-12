import { initGetProvider } from '@dcloudio/uni-mp-core'

export const getProvider = initGetProvider({
  oauth: ['xhs'],
  share: ['xhs'],
  payment: ['xhs'],
  push: ['xhs'],
})
