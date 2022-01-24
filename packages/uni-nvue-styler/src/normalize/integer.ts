import { hyphenate, Normalize } from '../utils'

export const normalizeInteger: Normalize = (v) => {
  v = (v || '').toString()
  if (v.match(/^[-+]?\d+$/)) {
    return { value: parseInt(v, 10) }
  }
  return {
    value: null,
    reason: function reason(k, v, result) {
      return (
        'ERROR: property value `' +
        v +
        '` is not supported for `' +
        hyphenate(k) +
        '` (only integer is supported)'
      )
    },
  }
}
