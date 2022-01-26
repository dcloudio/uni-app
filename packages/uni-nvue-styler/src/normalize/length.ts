import {
  Normalize,
  LENGTH_REGEXP,
  SUPPORT_CSS_UNIT,
  supportedValueWithTipsReason,
  supportedUnitWithAutofixedReason,
} from '../utils'

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
          return supportedUnitWithAutofixedReason(unit, v, result)
        },
      }
    }
  }

  return {
    value: null,
    reason(k, v, result) {
      return supportedValueWithTipsReason(
        k,
        v,
        `(only number and pixel values are supported)`
      )
    },
  }
}
