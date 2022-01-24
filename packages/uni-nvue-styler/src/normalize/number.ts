import { Normalize, hyphenate, LENGTH_REGEXP } from '../utils'

export const normalizeNumber: Normalize = (v) => {
  v = (v || '').toString()
  var match = v.match(LENGTH_REGEXP)

  if (match && !match[1]) {
    return { value: parseFloat(v) }
  }

  return {
    value: null,
    reason: function reason(k, v, result) {
      return (
        'ERROR: property value `' +
        v +
        '` is not supported for `' +
        hyphenate(k) +
        '` (only number is supported)'
      )
    },
  }
}
