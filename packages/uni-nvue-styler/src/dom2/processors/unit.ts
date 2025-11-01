import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
  toSharedDataStyleValueError,
} from './utils'
import Units from '../../../lib/dom2/units.json'

const UNIT_TYPES = ['UniCSSUnitValue']
export function isUnitType(propertyType?: string) {
  return propertyType && UNIT_TYPES.includes(propertyType)
}

export function createSetStyleUnitValueProcessor(
  setter: string,
  language: 'cpp' | 'ts'
): PropertyProcessor {
  return createPropertyProcessor((value) => {
    const unitValue = parseUnitValue(String(value))
    if (unitValue) {
      if (language === 'cpp') {
        return createValueProcessorResult(
          `UniCSSUnitValue{${unitValue.value}, UniCSSUnitType::${unitValue.unit}}`,
          `${setter}(${unitValue.value}, UniCSSUnitType.${unitValue.unit})`
        )
      }
      return createValueProcessorResult(
        `new UniCSSUnitValue(${unitValue.value}, UniCSSUnitType.${unitValue.unit})`,
        `${setter}(${unitValue.value}, UniCSSUnitType.${unitValue.unit})`
      )
    }
    return createValueProcessorError(`Invalid unit value: ${value}`)
  }, PropertyProcessorType.Unit)
}

const unitMatchRe = /^(-?(?:\d*\.\d+|\d+\.?\d*))(%|[a-zA-Z]+)?$/

export function parseUnitValue(value: string) {
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

export function toSharedDataStyleUnitValue(value: string | number) {
  const unitValue = parseUnitValue(String(value))
  if (unitValue) {
    unitValue.unit = Units.indexOf(unitValue.unit) as unknown as string
    return unitValue
  }
  return toSharedDataStyleValueError(`Invalid unit value: ${value}`)
}
