import { type Normalize, supportedEnumReason } from '../utils'

const MAX_F32_VALUE = 3.4028234663852886e38
const blurRE = /^blur\(\s*(-?(?:\d*\.\d+|\d+\.?\d*))(%|[a-zA-Z]+)?\s*\)$/

export const normalizeBackdropFilter: Normalize = (v) => {
  v = (v || '').toString()
  if (v === 'none') {
    return { value: v }
  }

  const match = v.match(blurRE)
  if (match) {
    const value = parseFloat(match[1])
    const unit = match[2]?.toLowerCase()
    if (
      Number.isFinite(value) &&
      value >= 0 &&
      value <= MAX_F32_VALUE &&
      (unit === 'px' || unit === 'rpx' || (!unit && value === 0))
    ) {
      return { value: v }
    }
  }

  return {
    value: null,
    reason(k, v) {
      return supportedEnumReason(k, v, ['none', 'blur()'])
    },
  }
}
