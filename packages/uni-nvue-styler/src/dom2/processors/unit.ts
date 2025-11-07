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

interface UnitValue {
  value: number
  unit: string
}

export function toUnitValueResult(
  setter: string,
  language: 'cpp' | 'ts',
  unitValue: UnitValue
) {
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

export function createSetStyleUnitValueProcessor(
  setter: string,
  language: 'cpp' | 'ts'
): PropertyProcessor {
  return createPropertyProcessor((value, propertyName) => {
    const unitValue = parseUnitValue(
      String(value),
      propertyName === 'line-height' ? 'EM' : 'NONE'
    )
    if (unitValue) {
      return toUnitValueResult(setter, language, unitValue)
    }
    return createValueProcessorError(`Invalid unit value: ${value}`)
  }, PropertyProcessorType.Unit)
}

const unitMatchRe = /^(-?(?:\d*\.\d+|\d+\.?\d*))(%|[a-zA-Z]+)?$/

export function parseUnitValue(
  value: string,
  defaultUnit = 'NONE'
): UnitValue | undefined {
  const unitMatch = value.match(unitMatchRe)
  if (unitMatch) {
    const value = parseFloat(unitMatch[1])
    const unit = unitMatch[2] ? unitMatch[2].toUpperCase() : null
    if (unit === null) {
      return {
        value: value,
        unit: defaultUnit,
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
