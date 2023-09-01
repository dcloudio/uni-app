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
    const uvue = options.type === 'uvue'
    if (uvue) {
      if (!unit || unit === 'px') {
        // 移除 px
        return { value: parseFloat(v) }
      } else if (unit === 'rpx') {
        return { value: v }
      }
    } else {
      // nvue
      if (!unit || unit === 'px') {
        return { value: parseFloat(v) }
      }
      if (SUPPORT_CSS_UNIT.includes(unit)) {
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

export const normalizeLineHeight: Normalize = (v: string | number) => {
  v = (v || '').toString()
  const match = v.match(LENGTH_REGEXP)

  if (match) {
    var unit = match[1]
    if (!unit) {
      return { value: parseFloat(v) }
    } else if (['px', 'rpx', 'em'].includes(unit)) {
      return { value: v }
    }
  }

  return {
    value: null,
    reason(k, v, result) {
      return supportedEnumReason(k, v, ['number', 'pixel', 'em'])
    },
  }
}
