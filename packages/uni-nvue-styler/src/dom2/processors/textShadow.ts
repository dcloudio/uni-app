import type { UniNativeColor } from '@dcloudio/uni-app-x/types/dom2'
import { parseUnitValue } from './unit'
import { parseNativeColorValue } from './color'
import {
  PARTS_REG,
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorResult,
  isLength,
} from './utils'

const TEXT_SHADOW_TYPES = ['UniCSSTextShadow']

export function isTextShadowType(propertyType?: string) {
  return propertyType && TEXT_SHADOW_TYPES.includes(propertyType)
}

export function createSetStyleTextShadowValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    if (value === 'none') {
      return createValueProcessorResult(`null`, `${setter}(null)`)
    }
    const textShadowValueCode = stringifyTextShadowValue(
      parseTextShadowValue(String(value))
    )

    return createValueProcessorResult(
      `${textShadowValueCode}`,
      `${setter}(${textShadowValueCode})`
    )
  }, PropertyProcessorType.Struct)
}

function stringifyTextShadowValue(value: UniCSSTextShadow): string {
  if (!value.color) {
    return `UniCSSTextShadow(${value.offsetX}, ${value.offsetY}, ${value.blurRadius})`
  } else {
    return `UniCSSTextShadow(${value.offsetX}, ${value.offsetY}, ${value.blurRadius}, ${value.color})`
  }
}

function parseTextShadowValue(str: string): UniCSSTextShadow {
  const parts = str.split(PARTS_REG)
  const unitValues: { value: number; unit: string }[] = []
  let color: UniNativeColor | undefined
  for (const part of parts) {
    if (isLength(part)) {
      const unitValue = parseUnitValue(part)
      if (unitValue) {
        unitValues.push(unitValue)
      }
    } else {
      color = parseNativeColorValue(part)
    }
  }

  return {
    color: color || '',
    offsetX: unitValues[0]?.value || 0,
    offsetY: unitValues[1]?.value || 0,
    blurRadius: unitValues[2]?.value || 0,
  }
}

/**
 * text-shadow值类型定义
 * 文字阴影样式
 */
export type UniCSSTextShadow = {
  /**
   * 阴影颜色
   * 默认为文字颜色
   */
  color: UniNativeColor
  /**
   * 阴影的 x 偏移量
   */
  offsetX: number
  /**
   * 阴影的 y 偏移量
   */
  offsetY: number
  /**
   * 阴影的模糊半径
   * 默认值为0
   */
  blurRadius: number
}
