import { type Normalize, supportedEnumReason } from '../utils'

const DOM2_CALC_PROPERTIES = new Set([
  'width',
  'height',
  'top',
  'right',
  'bottom',
  'left',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
])

export function normalizeCalc(
  value: string,
  property: string | undefined,
  options: Parameters<Normalize>[1]
): ReturnType<Normalize> | undefined {
  const normalizedValue = value.trim()
  if (!/^calc\(/i.test(normalizedValue)) {
    return
  }
  const canonicalValue = `calc${normalizedValue.slice(4)}`
  if (
    options.type === 'uvue' &&
    options.dom2 &&
    property &&
    DOM2_CALC_PROPERTIES.has(property)
  ) {
    return { value: canonicalValue }
  }
  return {
    value: null,
    reason(k, v, result) {
      return supportedEnumReason(k, v, ['number', 'pixel'])
    },
  }
}
