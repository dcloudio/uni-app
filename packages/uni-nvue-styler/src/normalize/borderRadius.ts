import {
  LENGTH_REGEXP,
  type Normalize,
  splitValues,
  supportedValueWithTipsReason,
} from '../utils'

function isCalcValue(value: string): boolean {
  if (!/^calc\(/i.test(value)) return false
  let depth = 0
  for (let i = 4; i < value.length; i++) {
    if (value[i] === '(') depth++
    if (value[i] === ')') {
      depth--
      if (depth === 0) {
        return i === value.length - 1 && value.slice(5, i).trim() !== ''
      }
    }
  }
  return false
}

export function createNormalizeCornerRadius(normalize: Normalize): Normalize {
  return (value, options, declInfo) => {
    // 常见单值直接走原校验，避免分词和数组分配。
    if (
      typeof value !== 'string' ||
      !/\s/.test(value) ||
      (options.dom2 && isCalcValue(value))
    ) {
      return normalize(value, options, declInfo)
    }
    const parts = splitValues(value)
    // 先检查顶层双值，避免被 DOM2 的 calc 透传逻辑提前接受。
    if (
      parts.length === 2 &&
      parts.every((part) => {
        // 复用长度语法和属性校验，保留正号、负零及平台单位限制。
        const literal =
          LENGTH_REGEXP.test(part) &&
          !/[()]/.test(part) &&
          parseFloat(part) >= 0
        // calc 内部表达式沿用现有处理，此处只确认它是一个完整函数值。
        const calc = options.dom2 && isCalcValue(part)
        return (
          (literal || calc) && normalize(part, options, declInfo).value !== null
        )
      })
    ) {
      return {
        value: null,
        reason: (key, original) =>
          supportedValueWithTipsReason(
            key,
            original,
            '(two radius values are not supported on this platform; use a single radius value instead)'
          ),
      }
    }
    return normalize(value, options, declInfo)
  }
}
