import { camelize, capitalize } from '../../shared'
import { type PropertyProcessor, createValueProcessorResult } from './utils'

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
