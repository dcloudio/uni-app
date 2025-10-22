import type { AppCssJson } from '../types'
import appCssJson from '../../../lib/dom2/app-css.json'

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

export function createValueProcessorError(
  error: string
): ReturnType<PropertyProcessor> {
  return {
    error: error,
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
  Other = 'other',
  Combined = 'combined',
}

export function createPropertyProcessor(
  processor: PropertyProcessorFn,
  type: PropertyProcessorType
): PropertyProcessor {
  ;(processor as PropertyProcessor).type = type
  return processor as PropertyProcessor
}

export const PARTS_REG = /\s(?![^(]*\))/
const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/
export const isLength = (v: string) => v === '0' || LENGTH_REG.test(v)
