import {
  autofixedReason,
  Normalize,
  supportedValueWithTipsReason,
} from '../utils'

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
        return autofixedReason(v, result)
      },
    }
  }

  return {
    value: null,
    reason(k, v, result) {
      return supportedValueWithTipsReason(
        k,
        v,
        '(only number of seconds and milliseconds is valid)'
      )
    },
  }
}
