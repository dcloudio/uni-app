import type { AppCssJson, DOM2_APP_PLATFORM, DOM2_APP_TARGET } from '../types'
import appCssJson from '../../../lib/dom2/app-css.json'
import { createSetStyleVariableProcessor } from './variable'

export function getAppCssJson() {
  return appCssJson as AppCssJson
}

type PropertyProcessorFn = (
  value: string | number,
  propertyName: string
) => {
  error?: string
  valueCode: string
  setterCode: string
  important?: boolean
}

export type PropertyProcessor = PropertyProcessorFn & {
  type: PropertyProcessorType
}

export function createValueProcessorResult(
  valueCode: string,
  setterCode: string
): ReturnType<PropertyProcessor> {
  return {
    valueCode: valueCode,
    setterCode: setterCode,
  }
}

export function toSharedDataStyleValueError(
  value: string | number,
  propertyName: string
) {
  if (__DEV__) {
    console.warn(`Property '${propertyName}' has invalid value: '${value}'`)
  }
}

export function createValueProcessorError(
  value: string | number,
  propertyName: string
): ReturnType<PropertyProcessor> {
  return {
    error: `Property '${propertyName}' has invalid value: '${value}'`,
    valueCode: '',
    setterCode: '',
  }
}

export const enum PropertyProcessorType {
  Enum = 'enum',
  Unit = 'unit',
  Number = 'number',
  String = 'string',
  Color = 'color',
  Struct = 'struct',
  DefineVariable = 'defineVariable',
  SetVariable = 'setVariable',
  Other = 'other',
  Combined = 'combined',
}

function wrapPropertyProcessor(
  processor: PropertyProcessorFn
): PropertyProcessorFn {
  const setStyleVariableProcessor = createSetStyleVariableProcessor()
  return (value, propertyName) => {
    if (typeof value === 'string' && value.includes('var(')) {
      return setStyleVariableProcessor(value, propertyName)
    }
    return processor(value, propertyName)
  }
}

export function createPropertyProcessor(
  processor: PropertyProcessorFn,
  type: PropertyProcessorType
): PropertyProcessor {
  const wrappedProcessor =
    type === PropertyProcessorType.DefineVariable ||
    type === PropertyProcessorType.SetVariable
      ? processor
      : wrapPropertyProcessor(processor)
  ;(wrappedProcessor as PropertyProcessor).type = type
  return wrappedProcessor as PropertyProcessor
}

export const PARTS_REG = /\s(?![^(]*\))/
const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/
export const isLength = (v: string) => v === '0' || LENGTH_REG.test(v)

export function getTargetConfig(
  propertyName: string,
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
) {
  const property = getAppCssJson()[propertyName]
  if (!property || !property.uniPlatform) {
    return null
  }

  const specificPlatform = platform
  const generalPlatform = 'app'

  const platformConfig =
    property.uniPlatform[specificPlatform] ||
    property.uniPlatform[generalPlatform as DOM2_APP_PLATFORM]
  if (!platformConfig) {
    return null
  }
  // if(target === DOM2_APP_TARGET.ALL){
  //   return platformConfig
  // }

  return platformConfig[target] || null
}
