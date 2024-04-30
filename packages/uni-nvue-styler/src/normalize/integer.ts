import { type Normalize, supportedEnumReason } from '../utils'

export const normalizeInteger: Normalize = (v) => {
  v = (v || '').toString()
  if (v.match(/^[-+]?\d+$/)) {
    return { value: parseInt(v, 10) }
  }
  return {
    value: null,
    reason: function reason(k, v, result) {
      return supportedEnumReason(k, v, ['integer'])
    },
  }
}
