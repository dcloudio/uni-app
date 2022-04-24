import { defaultValueReason, Normalize, supportedEnumReason } from '../utils'

export function createEnumNormalize(items: Array<string | number>): Normalize {
  return (v) => {
    const index = items.indexOf(v)
    if (index > 0) {
      return { value: v }
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
      reason: function reason(k, v, result) {
        return supportedEnumReason(k, v, items)
      },
    }
  }
}
