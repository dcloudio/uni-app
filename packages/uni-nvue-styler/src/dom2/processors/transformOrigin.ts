import { parseUnitValue } from './unit'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
} from './utils'

const TRANSFORM_ORIGIN_TYPES = ['UniNativeTransformOrigin']

// 开关：是否支持关键字（如 left, center, right, top, bottom 等）
const SUPPORT_KEYWORDS = false

export function isTransformOriginType(propertyType?: string) {
  return propertyType && TRANSFORM_ORIGIN_TYPES.includes(propertyType)
}

export function createSetStyleTransformOriginValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    const result = parseTransformOriginValue(String(value))

    if (result.error) {
      return createValueProcessorError(result.error)
    }

    if (!result.code) {
      return createValueProcessorError(
        `Invalid transform-origin value: ${value}`
      )
    }

    return createValueProcessorResult(result.code, `${setter}(${result.code})`)
  }, PropertyProcessorType.Struct)
}

// 辅助函数：将数字格式化为浮点数字符串
function toFloat(value: number): string {
  return value % 1 === 0 ? `${value}.0f` : `${value}f`
}

interface ParsedValue {
  value: number
  unit: string
}

interface ParseResult {
  code: string
  error?: string
}

function parseTransformOriginValue(str: string): ParseResult {
  const parts = str.trim().split(/\s+/)

  // 检查是否包含不支持的关键字
  if (!SUPPORT_KEYWORDS) {
    for (const part of parts) {
      if (isKeyword(part)) {
        return {
          code: '',
          error: `Invalid transform-origin value: ${part}`,
        }
      }
    }
  }

  // 处理关键字组合（如果启用）
  if (SUPPORT_KEYWORDS) {
    const keywordResult = tryKeywordCombination(parts)
    if (keywordResult) {
      return { code: keywordResult }
    }
  }

  // 解析数值
  const values: ParsedValue[] = []
  for (const part of parts) {
    if (SUPPORT_KEYWORDS && isKeyword(part)) {
      // 关键字转换为对应的值
      const keywordValue = keywordToValue(part)
      if (keywordValue) {
        values.push(keywordValue)
      }
    } else {
      const unitValue = parseUnitValue(part)
      if (unitValue) {
        values.push({
          value: unitValue.value,
          unit: unitValue.unit,
        })
      }
    }
  }

  if (values.length === 0) {
    return { code: '' }
  }

  // 单值情况
  if (values.length === 1) {
    const v = values[0]
    return {
      code: `UniCSSTransformOrigin(UniCSSUnitValue(${toFloat(
        v.value
      )}, UniCSSUnitType::${v.unit}))`,
    }
  }

  // 两个值的情况
  if (values.length === 2) {
    const v1 = values[0]
    const v2 = values[1]
    return {
      code: `UniCSSTransformOrigin(UniCSSUnitValue(${toFloat(
        v1.value
      )}, UniCSSUnitType::${v1.unit}), UniCSSUnitValue(${toFloat(
        v2.value
      )}, UniCSSUnitType::${v2.unit}))`,
    }
  }

  // 三个值的情况 (3D)
  if (values.length === 3) {
    const v1 = values[0]
    const v2 = values[1]
    const v3 = values[2]
    return {
      code: `UniCSSTransformOrigin(UniCSSUnitValue(${toFloat(
        v1.value
      )}, UniCSSUnitType::${v1.unit}), UniCSSUnitValue(${toFloat(
        v2.value
      )}, UniCSSUnitType::${v2.unit}), UniCSSUnitValue(${toFloat(
        v3.value
      )}, UniCSSUnitType::${v3.unit}))`,
    }
  }

  return { code: '' }
}

// 关键字判断
function isKeyword(value: string): boolean {
  const keywords = [
    'left',
    'center',
    'right',
    'top',
    'bottom',
    'initial',
    'inherit',
  ]
  return keywords.includes(value.toLowerCase())
}

// 关键字转换为数值
function keywordToValue(keyword: string): ParsedValue | null {
  const lowerKeyword = keyword.toLowerCase()
  switch (lowerKeyword) {
    case 'left':
      return { value: 0, unit: 'PCT' }
    case 'center':
      return { value: 50, unit: 'PCT' }
    case 'right':
      return { value: 100, unit: 'PCT' }
    case 'top':
      return { value: 0, unit: 'PCT' }
    case 'bottom':
      return { value: 100, unit: 'PCT' }
    default:
      return null
  }
}

// 尝试关键字组合的便捷方法
function tryKeywordCombination(parts: string[]): string {
  if (parts.length === 1) {
    const part = parts[0].toLowerCase()
    if (part === 'center') {
      return 'UniCSSTransformOrigin::Center()'
    }
  }

  if (parts.length === 2) {
    const part1 = parts[0].toLowerCase()
    const part2 = parts[1].toLowerCase()

    // center center
    if (part1 === 'center' && part2 === 'center') {
      return 'UniCSSTransformOrigin::Center()'
    }
    // left top
    if (part1 === 'left' && part2 === 'top') {
      return 'UniCSSTransformOrigin::LeftTop()'
    }
    // left center
    if (part1 === 'left' && part2 === 'center') {
      return 'UniCSSTransformOrigin::LeftCenter()'
    }
    // left bottom
    if (part1 === 'left' && part2 === 'bottom') {
      return 'UniCSSTransformOrigin::LeftBottom()'
    }
    // right top
    if (part1 === 'right' && part2 === 'top') {
      return 'UniCSSTransformOrigin::RightTop()'
    }
    // right center
    if (part1 === 'right' && part2 === 'center') {
      return 'UniCSSTransformOrigin::RightCenter()'
    }
    // right bottom
    if (part1 === 'right' && part2 === 'bottom') {
      return 'UniCSSTransformOrigin::RightBottom()'
    }
    // center top
    if (part1 === 'center' && part2 === 'top') {
      return 'UniCSSTransformOrigin::CenterTop()'
    }
    // center bottom
    if (part1 === 'center' && part2 === 'bottom') {
      return 'UniCSSTransformOrigin::CenterBottom()'
    }
    // top center 等价于 center top
    if (part1 === 'top' && part2 === 'center') {
      return 'UniCSSTransformOrigin::CenterTop()'
    }
    // bottom center 等价于 center bottom
    if (part1 === 'bottom' && part2 === 'center') {
      return 'UniCSSTransformOrigin::CenterBottom()'
    }
  }

  return ''
}
