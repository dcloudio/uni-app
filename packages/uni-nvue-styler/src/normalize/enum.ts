import { hyphenate, Normalize } from '../utils'

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
      reason: function reason(k, v, result) {
        return (
          'ERROR: property value `' +
          v +
          '` is not supported for `' +
          hyphenate(k) +
          '` (supported values are: `' +
          items.join('`|`') +
          '`)'
        )
      },
    }
  }
}
