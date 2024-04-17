import {
  type Normalize,
  compatibilityReason,
  defaultValueReason,
  supportedEnumReason,
} from '../utils'

export const normalizeFlexWrap: Normalize = (v) => {
  const values = ['nowrap', 'wrap', 'wrap-reverse']
  const index = values.indexOf(v as string)
  if (index > 0) {
    return {
      value: v,
      reason(k, v, result) {
        return compatibilityReason(k)
      },
    }
  }
  if (index === 0) {
    return {
      value: v,
      reason: function reason(k, v, result) {
        return defaultValueReason(k, v)
      },
    }
  }
  return {
    value: null,
    reason(k, v, result) {
      return supportedEnumReason(k, v, values)
    },
  }
}
