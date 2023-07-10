import { Normalize, supportedEnumReason } from '../utils'

export const normalizeGradient: Normalize = (v) => {
  v = (v || '').toString()
  if (/^linear-gradient(.+)$/.test(v)) {
    return { value: v }
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return supportedEnumReason(k, v, ['gradient'])
    },
  }
}

export const normalizeUrl: Normalize = (v) => {
  v = (v || '').toString()
  if (/^url(.+)$/.test(v)) {
    return { value: v }
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return supportedEnumReason(k, v, ['url'])
    },
  }
}
