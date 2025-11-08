import { camelize, capitalize } from '../../shared'
import { DOM2_APP_LANGUAGE } from '../types'
import { genCPPEnumCode } from './enum'
import { parseUnitValue, toUnitValueCode } from './unit'
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
  setter: string,
  language: DOM2_APP_LANGUAGE
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    if (value === 'none') {
      return createValueProcessorResult(`null`, `${setter}(null)`)
    }
    const transformValueCode = stringifyTransformValue(
      parseTransformValue(String(value)),
      language
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

function genCode(
  language: DOM2_APP_LANGUAGE,
  className: string,
  method: string,
  args: string[]
) {
  if (language === DOM2_APP_LANGUAGE.CPP) {
    return `${className}::${capitalize(camelize(method + ''))}(${args.join(
      ', '
    )})`
  }
  return `${genCPPEnumCode(className, method)}(${args.join(', ')})`
}

interface TransformOption {
  className: string
  type: 'unit' | 'number'
}

const translateOption: TransformOption = {
  className: 'UniCSSTransformTranslate',
  type: 'unit',
}
const scaleOption: TransformOption = {
  className: 'UniCSSTransformScale',
  type: 'unit',
}
const rotateOption: TransformOption = {
  className: 'UniCSSTransformRotate',
  type: 'unit',
}
const skewOption: TransformOption = {
  className: 'UniCSSTransformSkew',
  type: 'unit',
}
const matrixOption: TransformOption = {
  className: 'UniCSSTransformMatrix',
  type: 'number',
}
const matrix3dOption: TransformOption = {
  className: 'UniCSSTransformMatrix3D',
  type: 'number',
}
const perspectiveOption: TransformOption = {
  className: 'UniCSSTransformPerspective',
  type: 'unit',
}

const transformOptions: Record<string, TransformOption> = {
  translate: translateOption,
  translateX: translateOption,
  translateY: translateOption,
  translateZ: translateOption,
  translate3d: translateOption,
  scale: scaleOption,
  scaleX: scaleOption,
  scaleY: scaleOption,
  scaleZ: scaleOption,
  scale3d: scaleOption,
  rotate: rotateOption,
  rotateX: rotateOption,
  rotateY: rotateOption,
  rotateZ: rotateOption,
  rotate3d: rotateOption,
  skew: skewOption,
  skewX: skewOption,
  skewY: skewOption,
  matrix: matrixOption,
  matrix3d: matrix3dOption,
  perspective: perspectiveOption,
}

function stringifyTransformValue(
  functions: TransformFunction[],
  language: DOM2_APP_LANGUAGE
): string {
  if (functions.length === 0) {
    return ''
  }

  const functionCodes = functions
    .map((func) => {
      const args = func.args
      const option = transformOptions[func.name]
      if (option) {
        if (option.type === 'unit') {
          return genCode(
            language,
            option.className,
            func.name,
            args.map((arg) => toUnitValueCode(arg, language))
          )
        } else if (option.type === 'number') {
          return genCode(
            language,
            option.className,
            func.name,
            args.map((arg) => `${arg.value}`)
          )
        }
      }
      return ''
    })
    .filter((code) => code !== '')

  if (functionCodes.length === 0) {
    return ''
  }
  if (language === DOM2_APP_LANGUAGE.CPP) {
    return `{${functionCodes.join(', ')}}`
  }
  return `[${functionCodes.join(', ')}]`
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
