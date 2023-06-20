const service = {
  OAUTH: 'OAUTH',
  SHARE: 'SHARE',
  PAYMENT: 'PAYMENT',
  PUSH: 'PUSH'
}

export const getProvider = {
  service: {
    type: String,
    required: true,
    validator (value, params) {
      value = (value || '').toUpperCase()
      if (value && Object.values(service).indexOf(value) < 0) {
        return 'service error'
      }
    }
  }
}
