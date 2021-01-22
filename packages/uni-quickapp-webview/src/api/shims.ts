import { initGetProvider } from '@dcloudio/uni-mp-core'

const providers = {
  oauth: [] as string[],
  share: [],
  payment: [] as string[],
  push: [],
}

if (qa.canIUse('getAccountProvider')) {
  providers.oauth.push(qa.getAccountProvider() as string)
}

if (qa.canIUse('getVendorPaymentProvider')) {
  providers.payment.push(qa.getVendorPaymentProvider() as string)
}

export const getProvider = initGetProvider(providers)
