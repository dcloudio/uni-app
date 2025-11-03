import { initGetProvider } from '@dcloudio/uni-mp-core'

const providers = {
  oauth: [] as string[],
  share: [],
  payment: [] as string[],
  push: [],
}

if (has.canIUse('login')) {
  providers.oauth.push('huawei')
}

if (has.canIUse('requestPayment')) {
  providers.payment.push('huawei')
}

export const getProvider = initGetProvider(providers)

export const navigateToMiniProgram = has.navigateToAtomicService
export const navigateBackMiniProgram = has.navigateBackAtomicService
