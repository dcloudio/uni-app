import {
  LENGTH_REGEXP,
  type Normalize,
  type NormalizeOptions,
  SUPPORT_CSS_UNIT,
  supportedEnumReason,
  supportedUnitWithAutofixedReason,
} from '../utils'

interface NormalizeLengthOptions {
  removePx?: boolean
  property?: string
}

const handleNormalizeLength = (
  v: string | number,
  options: NormalizeOptions,
  removePx?: boolean,
  property?: string
) => {
  v = (v || '').toString()
  // css 变量
  if (v.includes('CSS_VAR_')) {
    return { value: v }
  }

  const isCSSVar = /var\([^)]+\)/.test(v)
  const isEnv = /env\([^)]+\)/.test(v)
  const isCalc = /calc\([^)]+\)/.test(v)

  if (isEnv) {
    if (!isCalc) {
      v = v.replace(/\s/g, '')
    }
    return { value: v }
  }

  if (isCSSVar) {
    const isCSSVarWithSafeAreaInset =
      /--uni-safe-area-inset-(top|bottom|left|right)/.test(v)
    const isCSSVarWithStatusBarHeight = /--status-bar-height/.test(v)
    const isCSSVarWindowTop = /--window-top/.test(v)
    const isCSSVarWindowBottom = /--window-bottom/.test(v)

    const isCalc = /calc\([^)]+\)/.test(v)
    if (isCalc) {
      return { value: v }
    }

    if (
      isCSSVarWithSafeAreaInset ||
      isCSSVarWithStatusBarHeight ||
      isCSSVarWindowTop ||
      isCSSVarWindowBottom
    ) {
      v = v.replace(/\s/g, '')
      return { value: v }
    }
  }

  const match = v.match(LENGTH_REGEXP)
  if (match) {
    var unit = match[1]
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
  }

  return {
    value: null,
    reason(k: string, v: string | number, result: string | number | null) {
      return supportedEnumReason(k, v, ['number', 'pixel'])
    },
  }
}
const handleNormalizeLengthNvue = (
  v: string | number,
  options: NormalizeOptions,
  removePx?: boolean,
  property?: string
) => {
  v = (v || '').toString()
  // css 变量
  if (v.includes('CSS_VAR_')) {
    return { value: v }
  }

  const match = v.match(LENGTH_REGEXP)
  if (match) {
    var unit = match[1]
    // nvue
    if (!unit || unit === 'px') {
      return { value: parseFloat(v) }
    }
    if (SUPPORT_CSS_UNIT.includes(unit)) {
      return { value: v }
    } else {
      return {
        value: parseFloat(v),
        reason(k: string, v: string | number, result: string | number | null) {
          return supportedUnitWithAutofixedReason(unit, v, result)
        },
      }
    }
  }

  return {
    value: null,
    reason(k: string, v: string | number, result: string | number | null) {
      return supportedEnumReason(k, v, ['number', 'pixel'])
    },
  }
}

function createNormalizeLength({
  removePx,
  property,
}: NormalizeLengthOptions = {}): Normalize {
  return (v, options) => {
    const uvue = options.type === 'uvue'

    if (uvue) {
      return handleNormalizeLength(v, options, removePx, property)
    } else {
      return handleNormalizeLengthNvue(v, options, removePx, property)
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
