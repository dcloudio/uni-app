import { hyphenate, Normalize } from '../utils'

export const normalizeFlexWrap: Normalize = (v) => {
  const values = ['nowrap', 'wrap', 'wrap-reverse']
  const index = values.indexOf(v as string)
  if (index > 0) {
    return {
      value: v,
      reason(k, v, result) {
        return (
          'NOTE: the ' +
          hyphenate(k) +
          ' property may have compatibility problem on native'
        )
      },
    }
  }
  if (index === 0) {
    return {
      value: v,
      reason: function reason(k, v, result) {
        return (
          'NOTE: property value `' +
          v +
          '` is the DEFAULT value for `' +
          hyphenate(k) +
          '` (could be removed)'
        )
      },
    }
  }
  return {
    value: null,
    reason(k, v, result) {
      return (
        'ERROR: property value `' +
        v +
        '` is not supported for `' +
        hyphenate(k) +
        '` (supported values are: `' +
        values.join('`|`') +
        '`)'
      )
    },
  }
}
