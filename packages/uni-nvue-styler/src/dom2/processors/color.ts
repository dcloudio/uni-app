import tinycolor from 'tinycolor2'
import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorError,
  createValueProcessorResult,
} from './utils'
import { DOM2_APP_TARGET, type PropertyProcessorOptions } from '../types'

const COLOR_TYPES = ['UniNativeColor', 'UniNativeBorderColor']

export function isColorType(propertyType?: string) {
  return propertyType && COLOR_TYPES.includes(propertyType)
}

const dummyValueProcessorResult = createValueProcessorResult('', '')

export function createSetStyleNativeColorValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor(
    (
      value: string | number,
      propertyName,
      options?: PropertyProcessorOptions
    ) => {
      // background-color 特例处理，在text标签上生成到element
      if (
        options?.target === DOM2_APP_TARGET.DOM_C &&
        propertyName === 'background-color'
      ) {
        if (options?.tagName !== 'text') {
          return dummyValueProcessorResult
        }
      }
      // 移除 native view 上的 background-color
      if (
        options?.target === DOM2_APP_TARGET.NV_C &&
        propertyName === 'background-color' &&
        options?.tagName === 'text'
      ) {
        return dummyValueProcessorResult
      }
      const nativeColorValue = parseNativeColorValue(String(value))
      if (nativeColorValue) {
        return createValueProcessorResult(
          `${nativeColorValue}`,
          `${setter}(${nativeColorValue})`
        )
      }
      return createValueProcessorError(value, propertyName)
    },
    PropertyProcessorType.Color
  )
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

export function parseUniNativeColorValue(
  value: string | number,
  defaultValue?: number
) {
  if (value) {
    const nativeColorValue = parseNativeColorValue(String(value))
    if (nativeColorValue) {
      return parseInt(nativeColorValue)
    }
  }
  return defaultValue
}

export function toSharedDataStyleColorValue(value: string | number): number {
  // 如果失败，返回透明
  return parseUniNativeColorValue(value, 0x00000000) as number
}
