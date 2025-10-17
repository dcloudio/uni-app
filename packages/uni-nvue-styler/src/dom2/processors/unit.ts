import {
  type PropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
} from './utils'

export function createSetStyleUnitValueProcessor(
  setter: string,
  language: 'cpp' | 'ts'
): PropertyProcessor {
  return (value) => {
    const unitValue = parseUnitValue(String(value))
    if (unitValue) {
      return createValueProcessorResult(
        `UniCSSUnitValue{${unitValue.value}, UniCSSUnitType${
          language === 'cpp' ? '::' : '.'
        }${unitValue.unit}}`,
        `${setter}(${unitValue.value}, UniCSSUnitType.${unitValue.unit})`
      )
    }
    return createValueProcessorError(`Invalid unit value: ${value}`)
  }
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
