import type { DOM2_APP_LANGUAGE } from '../types'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
  normalizeDurationToMilliseconds,
} from './utils'

const UNINATIVETRANSITIONDELAY_TYPES = [
  'UniNativeTransitionDelay',
  'UniNativeTransitionDelays',
]

export function isTransitionType(propertyType?: string) {
  return propertyType && UNINATIVETRANSITIONDELAY_TYPES.includes(propertyType)
}

export function createSetStyleTransitionValueProcessor(
  setter: string,
  language: DOM2_APP_LANGUAGE,
  propertyType: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number, propertyName) => {
    let code = ''
    if (UNINATIVETRANSITIONDELAY_TYPES.includes(propertyType)) {
      code = parseTransitionDurationValue(String(value), language)
    }
    if (!code) {
      return createValueProcessorError(value, propertyName)
    }
    return createValueProcessorResult(code, `${setter}(${code})`)
  }, PropertyProcessorType.Struct)
}

function parseTransitionDurationValue(
  str: string,
  language: DOM2_APP_LANGUAGE
): string {
  const normalized = normalizeDurationToMilliseconds(str)
  if (normalized === null) {
    return '0.0'
  }
  return normalized
}
