const providers = {
  oauth: ['huawei'],
  share: ['huawei'],
  payment: ['huawei'],
  push: ['huawei']
}

if (has.canIUse('getAccountProvider')) {
  providers.oauth.push(has.getAccountProvider())
}

if (has.canIUse('getVendorPaymentProvider')) {
  providers.payment.push(has.getVendorPaymentProvider())
}

export default providers
