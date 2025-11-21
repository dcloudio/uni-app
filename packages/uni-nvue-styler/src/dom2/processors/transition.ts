import { DOM2_APP_LANGUAGE } from '../types'
import { camelize, capitalize } from '@vue/shared'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
  normalizeDurationToMilliseconds,
} from './utils'
import { genCPPEnumCode } from './enum'

const TRANSITION_CLASS_NAME = 'UniNativeTransition'
const TRANSITION_DELAY_CLASS_NAME = `${TRANSITION_CLASS_NAME}Delay`
const TRANSITION_DURATION_CLASS_NAME = `${TRANSITION_CLASS_NAME}Duration`
const TRANSITION_PROPERTY_CLASS_NAME = `${TRANSITION_CLASS_NAME}Property`
const TRANSITION_TIMING_FUNCTION_CLASS_NAME = `${TRANSITION_CLASS_NAME}TimingFunction`
const TRANSITION_TYPES = [
  TRANSITION_DELAY_CLASS_NAME,
  TRANSITION_DURATION_CLASS_NAME,
  TRANSITION_PROPERTY_CLASS_NAME,
  // 复数，单词拼写不对，应该是：Properties
  TRANSITION_PROPERTY_CLASS_NAME + 's',
  TRANSITION_TIMING_FUNCTION_CLASS_NAME,
]

export function isTransitionType(propertyType?: string) {
  return propertyType && TRANSITION_TYPES.includes(propertyType)
}

export function createSetStyleTransitionValueProcessor(
  setter: string,
  language: DOM2_APP_LANGUAGE,
  propertyType: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number, propertyName) => {
    let code = ''

    if (
      propertyType === TRANSITION_DELAY_CLASS_NAME ||
      propertyType === TRANSITION_DURATION_CLASS_NAME
    ) {
      code = parseTransitionDurationValue(String(value), language)
    } else if (propertyType === TRANSITION_PROPERTY_CLASS_NAME) {
      code = parseTransitionPropertyValue(String(value), propertyType, language)
    } else if (propertyType === TRANSITION_TIMING_FUNCTION_CLASS_NAME) {
      code = parseTransitionTimingFunctionValue(
        String(value),
        propertyType,
        language
      )
    }

    if (!code) {
      return createValueProcessorError(value, propertyName)
    }
    return createValueProcessorResult(code, `${setter}(${code})`)
  }, PropertyProcessorType.Struct)
}

function parseTransitionPropertyValue(
  value: string,
  propertyType: string,
  language: DOM2_APP_LANGUAGE
): string {
  const trimmedValue = value.trim()
  if (!trimmedValue) return ''

  const properties = trimmedValue.includes(',')
    ? trimmedValue.split(',').map((p) => p.trim())
    : [trimmedValue]

  if (language === DOM2_APP_LANGUAGE.CPP) {
    return properties.length > 1
      ? `UniNativeTransitionPropertys{${properties
          .map((p) => `${propertyType}::${capitalize(camelize(p))}`)
          .join(',')}}`
      : `${propertyType}::${capitalize(camelize(properties[0]))}`
  } else {
    return properties.length > 1
      ? `[${properties
          .map(
            (p) =>
              `UTSCPP.propertyAccess(${propertyType}, "::" , "${capitalize(
                camelize(p)
              )}")`
          )
          .join(',')}]`
      : genCPPEnumCode(propertyType, properties[0])
  }
}

function parseTransitionTimingFunctionValue(
  value: string,
  propertyType: string,
  language: DOM2_APP_LANGUAGE
): string {
  const trimmedValue = value.trim()
  if (!trimmedValue) return ''

  // 智能分割：需要处理 cubic-bezier 中的逗号
  const functions: string[] = []
  let current = ''
  let parenthesesDepth = 0

  for (let i = 0; i < trimmedValue.length; i++) {
    const char = trimmedValue[i]

    if (char === '(') {
      parenthesesDepth++
      current += char
    } else if (char === ')') {
      parenthesesDepth--
      current += char
    } else if (char === ',' && parenthesesDepth === 0) {
      // 只有在括号外的逗号才是分隔符
      if (current.trim()) {
        functions.push(current.trim())
      }
      current = ''
    } else {
      current += char
    }
  }

  // 添加最后一个
  if (current.trim()) {
    functions.push(current.trim())
  }

  const parseSingleFunction = (fn: string): string => {
    // 处理 cubic-bezier 函数
    const cubicBezierMatch = fn.match(
      /cubic-bezier\s*\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/
    )
    if (cubicBezierMatch) {
      const [, x1, y1, x2, y2] = cubicBezierMatch
      const params = `${x1}, ${y1}, ${x2}, ${y2}`
      if (language === DOM2_APP_LANGUAGE.CPP) {
        return `${propertyType}(UniCSSTransitionTimingFunction::CubicBezier(${params}))`
      } else {
        return `UTSCPP.propertyAccess(${propertyType}, "::", "CubicBezier(${params})")`
      }
    }

    // 处理普通关键字
    if (language === DOM2_APP_LANGUAGE.CPP) {
      return `${propertyType}(UniCSSTransitionTimingFunction::${capitalize(
        camelize(fn)
      )}())`
    } else {
      return `UTSCPP.propertyAccess(${propertyType}, "::", "${capitalize(
        camelize(fn)
      )}()")`
    }
  }

  if (functions.length > 1) {
    if (language === DOM2_APP_LANGUAGE.CPP) {
      return `UniNativeTransitionTimingFunctions{${functions
        .map(parseSingleFunction)
        .join(',')}}`
    } else {
      return `[${functions.map(parseSingleFunction).join(',')}]`
    }
  }

  return parseSingleFunction(functions[0])
}

function parseTransitionDurationValue(
  str: string,
  language: DOM2_APP_LANGUAGE
): string {
  const normalized = normalizeDurationToMilliseconds(str)
  if (normalized === null) {
    return '0.0'
  }
  return normalized
}
