import { camelize, capitalize } from '../../shared'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createValueProcessorResult,
} from './utils'

export function createDefineStyleVariableProcessor(): PropertyProcessor {
  const processor: PropertyProcessor = (value, propertyName) => {
    return createValueProcessorResult(
      `"${value}"`,
      `defineStyleVariable("${propertyName}", "${value}")`
    )
  }
  processor.type = PropertyProcessorType.DefineVariable
  return processor
}

export const defineStyleVariableProcessor = createDefineStyleVariableProcessor()

export function createSetStyleVariableProcessor(): PropertyProcessor {
  const processor: PropertyProcessor = (value, propertyName) => {
    return createValueProcessorResult(
      `"${value}"`,
      `setStyleVariable(UniCSSPropertyID.${capitalize(
        camelize(propertyName)
      )}, "${value}")`
    )
  }
  processor.type = PropertyProcessorType.SetVariable
  return processor
}
