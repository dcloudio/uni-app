const providers = {
  oauth: [],
  share: [],
  payment: [],
  push: []
}

if (qa.canIUse('getAccountProvider')) {
  providers.oauth.push(qa.getAccountProvider())
}

if (qa.canIUse('getVendorPaymentProvider')) {
  providers.payment.push(qa.getVendorPaymentProvider())
}

export default providers
