import { Normalize, supportedValueWithTipsReason } from '../utils'

export const normalizeFlexFlow: Normalize = (v) => {
  v = (v || '').toString()
  const values = v.split(/\s+/)
  // flex-flow 需要定义每一个属性值
  if (values.length === 1) {
    return {
      value: v,
      reason(k, v, result) {
        return supportedValueWithTipsReason(
          k,
          v,
          '(both property values must be explicitly defined)'
        )
      },
    }
  }
  return {
    value: v,
  }
}
