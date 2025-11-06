import type { UniNativeBoxShadow } from '@dcloudio/uni-app-x/types/dom2'
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

const BOX_SHADOW_TYPES = ['UniNativeBoxShadow']

export function isBoxShadowType(propertyType?: string) {
  return propertyType && BOX_SHADOW_TYPES.includes(propertyType)
}

export function createSetStyleBoxShadowValueProcessor(
  setter: string
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    if (value === 'none') {
      return createValueProcessorResult(`null`, `${setter}(null)`)
    }
    const boxShadowValueCode = stringifyBoxShadowValue(
      parseBoxShadowValue(String(value))
    )

    return createValueProcessorResult(
      `${boxShadowValueCode}`,
      `${setter}(${boxShadowValueCode})`
    )
  }, PropertyProcessorType.Struct)
}

function stringifyBoxShadowValue(value: UniNativeBoxShadow): string {
  return `UniNativeBoxShadow(${value.isInset}, ${value.offsetX}, ${value.offsetY}, ${value.blurRadius}, ${value.spreadRadius}, ${value.color})`
}

function parseBoxShadowValue(str: string): UniNativeBoxShadow {
  const parts = str.split(PARTS_REG)
  const isInset = parts.includes('inset')
  const last = parts.slice(-1)[0]
  const color = !isLength(last) ? parseNativeColorValue(last) : undefined

  const unitValues = parts
    .filter((n) => n !== 'inset')
    .filter((n) => n !== color)
    .map((v) => parseUnitValue(v))
  if (unitValues.length < 4) {
    unitValues.push(
      ...Array(4 - unitValues.length).fill({ value: 0, unit: 'NONE' })
    )
  }
  const [offsetX, offsetY, blurRadius, spreadRadius] = unitValues.map(
    (v) => v?.value || 0
  )

  return {
    isInset,
    offsetX,
    offsetY,
    blurRadius,
    spreadRadius,
    color: color || 0x00000000,
  }
}
