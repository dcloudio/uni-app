import {
  Normalize,
  LENGTH_REGEXP,
  SUPPORT_CSS_UNIT,
  supportedValueWithTipsReason,
  supportedUnitWithAutofixedReason,
} from '../utils'

export const normalizeLength = createNormalizeLength()
export const normalizeLengthWithPercent = createNormalizeLength({
  percent: true,
})
export const normalizeLengthWithAutoAndPercent = createNormalizeLength({
  auto: true,
  percent: true,
})

interface NormalizeLengthOptions {
  percent?: boolean
  auto?: boolean
}

function createNormalizeLength(
  options: NormalizeLengthOptions = {}
): Normalize {
  return (v: string | number) => {
    v = (v || '').toString()
    const match = v.match(LENGTH_REGEXP)

    if (match) {
      var unit = match[1]
      if (!unit || unit === 'px') {
        return { value: parseFloat(v) }
      } else if (
        SUPPORT_CSS_UNIT.includes(unit) ||
        (options.percent && unit === '%')
      ) {
        return { value: v }
      } else {
        return {
          value: parseFloat(v),
          reason(k, v, result) {
            return supportedUnitWithAutofixedReason(unit, v, result)
          },
        }
      }
    } else {
      if (options.auto && v === 'auto') {
        return { value: v }
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
}
