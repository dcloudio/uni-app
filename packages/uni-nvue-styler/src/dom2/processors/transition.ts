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

const TRANSITION = 'UniCSSTransitionItem'
const UNINATIVETRANSITIONDELAY_TYPE = 'UniNativeTransitionDelay'
const UNINATIVETRANSITIONDURATION_TYPE = 'UniNativeTransitionDuration'
const UNINATIVETRANSITIONPROPERTY_TYPE = 'UniNativeTransitionProperty'
const UNINATIVETRANSITIONTIMINGFUNCTION_TYPE =
  'UniNativeTransitionTimingFunction'
const UNINATIVETRANSITION_TYPES = [
  TRANSITION,
  UNINATIVETRANSITIONDELAY_TYPE,
  UNINATIVETRANSITIONDURATION_TYPE,
  UNINATIVETRANSITIONPROPERTY_TYPE,
  UNINATIVETRANSITIONTIMINGFUNCTION_TYPE,
]

export function isTransitionType(propertyType?: string) {
  return propertyType && UNINATIVETRANSITION_TYPES.includes(propertyType)
}

export function createSetStyleTransitionValueProcessor(
  setter: string,
  language: DOM2_APP_LANGUAGE,
  propertyType: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number, propertyName) => {
    let code = ''

    if (
      propertyType === UNINATIVETRANSITIONDELAY_TYPE ||
      propertyType === UNINATIVETRANSITIONDURATION_TYPE
    ) {
      code = parseTransitionDurationValue(String(value), language)
    } else if (propertyType === UNINATIVETRANSITIONPROPERTY_TYPE) {
      code = parseTransitionPropertyValue(String(value), propertyType, language)
    } else if (propertyType === UNINATIVETRANSITIONTIMINGFUNCTION_TYPE) {
      code = parseTransitionTimingFunctionValue(
        String(value),
        propertyType,
        language
      )
    } else if (propertyType === TRANSITION) {
      code = parseTransitionShorthandValue(String(value), language)
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

function parseTransitionShorthandValue(
  value: string,
  language: DOM2_APP_LANGUAGE
): string {
  const trimmedValue = value.trim()
  if (!trimmedValue) return ''

  // 简单的解析逻辑：property duration [timing-function] [delay]
  const parts = trimmedValue.split(/\s+/)
  if (parts.length < 2) return '' // 至少需要 property 和 duration

  const property = parts[0]
  let duration = ''
  let timingFunction = ''
  let delay = ''

  // 解析各个部分
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    // 判断是时间还是 timing-function
    if (part.match(/^\d+(\.\d+)?(s|ms)$/)) {
      if (!duration) {
        duration = part
      } else {
        delay = part
      }
    } else if (part.startsWith('cubic-bezier(')) {
      // cubic-bezier 可能跨多个部分
      let cubicBezier = part
      while (i < parts.length - 1 && !cubicBezier.includes(')')) {
        i++
        cubicBezier += ' ' + parts[i]
      }
      timingFunction = cubicBezier
    } else {
      // 其他认为是 timing-function 关键字
      timingFunction = part
    }
  }

  // 构建代码
  const propertyCode = parseTransitionPropertyValue(
    property,
    UNINATIVETRANSITIONPROPERTY_TYPE,
    language
  )
  const durationCode = duration
    ? parseTransitionDurationValue(duration, language)
    : '0.0'
  const timingFunctionCode = timingFunction
    ? parseTransitionTimingFunctionValue(
        timingFunction,
        UNINATIVETRANSITIONTIMINGFUNCTION_TYPE,
        language
      )
    : language === DOM2_APP_LANGUAGE.CPP
    ? `${UNINATIVETRANSITIONTIMINGFUNCTION_TYPE}(UniCSSTransitionTimingFunction::Ease())`
    : `UTSCPP.propertyAccess(${UNINATIVETRANSITIONTIMINGFUNCTION_TYPE}, "::", "Ease()")`
  const delayCode = delay
    ? parseTransitionDurationValue(delay, language)
    : '0.0'

  if (language === DOM2_APP_LANGUAGE.CPP) {
    return `${TRANSITION}{${propertyCode}, ${UNINATIVETRANSITIONDURATION_TYPE}(${durationCode}), ${timingFunctionCode}, ${UNINATIVETRANSITIONDELAY_TYPE}(${delayCode})}`
  } else {
    return `UTSCPP.createObject(${TRANSITION}, {property: ${propertyCode}, duration: UTSCPP.createObject(${UNINATIVETRANSITIONDURATION_TYPE}, ${durationCode}), timingFunction: ${timingFunctionCode}, delay: UTSCPP.createObject(${UNINATIVETRANSITIONDELAY_TYPE}, ${delayCode})})`
  }
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
