import type { DOM2_APP_LANGUAGE } from '../types'
import { parseUnitValue, toUnitValueCode } from './unit'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
} from './utils'

const TRANSFORM_ORIGIN_TYPES = ['UniNativeTransformOrigin']

export function isTransformOriginType(propertyType?: string) {
  return propertyType && TRANSFORM_ORIGIN_TYPES.includes(propertyType)
}

export function createSetStyleTransformOriginValueProcessor(
  setter: string,
  language: DOM2_APP_LANGUAGE
): PropertyProcessor {
  return createPropertyProcessor((value: string | number, propertyName) => {
    const result = parseTransformOriginValue(String(value), language)
    if (!result.code) {
      return createValueProcessorError(value, propertyName)
    }
    return createValueProcessorResult(result.code, `${setter}(${result.code})`)
  }, PropertyProcessorType.Struct)
}

interface ParsedValue {
  value: number
  unit: string
}

interface ParseResult {
  code: string
  error?: string
}

function parseTransformOriginValue(
  str: string,
  language: DOM2_APP_LANGUAGE
): ParseResult {
  const parts = str.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return { code: '' }
  }

  if (parts.length === 1) {
    const keywordExpansion = expandSingleKeyword(parts[0])
    if (keywordExpansion) {
      return { code: buildTransformOriginCode(keywordExpansion, language) }
    }

    const parsed = parseUnitValue(parts[0])
    if (parsed) {
      return {
        code: buildTransformOriginCode(
          [
            {
              value: parsed.value,
              unit: parsed.unit,
            },
          ],
          language
        ),
      }
    }

    return {
      code: '',
    }
  }

  if (parts.length === 2 || parts.length === 3) {
    const x = parseAxisValue(parts[0], 'x')
    if ('error' in x) {
      return { code: '', error: x.error }
    }

    const y = parseAxisValue(parts[1], 'y')
    if ('error' in y) {
      return { code: '', error: y.error }
    }

    const values: ParsedValue[] = [x, y]

    if (parts.length === 3) {
      const z = parseZValue(parts[2])
      if ('error' in z) {
        return { code: '', error: z.error }
      }
      values.push(z)
    }

    return { code: buildTransformOriginCode(values, language) }
  }

  return {
    code: '',
  }
}

function buildTransformOriginCode(
  values: ParsedValue[],
  language: DOM2_APP_LANGUAGE
): string {
  const args = values.map((v) => toUnitValueCode(v, language)).join(', ')

  return `UniCSSTransformOrigin(${args})`
}

function expandSingleKeyword(part: string): ParsedValue[] | null {
  const lower = part.toLowerCase()
  const mapping = SINGLE_KEYWORD_MAP[lower]
  if (!mapping) {
    return null
  }

  return mapping.map((item) => ({ value: item.value, unit: item.unit }))
}

type Axis = 'x' | 'y'

type ParsedValueResult = ParsedValue | { error: string }

function parseAxisValue(part: string, axis: Axis): ParsedValueResult {
  const lower = part.toLowerCase()

  // 首先尝试匹配当前轴的关键字
  let keywordValue = axisKeywordToValue(lower, axis)
  if (keywordValue) {
    return {
      value: keywordValue.value,
      unit: keywordValue.unit,
    }
  }

  // 如果当前轴没有匹配，尝试另一个轴的关键字
  // 这样可以支持 "top left" 或 "left top" 这种顺序
  const otherAxis = axis === 'x' ? 'y' : 'x'
  keywordValue = axisKeywordToValue(lower, otherAxis)
  if (keywordValue) {
    return {
      value: keywordValue.value,
      unit: keywordValue.unit,
    }
  }

  const unitValue = parseUnitValue(part)
  if (unitValue) {
    return {
      value: unitValue.value,
      unit: unitValue.unit,
    }
  }

  return {
    error: `Invalid transform-origin value: ${part}`,
  }
}

function parseZValue(part: string): ParsedValueResult {
  const lower = part.toLowerCase()
  if (isAxisKeyword(lower)) {
    return {
      error: `Invalid transform-origin value: ${part}`,
    }
  }

  const unitValue = parseUnitValue(part)
  if (!unitValue || unitValue.unit === 'PCT') {
    return {
      error: `Invalid transform-origin value: ${part}`,
    }
  }

  return {
    value: unitValue.value,
    unit: unitValue.unit,
  }
}

function isAxisKeyword(keyword: string): boolean {
  return keyword in X_AXIS_KEYWORD_MAP || keyword in Y_AXIS_KEYWORD_MAP
}

function axisKeywordToValue(keyword: string, axis: Axis): ParsedValue | null {
  if (axis === 'x') {
    return X_AXIS_KEYWORD_MAP[keyword] || null
  }
  return Y_AXIS_KEYWORD_MAP[keyword] || null
}

const X_AXIS_KEYWORD_MAP: Record<string, ParsedValue> = {
  left: { value: 0, unit: 'PCT' },
  center: { value: 50, unit: 'PCT' },
  right: { value: 100, unit: 'PCT' },
}

const Y_AXIS_KEYWORD_MAP: Record<string, ParsedValue> = {
  top: { value: 0, unit: 'PCT' },
  center: { value: 50, unit: 'PCT' },
  bottom: { value: 100, unit: 'PCT' },
}

const SINGLE_KEYWORD_MAP: Record<string, ParsedValue[]> = {
  left: [
    { value: 0, unit: 'PCT' },
    { value: 50, unit: 'PCT' },
    { value: 0, unit: 'NONE' },
  ],
  center: [
    { value: 50, unit: 'PCT' },
    { value: 50, unit: 'PCT' },
    { value: 0, unit: 'NONE' },
  ],
  right: [
    { value: 100, unit: 'PCT' },
    { value: 50, unit: 'PCT' },
    { value: 0, unit: 'NONE' },
  ],
  top: [
    { value: 50, unit: 'PCT' },
    { value: 0, unit: 'PCT' },
    { value: 0, unit: 'NONE' },
  ],
  bottom: [
    { value: 50, unit: 'PCT' },
    { value: 100, unit: 'PCT' },
    { value: 0, unit: 'NONE' },
  ],
}
