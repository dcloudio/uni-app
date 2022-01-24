import { hyphenate, Normalize } from '../utils'

export const normalizeTransitionInterval: Normalize = (v) => {
  v = (v || 0).toString()
  let match, num

  if ((match = v.match(/^\d*\.?\d+(ms|s)?$/))) {
    num = parseFloat(match[0])
    if (!match[1]) {
      return { value: parseInt(num + '') }
    }
    if (match[1] === 's') {
      num *= 1000
    }
    return {
      value: parseInt(num + ''),
      reason(k, v, result) {
        return (
          'NOTE: property value `' + v + '` is autofixed to `' + result + '`'
        )
      },
    }
  }

  return {
    value: null,
    reason(k, v, result) {
      return (
        'ERROR: property value `' +
        v +
        '` is not supported for `' +
        hyphenate(k) +
        '` (only number of seconds and milliseconds is valid)'
      )
    },
  }
}
