import tinycolor from 'tinycolor2'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
} from './utils'

const COLOR_TYPES = ['UniNativeColor', 'UniNativeBorderColor']

export function isColorType(propertyType?: string) {
  return propertyType && COLOR_TYPES.includes(propertyType)
}

export function createSetStyleNativeColorValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    const nativeColorValue = parseNativeColorValue(String(value))
    if (nativeColorValue) {
      return createValueProcessorResult(
        `${nativeColorValue}`,
        `${setter}(${nativeColorValue})`
      )
    }
    return createValueProcessorError(`Invalid color value: ${value}`)
  }, PropertyProcessorType.Color)
}

export function parseNativeColorValue(value: string) {
  const color = tinycolor(value)
  if (color.isValid()) {
    // toHex8() 返回 RRGGBBAA，需要转换为 AARRGGBB
    const hex8 = color.toHex8() // 例如: "ff00ff80"
    const argb = hex8.slice(6, 8) + hex8.slice(0, 6) // "80" + "ff00ff" = "80ff00ff"
    return '0x' + argb
  }
}
