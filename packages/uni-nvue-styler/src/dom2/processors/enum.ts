import { camelize, capitalize } from '../../shared'
import {
  type PropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
} from './utils'
import appCssJson from '../../../lib/dom2/app-css.json'
import {
  type AppCssJson,
  type DOM2_APP_PLATFORM,
  DOM2_APP_TARGET,
} from '../types'

export function createSetStyleEnumValueProcessor(
  setter: string,
  genEnumCode: (enumType: string, enumValue: string) => string
): PropertyProcessor {
  return (value, propertyName) => {
    const propertyConfig = (appCssJson as AppCssJson)[propertyName]
    if (!propertyConfig?.type) {
      return createValueProcessorError(`Invalid property: ${propertyName}`)
    }
    const enumCode = genEnumCode(
      propertyConfig.type,
      capitalize(camelize(value + ''))
    )
    return createValueProcessorResult(
      enumCode,
      setter ? `${setter}(${enumCode})` : enumCode
    )
  }
}

export function createGenEnumCode(
  language: 'cpp' | 'ts',
  _platform: DOM2_APP_PLATFORM,
  target: DOM2_APP_TARGET
) {
  if (language === 'cpp') {
    return (enumType: string, enumValue: string) => {
      return `${enumType}::${capitalize(camelize(enumValue + ''))}`
    }
  }
  if (
    target === DOM2_APP_TARGET.DOM_C ||
    target === DOM2_APP_TARGET.NV_C ||
    target === DOM2_APP_TARGET.TXT_C
  ) {
    return (enumType: string, enumValue: string) => {
      return `UTSCPP.propertyAccess(${enumType}, "::", "${capitalize(
        camelize(enumValue + '')
      )}")`
    }
  }
  return (enumType: string, enumValue: string) => {
    return `${enumType}.${capitalize(camelize(enumValue + ''))}`
  }
}
