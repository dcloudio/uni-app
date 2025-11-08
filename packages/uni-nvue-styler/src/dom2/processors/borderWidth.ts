import type { DOM2_APP_LANGUAGE } from '../types'
import { toUnitValueResult } from './unit'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
} from './utils'

const BORDER_WIDTH_TYPES = ['UniCSSBorderWidthType']

export function isBorderWidthType(propertyType?: string) {
  return propertyType && BORDER_WIDTH_TYPES.includes(propertyType)
}

const ENUM_BORDER_WIDTH_TYPE_VALUES = {
  thin: 1,
  medium: 3,
  thick: 5,
}

export function createSetStyleBorderWidthValueProcessor(
  setter: string,
  language: DOM2_APP_LANGUAGE
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    const pxValue =
      ENUM_BORDER_WIDTH_TYPE_VALUES[
        value as keyof typeof ENUM_BORDER_WIDTH_TYPE_VALUES
      ]
    if (pxValue) {
      return toUnitValueResult(setter, language, {
        value: pxValue,
        unit: 'PX',
      })
    }
    return createValueProcessorError(`Invalid border width value: ${value}`)
  }, PropertyProcessorType.Enum)
}
