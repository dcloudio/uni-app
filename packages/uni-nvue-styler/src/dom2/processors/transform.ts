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

interface TransformArg {
  value: number
  unit: string
}

interface TransformFunction {
  name: string
  args: TransformArg[]
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

/**
 * 将 TransformArg 转换为 UniCSSUnitValue 代码字符串
 */
function argToUnitValue(arg: TransformArg): string {
  return `UniCSSUnitValue(${toFloatLiteral(arg.value)}, UniCSSUnitType::${
    arg.unit
  })`
}

function stringifyTransformValue(functions: TransformFunction[]): string {
  if (functions.length === 0) {
    return ''
  }

  const functionCodes = functions
    .map((func) => {
      const args = func.args

      switch (func.name) {
        case 'translate':
          if (args.length === 1) {
            return `UniCSSTransformTranslate(${argToUnitValue(args[0])})`
          }
          return `UniCSSTransformTranslate(${argToUnitValue(
            args[0]
          )}, ${argToUnitValue(args[1] || { value: 0, unit: 'PX' })})`

        case 'translateX':
          return `UniCSSTransformTranslate::TranslateX(${argToUnitValue(
            args[0]
          )})`

        case 'translateY':
          return `UniCSSTransformTranslate::TranslateY(${argToUnitValue(
            args[0]
          )})`

        case 'translateZ':
          return `UniCSSTransformTranslate::TranslateZ(${argToUnitValue(
            args[0]
          )})`

        case 'translate3d':
          return `UniCSSTransformTranslate(${argToUnitValue(
            args[0]
          )}, ${argToUnitValue(args[1])}, ${argToUnitValue(args[2])})`

        case 'scale':
          if (args.length === 1) {
            return `UniCSSTransformScale(${argToUnitValue(args[0])})`
          }
          return `UniCSSTransformScale(${argToUnitValue(
            args[0]
          )}, ${argToUnitValue(args[1])})`

        case 'scaleX':
          return `UniCSSTransformScale::ScaleX(${argToUnitValue(args[0])})`

        case 'scaleY':
          return `UniCSSTransformScale::ScaleY(${argToUnitValue(args[0])})`

        case 'scaleZ':
          return `UniCSSTransformScale::ScaleZ(${argToUnitValue(args[0])})`

        case 'scale3d':
          return `UniCSSTransformScale(${argToUnitValue(
            args[0]
          )}, ${argToUnitValue(args[1])}, ${argToUnitValue(args[2])})`

        case 'rotate':
          return `UniCSSTransformRotate(${argToUnitValue(args[0])})`

        case 'rotateX':
          return `UniCSSTransformRotate::RotateX(${argToUnitValue(args[0])})`

        case 'rotateY':
          return `UniCSSTransformRotate::RotateY(${argToUnitValue(args[0])})`

        case 'rotateZ':
          return `UniCSSTransformRotate::RotateZ(${argToUnitValue(args[0])})`

        case 'rotate3d':
          return `UniCSSTransformRotate::Rotate3D(${argToUnitValue(
            args[0]
          )}, ${argToUnitValue(args[1])}, ${argToUnitValue(
            args[2]
          )}, ${argToUnitValue(args[3])})`

        case 'skew':
          if (args.length === 1) {
            return `UniCSSTransformSkew(${argToUnitValue(args[0])})`
          }
          return `UniCSSTransformSkew(${argToUnitValue(
            args[0]
          )}, ${argToUnitValue(args[1] || { value: 0, unit: 'DEG' })})`

        case 'skewX':
          return `UniCSSTransformSkew(${argToUnitValue(args[0])})`

        case 'skewY':
          return `UniCSSTransformSkew(${argToUnitValue({
            value: 0,
            unit: 'DEG',
          })}, ${argToUnitValue(args[0])})`

        case 'matrix':
          // matrix 仍然使用 float，不包装 UniCSSUnitValue
          return `UniCSSTransformMatrix(${args
            .map((arg) => toFloatLiteral(arg.value))
            .join(', ')})`

        case 'matrix3d':
          // matrix3d 仍然使用 float，不包装 UniCSSUnitValue
          return `UniCSSTransformMatrix3D({${args
            .map((arg) => toFloatLiteral(arg.value))
            .join(', ')}})`

        case 'perspective':
          return `UniCSSTransformPerspective(${argToUnitValue(args[0])})`

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

function parseTransformArgs(
  funcName: string,
  argsString: string
): TransformArg[] {
  const parts = argsString.split(/[,\s]+/).filter((part) => part.trim() !== '')

  const args: TransformArg[] = []

  for (const part of parts) {
    const trimmed = part.trim()

    if (isAngleFunction(funcName)) {
      const angleValue = parseAngleValue(trimmed)
      if (angleValue !== null) {
        args.push({ value: angleValue, unit: 'DEG' })
      }
    } else if (isScaleFunction(funcName)) {
      const numValue = parseFloat(trimmed)
      if (!isNaN(numValue)) {
        args.push({ value: numValue, unit: 'NONE' })
      }
    } else if (funcName === 'matrix' || funcName === 'matrix3d') {
      const numValue = parseFloat(trimmed)
      if (!isNaN(numValue)) {
        args.push({ value: numValue, unit: 'NONE' })
      }
    } else {
      // translate 系列和 perspective
      const unitValue = parseUnitValue(trimmed)
      if (unitValue) {
        args.push({ value: unitValue.value, unit: unitValue.unit })
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
