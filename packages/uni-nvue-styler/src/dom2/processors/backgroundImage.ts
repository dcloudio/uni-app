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
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    const valueStr = String(value).trim()

    if (valueStr === 'none') {
      return createValueProcessorResult(`null`, `${setter}(null)`)
    }

    // 检查是否是 linear-gradient
    if (valueStr.startsWith('linear-gradient(')) {
      const gradientCode = parseLinearGradient(valueStr)
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
  position: number
}

function parseLinearGradient(str: string): string {
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
    direction = parseDirection(firstPart)
    startIndex = 1
  } else if (firstPart.includes('deg')) {
    // 角度方向
    const angle = parseFloat(firstPart)
    direction = `UniNativeLinearGradientDirectionType::Angle(${toFloat(angle)})`
    startIndex = 1
  } else {
    // 没有指定方向，默认是 to bottom（180deg）
    direction = 'UniNativeLinearGradientDirectionType::ToBottom'
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
  const colorStopsCode = colorStops
    .map((stop) => {
      const color =
        typeof stop.color === 'number'
          ? `0x${stop.color.toString(16).padStart(8, '0')}`
          : stop.color
      return `{${color}, ${toFloat(stop.position)}}`
    })
    .join(',\n        ')

  return `UniNativeLinearGradient(
    ${direction},
    std::vector<UniNativeLinearGradientColorStop>{
        ${colorStopsCode}
    }
)`
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
function parseDirection(str: string): string {
  const lower = str.toLowerCase()
  switch (lower) {
    case 'to top':
      return 'UniNativeLinearGradientDirectionType::ToTop'
    case 'to bottom':
      return 'UniNativeLinearGradientDirectionType::ToBottom'
    case 'to left':
      return 'UniNativeLinearGradientDirectionType::ToLeft'
    case 'to right':
      return 'UniNativeLinearGradientDirectionType::ToRight'
    case 'to top left':
    case 'to left top':
      return 'UniNativeLinearGradientDirectionType::ToTopLeft'
    case 'to top right':
    case 'to right top':
      return 'UniNativeLinearGradientDirectionType::ToTopRight'
    case 'to bottom left':
    case 'to left bottom':
      return 'UniNativeLinearGradientDirectionType::ToBottomLeft'
    case 'to bottom right':
    case 'to right bottom':
      return 'UniNativeLinearGradientDirectionType::ToBottomRight'
    default:
      return 'UniNativeLinearGradientDirectionType::ToBottom'
  }
}

// 解析颜色停止点
function parseColorStop(str: string): GradientColorStop | null {
  // 例如: "red 0%" 或 "#FF6B6B 0%" 或 "rgba(255, 107, 107, 1) 50%"

  // 查找最后一个空格，之后可能是位置
  const lastSpaceIndex = str.lastIndexOf(' ')

  let colorStr = str
  let position = 0

  if (lastSpaceIndex > 0) {
    const potentialPosition = str.slice(lastSpaceIndex + 1).trim()
    // 检查是否是百分比或其他长度单位
    if (potentialPosition.includes('%')) {
      colorStr = str.slice(0, lastSpaceIndex).trim()
      position = parseFloat(potentialPosition) / 100
    } else if (potentialPosition.match(/^\d+(\.\d+)?$/)) {
      // 纯数字，假设是0-1的范围
      colorStr = str.slice(0, lastSpaceIndex).trim()
      position = parseFloat(potentialPosition)
    }
  }

  // 如果没有指定位置，由浏览器自动分配（这里简单处理）
  // 实际应该根据数组索引和总数量计算，这里先返回一个标记值 -1
  if (lastSpaceIndex <= 0) {
    position = -1
  }

  const color = parseNativeColorValue(colorStr)

  if (color !== undefined && color !== '') {
    return {
      color: color,
      position: position,
    }
  }

  return null
}
