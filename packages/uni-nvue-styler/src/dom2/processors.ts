import tinycolor from 'tinycolor2'
import type { AppCssJson } from './types'
import appCssJson from '../../lib/dom2/app-css.json'
import { camelize, capitalize } from '../shared'

export interface PropertyProcessor {
  (value: string | number, propertyName: string): {
    error?: string
    valueCode: string
    setterCode: string
  }
}

function createValueProcessorResult(
  valueCode: string,
  setterCode: string
): ReturnType<PropertyProcessor> {
  return {
    valueCode: valueCode,
    setterCode: setterCode,
  }
}

function createValueProcessorError(
  error: string
): ReturnType<PropertyProcessor> {
  return {
    error: error,
    valueCode: '',
    setterCode: '',
  }
}

function createDefineStyleVariableProcessor(): PropertyProcessor {
  return (value, propertyName) => {
    return createValueProcessorResult(
      `"${value}"`,
      `defineStyleVariable("${propertyName}", "${value}")`
    )
  }
}

export const defineStyleVariableProcessor = createDefineStyleVariableProcessor()

function createSetStyleVariableProcessor(): PropertyProcessor {
  return (value, propertyName) => {
    return createValueProcessorResult(
      `"${value}"`,
      `setStyleVariable(UniCSSPropertyID.${capitalize(
        camelize(propertyName)
      )}, "${value}")`
    )
  }
}

export const setStyleVariableProcessor = createSetStyleVariableProcessor()

export function createSetStyleUnitValueProcessor(
  setter: string,
  language: 'cpp' | 'ts'
): PropertyProcessor {
  return (value) => {
    const unitValue = parseUnitValue(String(value))
    if (unitValue) {
      return createValueProcessorResult(
        `UniCSSUnitValue { ${unitValue.value}, UniCSSUnitType${
          language === 'cpp' ? '::' : '.'
        }${unitValue.unit} }`,
        `${setter}(${unitValue.value}, UniCSSUnitType.${unitValue.unit})`
      )
    }
    return createValueProcessorError(`Invalid unit value: ${value}`)
  }
}

export function createSetStyleNativeColorValueProcessor(
  setter: string
): PropertyProcessor {
  return (value) => {
    const nativeColorValue = parseNativeColorValue(String(value))
    if (nativeColorValue) {
      return createValueProcessorResult(
        `${nativeColorValue}`,
        `${setter}(${nativeColorValue})`
      )
    }
    return createValueProcessorError(`Invalid color value: ${value}`)
  }
}

export function createSetStyleEnumValueProcessor(
  setter: string,
  language: 'cpp' | 'ts'
): PropertyProcessor {
  return (value, propertyName) => {
    const propertyConfig = (appCssJson as AppCssJson)[propertyName]
    if (!propertyConfig?.type) {
      return createValueProcessorError(`Invalid property: ${propertyName}`)
    }
    const enumTypeName = `${propertyConfig.type}${
      language === 'cpp' ? '::' : '.'
    }${capitalize(camelize(value + ''))}`
    return createValueProcessorResult(
      enumTypeName,
      setter ? `${setter}(${enumTypeName})` : enumTypeName
    )
  }
}

const unitMatchRe = /^(-?(?:\d*\.\d+|\d+\.?\d*))(%|[a-zA-Z]+)?$/

function parseUnitValue(value: string) {
  const unitMatch = value.match(unitMatchRe)
  if (unitMatch) {
    const value = parseFloat(unitMatch[1])
    const unit = unitMatch[2] ? unitMatch[2].toUpperCase() : null
    if (unit === null) {
      return {
        value: value,
        unit: 'NONE',
      }
    }
    return {
      value: value,
      unit: unit === '%' ? 'PCT' : unit,
    }
  }
}

export function createSetStyleNumberValueProcessor(
  setter: string
): PropertyProcessor {
  return (value) => {
    const numValue = parseFloat(String(value))
    if (!isNaN(numValue)) {
      return createValueProcessorResult(`${numValue}`, `${setter}(${numValue})`)
    }
    return createValueProcessorError(`Invalid number value: ${value}`)
  }
}

function parseNativeColorValue(value: string) {
  const color = tinycolor(value)
  if (color.isValid()) {
    return '0x' + color.toHex8()
  }
}
