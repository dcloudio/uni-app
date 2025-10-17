import type { AppCssJson } from '../types'
import appCssJson from '../../../lib/dom2/app-css.json'

export function getAppCssJson() {
  return appCssJson as AppCssJson
}

export interface PropertyProcessor {
  (value: string | number, propertyName: string): {
    error?: string
    valueCode: string
    setterCode: string
  }
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
