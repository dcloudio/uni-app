import { type PropertyProcessor, createValueProcessorResult } from './utils'

const STRING_TYPES = ['string', 'UniNativeBoxShadow']
export function isStringType(propertyType?: string) {
  return propertyType && STRING_TYPES.includes(propertyType)
}

export function createSetStyleStringValueProcessor(
  setter: string
): PropertyProcessor {
  return (value) => {
    return createValueProcessorResult(`"${value}"`, `${setter}("${value}")`)
  }
}
