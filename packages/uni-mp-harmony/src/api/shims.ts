import { initGetProvider } from '@dcloudio/uni-mp-core'

const providers = {
  oauth: [] as string[],
  share: [],
  payment: [] as string[],
  push: [],
}

export const getProvider = initGetProvider(providers)
