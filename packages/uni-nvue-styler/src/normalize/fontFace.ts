import {
  type Normalize,
  hyphenateStyleProperty,
  supportedPropertyReason,
} from '../utils'

export function normalizeFontFace(normalize: Normalize): Normalize {
  return (v, options, declInfo) => {
    if (declInfo?.atRule === 'font-face') {
      return {
        value: null,
        reason(k, v, result) {
          const items = ['font-family', 'src']
          const name = '@' + declInfo.atRule
          return (
            'ERROR: property `' +
            hyphenateStyleProperty(k) +
            '` is not supported for `' +
            name +
            '` (supported properties are: `' +
            items.join('`|`') +
            '`)'
          )
        },
      }
    }
    return normalize(v, options, declInfo)
  }
}

// 只有@font-face下的src属性才支持
export const normalizeSrc: Normalize = (v, options, declInfo) => {
  if (declInfo?.atRule === 'font-face') {
    return { value: v }
  }
  return {
    value: null,
    reason(k, v, result) {
      return supportedPropertyReason(k)
    },
  }
}
