const provider = {
  UNIVERIFY: 'univerify'
}

export const preLogin = {
  provider: {
    type: String,
    required: true,
    default: provider.UNIVERIFY,
    validator (value, params) {
      if (Object.values(provider).indexOf(value) < 0) {
        return 'provider error'
      }
    }
  }
}
