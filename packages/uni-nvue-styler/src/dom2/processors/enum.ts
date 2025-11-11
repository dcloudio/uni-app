import { camelize, capitalize } from '@vue/shared'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorResult,
} from './utils'
import {
  DOM2_APP_LANGUAGE,
  DOM2_APP_PLATFORM,
  type DOM2_APP_TARGET,
} from '../types'

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
  language: DOM2_APP_LANGUAGE,
  platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
) {
  if (language === DOM2_APP_LANGUAGE.CPP) {
    return (enumValue: string) => {
      return `${propertyType}::${capitalize(camelize(enumValue + ''))}`
    }
  }
  if (
    platform === DOM2_APP_PLATFORM.APP_HARMONY ||
    platform === DOM2_APP_PLATFORM.APP_IOS
  ) {
    return (enumValue: string) => {
      return genCPPEnumCode(propertyType, enumValue)
    }
  }
  return (enumValue: string) => {
    return `${propertyType}.${capitalize(camelize(enumValue + ''))}`
  }
}

export function genCPPEnumCode(propertyType: string, enumValue: string) {
  return `UTSCPP.propertyAccess(${propertyType}, "::", "${capitalize(
    camelize(enumValue + '')
  )}")`
}
