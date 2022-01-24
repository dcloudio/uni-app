import { Normalize, hyphenate, LENGTH_REGEXP, SUPPORT_CSS_UNIT } from '../utils'

export const normalizeLength: Normalize = (v: string | number) => {
  v = (v || '').toString()
  const match = v.match(LENGTH_REGEXP)

  if (match) {
    var unit = match[1]
    if (!unit) {
      return { value: parseFloat(v) }
    } else if (SUPPORT_CSS_UNIT.indexOf(unit) > -1) {
      return { value: v }
    } else {
      return {
        value: parseFloat(v),
        reason(k, v, result) {
          return (
            'NOTE: unit `' +
            unit +
            '` is not supported and property value `' +
            v +
            '` is autofixed to `' +
            result +
            '`'
          )
        },
      }
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
        '` (only number and pixel values are supported)'
      )
    },
  }
}
