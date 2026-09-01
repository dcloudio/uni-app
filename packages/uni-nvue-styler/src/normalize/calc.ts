import { camelize } from '@vue/shared'
import { type Normalize, supportedEnumReason } from '../utils'

const DOM2_CALC_PROPERTIES = [
  'width',
  'height',
  'min-width',
  'min-height',
  'max-width',
  'max-height',
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
  'flex-basis',
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-width',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'transform',
  'transform-origin',
  'box-shadow',
  'text-shadow',
  'backdrop-filter',
  'opacity',
  'font-size',
  'line-height',
  'z-index',
] as const

const DOM2_CALC_PROPERTY_SET = new Set<string>(DOM2_CALC_PROPERTIES)
const DOM2_CAMELIZED_CALC_PROPERTY_SET = new Set(
  DOM2_CALC_PROPERTIES.map(camelize)
)

export function createNormalizeDom2Calc(
  normalize: Normalize,
  property: string
): Normalize {
  if (!DOM2_CAMELIZED_CALC_PROPERTY_SET.has(property)) {
    return normalize
  }
  return (value, options, context) => {
    const stringValue = (value || '').toString()
    if (/calc\(/i.test(stringValue)) {
      return { value: stringValue.replace(/calc\(/gi, 'calc(') }
    }
    return normalize(value, options, context)
  }
}

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
    DOM2_CALC_PROPERTY_SET.has(property)
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
