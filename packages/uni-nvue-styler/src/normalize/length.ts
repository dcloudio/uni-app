import { normalizeCssVar } from '.'
import {
  LENGTH_REGEXP,
  type Normalize,
  SUPPORT_CSS_UNIT,
  supportedEnumReason,
  supportedUnitWithAutofixedReason,
} from '../utils'

interface NormalizeLengthOptions {
  removePx?: boolean
  property?: string
}

function createNormalizeLength({
  removePx,
  property,
}: NormalizeLengthOptions = {}): Normalize {
  return (v, options) => {
    v = (v || '').toString()
    if (
      !v.includes('calc(') &&
      options.type === 'uvue' &&
      ((/var\([^)]+\)/.test(v) &&
        (/--uni-safe-area-inset-(top|bottom|left|right)/.test(v) ||
          /--status-bar-height/.test(v))) ||
        /--window-(top|bottom)/.test(v) ||
        /env\(([^)]+)\)/.test(v))
    ) {
      v = v.replace(/\s/g, '')
      return { value: normalizeCssVar(v, options.keepVar) }
    }

    const match = v.match(LENGTH_REGEXP)
    if (match) {
      var unit = match[1]
      const uvue = options.type === 'uvue'
      if (uvue) {
        if (!unit || (unit === 'px' && removePx)) {
          return { value: parseFloat(v) }
        } else if (
          unit === 'px' ||
          unit === 'rpx' ||
          // 只有line-height支持em单位
          (unit === 'em' && property === 'line-height')
        ) {
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
}

export const normalizeLength = createNormalizeLength({
  removePx: true,
})

export const normalizeLengthWithOptions = createNormalizeLength

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
