import { DOM2_APP_LANGUAGE } from '../types'
import { camelize, capitalize } from '@vue/shared'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
  normalizeDurationToMilliseconds,
} from './utils'
import { genCPPEnumCode } from './enum'

const UNINATIVETRANSITIONDELAY_TYPE = 'UniNativeTransitionDelay'
const UNINATIVETRANSITIONDURATION_TYPE = 'UniNativeTransitionDuration'
const UNINATIVETRANSITIONPROPERTY_TYPE = 'UniNativeTransitionProperty'
const UNINATIVETRANSITIONTIMINGFUNCTION_TYPE =
  'UniNativeTransitionTimingFunction'
const UNINATIVETRANSITION_TYPES = [
  UNINATIVETRANSITIONDELAY_TYPE,
  UNINATIVETRANSITIONDURATION_TYPE,
  UNINATIVETRANSITIONPROPERTY_TYPE,
  UNINATIVETRANSITIONTIMINGFUNCTION_TYPE,
]

export function isTransitionType(propertyType?: string) {
  return propertyType && UNINATIVETRANSITION_TYPES.includes(propertyType)
}

export function createSetStyleTransitionValueProcessor(
  setter: string,
  language: DOM2_APP_LANGUAGE,
  propertyType: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number, propertyName) => {
    let code = ''
    if (
      propertyType === UNINATIVETRANSITIONDELAY_TYPE ||
      propertyType === UNINATIVETRANSITIONDURATION_TYPE
    ) {
      code = parseTransitionDurationValue(String(value), language)
    }
    if (propertyType === UNINATIVETRANSITIONPROPERTY_TYPE) {
      if (typeof value === 'string' && value.trim()) {
        let arr = value.includes(',') ? value.split(',') : [value]
        if (language === DOM2_APP_LANGUAGE.CPP) {
          if (arr.length > 1) {
            arr.forEach((part, index) => {
              code += `${propertyType}::${capitalize(
                camelize(String(part).trim())
              )}${index === arr.length - 1 ? '' : ','}`
            })
            code = `UniNativeTransitionPropertys{${code}}`
          } else {
            code = `${UNINATIVETRANSITIONPROPERTY_TYPE}::${capitalize(
              camelize(String(value).trim())
            )}`
          }
        } else {
          if (arr.length > 1) {
            let str = ''
            arr.forEach((part, index) => {
              str += `UTSCPP.propertyAccess(${propertyType}, "::" , "${capitalize(
                camelize(String(part).trim())
              )}"${index === arr.length - 1 ? ')' : '),'}`
            })

            code = `[${str}]`
          } else {
            code = genCPPEnumCode(
              UNINATIVETRANSITIONPROPERTY_TYPE,
              String(value).trim()
            )
          }
        }
      }
    } else if (propertyType === UNINATIVETRANSITIONTIMINGFUNCTION_TYPE) {
      if (language === DOM2_APP_LANGUAGE.CPP) {
        code = `${UNINATIVETRANSITIONTIMINGFUNCTION_TYPE}(UniCSSTransitonTimingFunctionType::${capitalize(
          camelize(String(value).trim())
        )})`
      } else {
        code = genCPPEnumCode(
          UNINATIVETRANSITIONTIMINGFUNCTION_TYPE,
          String(value).trim()
        )
      }
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
