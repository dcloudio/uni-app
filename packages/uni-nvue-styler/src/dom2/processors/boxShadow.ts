import type { UniNativeBoxShadow } from '@dcloudio/uni-app-x/types/dom2'
import { parseUnitValue } from './unit'
import { parseNativeColorValue } from './color'
import { type PropertyProcessor, createValueProcessorResult } from './utils'

const BOX_SHADOW_TYPES = ['UniNativeBoxShadow']

export function isBoxShadowType(propertyType?: string) {
  return propertyType && BOX_SHADOW_TYPES.includes(propertyType)
}

export function createSetStyleBoxShadowValueProcessor(
  setter: string
): PropertyProcessor {
  return (value) => {
    if (value === 'none') {
      return createValueProcessorResult(`null`, `${setter}(null)`)
    }
    const boxShadowValueCode =
      stringifyBoxShadowValue(parseBoxShadowValue(String(value))) +
      ' as UniNativeBoxShadow'

    return createValueProcessorResult(
      `${boxShadowValueCode}`,
      `${setter}(${boxShadowValueCode})`
    )
  }
}

function stringifyBoxShadowValue(value: UniNativeBoxShadow): string {
  return `{isInset: ${value.isInset}, offsetX: ${value.offsetX}, offsetY: ${value.offsetY}, blurRadius: ${value.blurRadius}, spreadRadius: ${value.spreadRadius}, color: ${value.color}}`
}

const PARTS_REG = /\s(?![^(]*\))/
const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/
const isLength = (v: string) => v === '0' || LENGTH_REG.test(v)

function parseBoxShadowValue(str: string): UniNativeBoxShadow {
  const parts = str.split(PARTS_REG)
  const isInset = parts.includes('inset')
  const last = parts.slice(-1)[0]
  const color = !isLength(last) ? parseNativeColorValue(last) : undefined

  const unitValues = parts
    .filter((n) => n !== 'inset')
    .filter((n) => n !== color)
    .map(parseUnitValue)
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
