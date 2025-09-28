import type { AppCssJson } from './types'
import appCssJson from '../../lib/app-css.json'
import { camelize, capitalize } from '../shared'

export interface PropertyProcessor {
  (value: string | number, propertyName: string):
    | {
        valueCode: string
        setterCode: string
      }
    | undefined
}

function createDefineStyleVariableProcessor(): PropertyProcessor {
  return (value, propertyName) => {
    return {
      valueCode: `"${value}"`,
      setterCode: `defineStyleVariable("${propertyName}", "${value}")`,
    }
  }
}

export const defineStyleVariableProcessor = createDefineStyleVariableProcessor()

function createSetStyleVariableProcessor(): PropertyProcessor {
  return (value, propertyName) => {
    return {
      valueCode: `"${value}"`,
      setterCode: `setStyleVariable(UniCSSPropertyID.${capitalize(
        camelize(propertyName)
      )}, "${value}")`,
    }
  }
}

export const setStyleVariableProcessor = createSetStyleVariableProcessor()

export function createSetStyleUnitValueProcessor(
  setter: string
): PropertyProcessor {
  return (value) => {
    const unitValue = parseUnitValue(String(value))
    if (unitValue) {
      return {
        valueCode: `"${unitValue.value}"`,
        setterCode: `${setter}(${unitValue.value}, UniCSSUnitType.${unitValue.unit})`,
      }
    }
  }
}

export function createSetStyleEnumValueProcessor(
  setter: string
): PropertyProcessor {
  return (value, propertyName) => {
    const propertyConfig = (appCssJson as AppCssJson)[propertyName]
    if (!propertyConfig?.type) {
      return undefined
    }
    const enumTypeName = `${propertyConfig.type}.${capitalize(
      camelize(value + '')
    )}`
    return {
      valueCode: enumTypeName,
      setterCode: setter ? `${setter}(${enumTypeName})` : enumTypeName,
    }
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
