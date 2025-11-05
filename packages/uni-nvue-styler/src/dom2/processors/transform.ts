import { parseUnitValue } from './unit'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
} from './utils'

const TRANSFORM_TYPES = ['UniNativeTransform']

export function isTransformType(propertyType?: string) {
  return propertyType && TRANSFORM_TYPES.includes(propertyType)
}

export function createSetStyleTransformValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    if (value === 'none') {
      return createValueProcessorResult(`null`, `${setter}(null)`)
    }
    const transformValueCode = stringifyTransformValue(
      parseTransformValue(String(value))
    )

    if (!transformValueCode) {
      return createValueProcessorError(`Invalid transform value: ${value}`)
    }

    return createValueProcessorResult(
      `${transformValueCode}`,
      `${setter}(${transformValueCode})`
    )
  }, PropertyProcessorType.Struct)
}

interface TransformFunction {
  name: string
  args: number[]
}

/**
 * 将数字转换为浮点数字面量格式
 * 例如: 40 -> "40.0f", 0 -> "0.0f", 1.5 -> "1.5f"
 */
function toFloatLiteral(value: number): string {
  // 如果数字已经有小数点，直接添加 f 后缀
  if (value % 1 !== 0) {
    return `${value}f`
  }
  // 如果是整数，添加 .0f 后缀
  return `${value}.0f`
}

function stringifyTransformValue(functions: TransformFunction[]): string {
  if (functions.length === 0) {
    return ''
  }

  const functionCodes = functions
    .map((func) => {
      const args = func.args.map(toFloatLiteral)

      switch (func.name) {
        case 'translate':
          if (args.length === 1) {
            return `UniCSSTransformTranslate(${args[0]})`
          }
          return `UniCSSTransformTranslate(${args[0]}, ${
            args[1] || toFloatLiteral(0)
          })`

        case 'translateX':
          return `UniCSSTransformTranslate::TranslateX(${args[0]})`

        case 'translateY':
          return `UniCSSTransformTranslate::TranslateY(${args[0]})`

        case 'translateZ':
          return `UniCSSTransformTranslate::TranslateZ(${args[0]})`

        case 'translate3d':
          return `UniCSSTransformTranslate(${args[0]}, ${args[1]}, ${args[2]})`

        case 'scale':
          if (args.length === 1) {
            return `UniCSSTransformScale(${args[0]})`
          }
          return `UniCSSTransformScale(${args[0]}, ${args[1]})`

        case 'scaleX':
          return `UniCSSTransformScale::ScaleX(${args[0]})`

        case 'scaleY':
          return `UniCSSTransformScale::ScaleY(${args[0]})`

        case 'scaleZ':
          return `UniCSSTransformScale::ScaleZ(${args[0]})`

        case 'scale3d':
          return `UniCSSTransformScale(${args[0]}, ${args[1]}, ${args[2]})`

        case 'rotate':
          return `UniCSSTransformRotate(${args[0]})`

        case 'rotateX':
          return `UniCSSTransformRotate::RotateX(${args[0]})`

        case 'rotateY':
          return `UniCSSTransformRotate::RotateY(${args[0]})`

        case 'rotateZ':
          return `UniCSSTransformRotate::RotateZ(${args[0]})`

        case 'rotate3d':
          return `UniCSSTransformRotate::Rotate3D(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`

        case 'skew':
          if (args.length === 1) {
            return `UniCSSTransformSkew(${args[0]})`
          }
          return `UniCSSTransformSkew(${args[0]}, ${
            args[1] || toFloatLiteral(0)
          })`

        case 'skewX':
          return `UniCSSTransformSkew::SkewX(${args[0]})`

        case 'skewY':
          return `UniCSSTransformSkew::SkewY(${args[0]})`

        case 'matrix':
          return `UniCSSTransformMatrix(${args.join(', ')})`

        case 'matrix3d':
          return `UniCSSTransformMatrix3D({${args.join(', ')}})`

        case 'perspective':
          return `UniCSSTransformPerspective(${args[0]})`

        default:
          return ''
      }
    })
    .filter((code) => code !== '')

  if (functionCodes.length === 0) {
    return ''
  }

  return `{${functionCodes.join(', ')}}`
}

function parseTransformValue(str: string): TransformFunction[] {
  const functions: TransformFunction[] = []

  // 匹配 transform 函数，例如 translate(10px, 20px) 或 rotate(45deg)
  const functionRegex = /(\w+)\(([^)]+)\)/g
  let match: RegExpExecArray | null

  while ((match = functionRegex.exec(str)) !== null) {
    const funcName = match[1]
    const argsString = match[2]

    const args = parseTransformArgs(funcName, argsString)

    if (args.length > 0) {
      functions.push({
        name: funcName,
        args: args,
      })
    }
  }

  return functions
}

function parseTransformArgs(funcName: string, argsString: string): number[] {
  const parts = argsString.split(/[,\s]+/).filter((part) => part.trim() !== '')

  const args: number[] = []

  for (const part of parts) {
    const trimmed = part.trim()

    if (isAngleFunction(funcName)) {
      const angleValue = parseAngleValue(trimmed)
      if (angleValue !== null) {
        args.push(angleValue)
      }
    } else if (isScaleFunction(funcName)) {
      const numValue = parseFloat(trimmed)
      if (!isNaN(numValue)) {
        args.push(numValue)
      }
    } else if (funcName === 'matrix' || funcName === 'matrix3d') {
      const numValue = parseFloat(trimmed)
      if (!isNaN(numValue)) {
        args.push(numValue)
      }
    } else {
      const unitValue = parseUnitValue(trimmed)
      if (unitValue) {
        args.push(unitValue.value)
      }
    }
  }

  return args
}

function isAngleFunction(funcName: string): boolean {
  return [
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'rotate3d',
    'skew',
    'skewX',
    'skewY',
  ].includes(funcName)
}

function isScaleFunction(funcName: string): boolean {
  return ['scale', 'scaleX', 'scaleY', 'scaleZ', 'scale3d'].includes(funcName)
}

function parseAngleValue(value: string): number | null {
  const angleRegex = /^(-?[\d.]+)(deg|rad|grad|turn)?$/
  const match = value.match(angleRegex)

  if (match) {
    const numValue = parseFloat(match[1])
    const unit = match[2] || 'deg'

    // 转换为度数
    switch (unit) {
      case 'deg':
        return numValue
      case 'rad':
        return numValue * (180 / Math.PI)
      case 'grad':
        return numValue * (180 / 200)
      case 'turn':
        return numValue * 360
      default:
        return numValue
    }
  }

  return null
}
