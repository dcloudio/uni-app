import {
  type PropertyProcessor,
  PropertyProcessorType,
  createPropertyProcessor,
  createValueProcessorResult,
} from './utils'

const BORDER_STYLE_TYPES = ['UniNativeBorderStyles']

export function isBorderStylesType(propertyType?: string) {
  return propertyType && BORDER_STYLE_TYPES.includes(propertyType)
}

export function createSetStyleBorderStylesValueProcessor(
  setter: string,
  processorMap: Record<string, PropertyProcessor>
): PropertyProcessor {
  return createPropertyProcessor((value: string | number) => {
    const borderStylesValueCode = stringifyBorderStylesValue(
      parseBorderStylesValue(String(value), processorMap)
    )
    return createValueProcessorResult(
      `${borderStylesValueCode}`,
      `${setter}(${borderStylesValueCode})`
    )
  }, PropertyProcessorType.Struct)
}

function stringifyBorderStylesValue(
  value: ReturnType<typeof parseBorderStylesValue>
): string {
  return `UniNativeBorderStyles(${value.top}, ${value.right}, ${value.bottom}, ${value.left})`
}

function parseBorderStylesValue(
  str: string,
  processorMap: Record<string, PropertyProcessor>
) {
  const parts = str.split(' ')
  const [top, right, bottom, left] = parts

  return {
    top: processorMap[`border-top-style`](top, 'border-top-style').valueCode,
    right: processorMap[`border-right-style`](right, 'border-right-style')
      .valueCode,
    bottom: processorMap[`border-bottom-style`](bottom, 'border-bottom-style')
      .valueCode,
    left: processorMap[`border-left-style`](left, 'border-left-style')
      .valueCode,
  }
}
