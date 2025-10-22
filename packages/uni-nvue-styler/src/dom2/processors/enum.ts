import { camelize, capitalize } from '../../shared'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorResult,
} from './utils'
import { type DOM2_APP_PLATFORM, DOM2_APP_TARGET } from '../types'

export function createSetStyleEnumValueProcessor(
  setter: string,
  genEnumCode: (enumValue: string) => string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    const enumCode = genEnumCode(capitalize(camelize(value + '')))
    return createValueProcessorResult(
      enumCode,
      setter ? `${setter}(${enumCode})` : enumCode
    )
  }, PropertyProcessorType.Enum)
}

export function createGenEnumCode(
  propertyType: string,
  language: 'cpp' | 'ts',
  _platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
) {
  if (language === 'cpp') {
    return (enumValue: string) => {
      return `${propertyType}::${capitalize(camelize(enumValue + ''))}`
    }
  }
  if (
    target === DOM2_APP_TARGET.DOM_C ||
    target === DOM2_APP_TARGET.NV_C ||
    target === DOM2_APP_TARGET.TXT_C
  ) {
    return (enumValue: string) => {
      return `UTSCPP.propertyAccess(${propertyType}, "::", "${capitalize(
        camelize(enumValue + '')
      )}")`
    }
  }
  return (enumValue: string) => {
    return `${propertyType}.${capitalize(camelize(enumValue + ''))}`
  }
}
