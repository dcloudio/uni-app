import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
  toSharedDataStyleValueError,
} from './utils'

const NUMBER_TYPES = ['number']
export function isNumberType(propertyType?: string) {
  return propertyType && NUMBER_TYPES.includes(propertyType)
}

export function createSetStyleNumberValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value, propertyName) => {
    const numValue = parseFloat(String(value))
    if (!isNaN(numValue)) {
      return createValueProcessorResult(`${numValue}`, `${setter}(${numValue})`)
    }
    return createValueProcessorError(value, propertyName)
  }, PropertyProcessorType.Number)
}

export function toSharedDataStyleNumberValue(
  value: string | number,
  propertyName: string
) {
  const numValue = parseFloat(String(value))
  if (!isNaN(numValue)) {
    return numValue
  }
  return toSharedDataStyleValueError(value, propertyName)
}
