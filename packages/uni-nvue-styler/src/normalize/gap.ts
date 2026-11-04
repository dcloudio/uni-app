import { type Normalize, supportedEnumReason } from '../utils'
import { normalizeLengthValue, normalizePercent } from './length'

export const normalizeGap: Normalize = (value, options) => {
  const text = String(value).trim()
  if (/^(calc|var|env)\(/i.test(text) && text.endsWith(')')) {
    return {
      value: text.replace(/^(calc|var|env)(?=\()/i, (name) =>
        name.toLowerCase()
      ),
    }
  }
  let result = normalizeLengthValue(text, options, !options.keepUnitPx)
  if (result.value === null) {
    result = normalizePercent(text, options)
  }
  const number = parseFloat(text)
  if (result.value !== null && Number.isFinite(number) && number >= 0) {
    return options.keepUnitPx ? { value: text } : result
  }
  return {
    value: null,
    reason(property, value) {
      return supportedEnumReason(property, value, [
        'non-negative length',
        'percentage',
      ])
    },
  }
}
