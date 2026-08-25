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

const DOM2_RENDER_CALC_PROPERTIES = new Set([
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'transform',
  'transformOrigin',
  'boxShadow',
  'textShadow',
  'backdropFilter',
  'opacity',
])

export function createNormalizeDom2RenderCalc(
  normalize: Normalize,
  property: string
): Normalize {
  if (!DOM2_RENDER_CALC_PROPERTIES.has(property)) {
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
