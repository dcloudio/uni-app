import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorResult,
} from './utils'

const STRING_TYPES = ['string']
export function isStringType(propertyType?: string) {
  return propertyType && STRING_TYPES.includes(propertyType)
}

export function createSetStyleStringValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value) => {
    return createValueProcessorResult(`"${value}"`, `${setter}("${value}")`)
  }, PropertyProcessorType.String)
}
