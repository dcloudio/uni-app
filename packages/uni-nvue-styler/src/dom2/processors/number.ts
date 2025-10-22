import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
} from './utils'

const NUMBER_TYPES = ['number', 'UniNativeBorderRadius']
export function isNumberType(propertyType?: string) {
  return propertyType && NUMBER_TYPES.includes(propertyType)
}

export function createSetStyleNumberValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value) => {
    const numValue = parseFloat(String(value))
    if (!isNaN(numValue)) {
      return createValueProcessorResult(`${numValue}`, `${setter}(${numValue})`)
    }
    return createValueProcessorError(`Invalid number value: ${value}`)
  }, PropertyProcessorType.Number)
}
