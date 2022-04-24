import { Normalize, supportedValueWithTipsReason } from '../utils'

export const normalizeInteger: Normalize = (v) => {
  v = (v || '').toString()
  if (v.match(/^[-+]?\d+$/)) {
    return { value: parseInt(v, 10) }
  }
  return {
    value: null,
    reason: function reason(k, v, result) {
      return supportedValueWithTipsReason(k, v, `(only integer is supported)`)
    },
  }
}
