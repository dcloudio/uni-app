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
  providers.payment.push('harmonypay')
}

export const getProvider = initGetProvider(providers)
