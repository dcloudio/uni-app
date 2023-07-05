import {
  Normalize,
  LENGTH_REGEXP,
  SUPPORT_CSS_UNIT,
  supportedUnitWithAutofixedReason,
  supportedEnumReason,
} from '../utils'

export const normalizeLength: Normalize = (v: string | number, options) => {
  v = (v || '').toString()
  const match = v.match(LENGTH_REGEXP)

  if (match) {
    var unit = match[1]
    if (!unit || unit === 'px') {
      return { value: parseFloat(v) }
    } else if (SUPPORT_CSS_UNIT.includes(unit)) {
      return { value: v }
    } else if (options.type === 'nvue' || unit !== '%') {
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
      return supportedEnumReason(k, v, ['number', 'pixel'])
    },
  }
}

export const normalizePercent: Normalize = (v: string | number) => {
  v = (v || '').toString()
  const match = v.match(LENGTH_REGEXP)

  if (match) {
    var unit = match[1]
    if (unit === '%') {
      return { value: v }
    }
  }

  return {
    value: null,
    reason(k, v, result) {
      return supportedEnumReason(k, v, ['percent'])
    },
  }
}
