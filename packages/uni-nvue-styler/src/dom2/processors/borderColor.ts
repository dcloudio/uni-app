import { parseNativeColorValue } from './color'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorResult,
} from './utils'

const BORDER_COLOR_TYPES = ['UniNativeBorderColors']

export function isBorderColorsType(propertyType?: string) {
  return propertyType && BORDER_COLOR_TYPES.includes(propertyType)
}

export function createSetStyleBorderColorsValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    const borderColorsValueCode = stringifyBorderColorsValue(
      parseBorderColorsValue(String(value))
    )
    return createValueProcessorResult(
      `${borderColorsValueCode}`,
      `${setter}(${borderColorsValueCode})`
    )
  }, PropertyProcessorType.Struct)
}

function stringifyBorderColorsValue(
  value: ReturnType<typeof parseBorderColorsValue>
): string {
  return `UniNativeBorderColors(${value.top}, ${value.right}, ${value.bottom}, ${value.left})`
}

function parseBorderColorsValue(str: string) {
  const parts = str.split(' ')
  const [top, right, bottom, left] = parts.map(
    parseNativeColorValue
  ) as string[]

  return {
    top,
    right,
    bottom,
    left,
  }
}
