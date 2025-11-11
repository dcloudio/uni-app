import { DOM2_APP_LANGUAGE } from '../types'
import { parseNativeColorValue } from './color'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
} from './utils'

const BACKGROUND_IMAGE_TYPES = ['UniNativeBackgroundImage']

export function isBackgroundImageType(propertyType?: string) {
  return propertyType && BACKGROUND_IMAGE_TYPES.includes(propertyType)
}

export function createSetStyleBackgroundImageValueProcessor(
  setter: string,
  language: DOM2_APP_LANGUAGE
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    const valueStr = String(value).trim()

    if (valueStr === 'none') {
      return createValueProcessorResult(`null`, `${setter}(null)`)
    }

    // 检查是否是 linear-gradient
    if (valueStr.startsWith('linear-gradient(')) {
      const gradientCode = parseLinearGradient(valueStr, language)
      if (!gradientCode) {
        return createValueProcessorError(
          `Invalid background-image value: ${value}`
        )
      }
      return createValueProcessorResult(
        gradientCode,
        `${setter}(${gradientCode})`
      )
    }

    // 其他类型暂不支持
    return createValueProcessorError(`Invalid background-image value: ${value}`)
  }, PropertyProcessorType.Struct)
}

interface GradientColorStop {
  color: number | string
}

function parseLinearGradient(str: string, language: DOM2_APP_LANGUAGE): string {
  // 移除 "linear-gradient(" 和最后的 ")"
  const content = str.slice(16, -1).trim()

  // 分割参数，但要小心括号内的逗号
  const parts = splitGradientArgs(content)

  if (parts.length < 2) {
    return ''
  }

  // 解析方向
  const firstPart = parts[0].trim()
  let direction = ''
  let startIndex = 0

  // 检查第一个参数是否是方向关键字
  if (isDirectionKeyword(firstPart)) {
    direction = parseDirection(firstPart, language)
    startIndex = 1
  } else if (firstPart.includes('deg')) {
    // 角度方向
    const angle = parseFloat(firstPart)
    direction =
      language === DOM2_APP_LANGUAGE.CPP
        ? `UniNativeLinearGradientDirectionType::Angle(${angle})`
        : `UTSCPP.propertyAccess(UniNativeLinearGradientDirectionType, "::", "Angle")(${angle})`
    startIndex = 1
  } else {
    // 没有指定方向，默认是 to bottom（180deg）
    direction =
      language === DOM2_APP_LANGUAGE.CPP
        ? 'UniNativeLinearGradientDirectionType::ToBottom'
        : 'UTSCPP.propertyAccess(UniNativeLinearGradientDirectionType, "::", "ToBottom")'
    startIndex = 0
  }

  // 解析颜色停止点
  const colorStops: GradientColorStop[] = []
  for (let i = startIndex; i < parts.length; i++) {
    const stop = parseColorStop(parts[i].trim())
    if (stop) {
      colorStops.push(stop)
    }
  }

  if (colorStops.length < 2) {
    return ''
  }

  // 生成颜色停止点代码
  if (language === DOM2_APP_LANGUAGE.CPP) {
    const colorStopsCode = colorStops
      .map((stop) => {
        const color =
          typeof stop.color === 'number'
            ? `0x${stop.color.toString(16).padStart(8, '0')}`
            : stop.color
        return `{${color}, 0.0f}`
      })
      .join(', ')
    return `UniNativeLinearGradient(${direction}, {${colorStopsCode}})`
  } else {
    const colorStopsCode = colorStops
      .map((stop) => {
        const color =
          typeof stop.color === 'number'
            ? `0x${stop.color.toString(16).padStart(8, '0')}`
            : stop.color
        return `new UniNativeLinearGradientColorStop(${color}, 0)`
      })
      .join(',')
    return `new UniNativeLinearGradient(${direction},[${colorStopsCode}])`
  }
}

// 分割渐变参数，考虑括号嵌套
function splitGradientArgs(str: string): string[] {
  const parts: string[] = []
  let current = ''
  let depth = 0

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (char === '(') {
      depth++
      current += char
    } else if (char === ')') {
      depth--
      current += char
    } else if (char === ',' && depth === 0) {
      parts.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  if (current.trim()) {
    parts.push(current.trim())
  }

  return parts
}

// 判断是否是方向关键字
function isDirectionKeyword(str: string): boolean {
  const keywords = [
    'to top',
    'to bottom',
    'to left',
    'to right',
    'to top left',
    'to top right',
    'to bottom left',
    'to bottom right',
    'to left top',
    'to right top',
    'to left bottom',
    'to right bottom',
  ]
  return keywords.includes(str.toLowerCase())
}

// 解析方向关键字
function parseDirection(str: string, language: DOM2_APP_LANGUAGE): string {
  const lower = str.toLowerCase()
  const directionMap: Record<string, string> = {
    'to top': 'ToTop',
    'to bottom': 'ToBottom',
    'to left': 'ToLeft',
    'to right': 'ToRight',
    'to top left': 'ToTopLeft',
    'to left top': 'ToTopLeft',
    'to top right': 'ToTopRight',
    'to right top': 'ToTopRight',
    'to bottom left': 'ToBottomLeft',
    'to left bottom': 'ToBottomLeft',
    'to bottom right': 'ToBottomRight',
    'to right bottom': 'ToBottomRight',
  }

  const directionName = directionMap[lower] || 'ToBottom'

  if (language === DOM2_APP_LANGUAGE.CPP) {
    return `UniNativeLinearGradientDirectionType::${directionName}`
  } else {
    return `UTSCPP.propertyAccess(UniNativeLinearGradientDirectionType, "::", "${directionName}")`
  }
}

// 解析颜色停止点
function parseColorStop(str: string): GradientColorStop | null {
  // 例如: "red" 或 "#FF6B6B" 或 "rgba(255, 107, 107, 1)"
  // 暂时忽略位置信息，只解析颜色

  let colorStr = str

  // 从右往左查找空格，但要跳过括号内的空格
  let depth = 0
  let lastSpaceIndex = -1

  for (let i = str.length - 1; i >= 0; i--) {
    const char = str[i]
    if (char === ')') {
      depth++
    } else if (char === '(') {
      depth--
    } else if (char === ' ' && depth === 0) {
      lastSpaceIndex = i
      break
    }
  }

  // 如果找到空格，检查后面是否是位置信息（百分比或数字）
  if (lastSpaceIndex > 0) {
    const potentialPosition = str.slice(lastSpaceIndex + 1).trim()
    if (
      potentialPosition.includes('%') ||
      potentialPosition.match(/^\d+(\.\d+)?$/)
    ) {
      // 后面是位置信息，只取前面的颜色部分
      colorStr = str.slice(0, lastSpaceIndex).trim()
    }
  }

  const color = parseNativeColorValue(colorStr)

  if (color !== undefined && color !== '') {
    return {
      color: color,
    }
  }

  return null
}
