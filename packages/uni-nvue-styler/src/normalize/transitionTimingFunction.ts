import { hyphenate, NUM_REGEXP, Normalize } from '../utils'

export const normalizeTransitionTimingFunction: Normalize = (v) => {
  v = (v || '').toString()

  if (v.match(/^linear|ease|ease-in|ease-out|ease-in-out$/)) {
    return { value: v }
  }

  let match

  if (
    (match = v.match(
      /^cubic-bezier\(\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*\)$/
    ))
  ) {
    if (
      match[1].match(NUM_REGEXP) &&
      match[2].match(NUM_REGEXP) &&
      match[3].match(NUM_REGEXP) &&
      match[4].match(NUM_REGEXP)
    ) {
      const ret = [
        parseFloat(match[1]),
        parseFloat(match[2]),
        parseFloat(match[3]),
        parseFloat(match[4]),
      ].join(',')
      return { value: 'cubic-bezier(' + ret + ')' }
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
        '` (supported values are: `linear`|`ease`|`ease-in`|`ease-out`|`ease-in-out`|`cubic-bezier(n,n,n,n)`)'
      )
    },
  }
}
