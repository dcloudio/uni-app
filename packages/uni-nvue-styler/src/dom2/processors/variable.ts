import { camelize, capitalize } from '../../shared'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorResult,
} from './utils'

function createDefineStyleVariableProcessor(): PropertyProcessor {
  return createPropertyProcessor((value, propertyName) => {
    return createValueProcessorResult(
      `"${value}"`,
      `defineStyleVariable("${propertyName}", "${value}")`
    )
  }, PropertyProcessorType.Other)
}

export const defineStyleVariableProcessor = createDefineStyleVariableProcessor()

function createSetStyleVariableProcessor(): PropertyProcessor {
  return createPropertyProcessor((value, propertyName) => {
    return createValueProcessorResult(
      `"${value}"`,
      `setStyleVariable(UniCSSPropertyID.${capitalize(
        camelize(propertyName)
      )}, "${value}")`
    )
  }, PropertyProcessorType.Other)
}

export const setStyleVariableProcessor = createSetStyleVariableProcessor()
