import { isColorType } from '../color'
import { isNumberType } from '../number'
import { isStringType } from '../string'
import { camelize, capitalize } from '@vue/shared'
import { isUnitType } from '../unit'
import type { AppCssJson, AppCssPropertyConfig } from '../../types'
import { isBorderWidthType } from '../borderWidth'

export function genRuntimeCode() {
  // eslint-disable-next-line no-restricted-globals
  const appCssJson = require('../lib/dom2/app-css.json') as AppCssJson
  // eslint-disable-next-line no-restricted-globals
  const properties = require('../lib/dom2/properties.json')
  const allProperties = Object.keys(properties)
  const codes: string[] = [
    `// 此文件是根据 app-css.json 和 properties.json 动态生成，请勿手动修改`,
    `import { toSharedDataStyleColorValue } from '../color'`,
    `import { toSharedDataStyleNumberValue } from '../number'`,
    `import { toSharedDataStyleStringValue } from '../string'`,
    `import { toSharedDataStyleUnitValue } from '../unit'`,
    `import { toSharedDataStyleBorderWidthValue } from '../borderWidth'`,
    `import { createToSharedDataStyleCombinedValue } from './utils'`,
  ]
  const enumCodes: string[] = []
  const entries: string[] = []
  Object.keys(appCssJson).forEach((propertyName) => {
    const propertyId = allProperties.indexOf(propertyName)
    if (propertyId === -1) {
      console.warn(`Property ${propertyName} not found in properties.json`)
      return
    }
    const propertyOptions = appCssJson[propertyName]
    let processorCode: string | undefined
    const propertyType = propertyOptions.type
    const isSingleType = typeof propertyType === 'string'
    const isUnionType = Array.isArray(propertyType)
    if (isSingleType) {
      processorCode = createValueProcessor(propertyType)
    } else if (isUnionType) {
      processorCode = createCombinedValueProcessor(
        propertyName,
        propertyType,
        propertyOptions
      )
    }

    if (propertyOptions.values) {
      if (
        isSingleType ||
        (isUnionType &&
          // 如果是联合类型，且每一个都不是定制处理器
          !propertyType.every((type) => createValueProcessor(type)))
      ) {
        enumCodes.push(
          genEnumCode(
            propertyName,
            propertyOptions.values,
            propertyOptions.defaultValue!
          )
        )
      }
    }
    entries.push(
      `['${propertyName}', [${propertyId}, ${
        processorCode ||
        (propertyOptions.values
          ? genEnumProcessorName(propertyName)
          : `toSharedDataStyleStringValue`)
      }]]`
    )
  })

  codes.push(
    `export const UniCSSPropertyVariable = ${allProperties.indexOf('variable')}`
  )
  codes.push(
    `export const processors = new Map<string, [number, (value: string) => any]>([${entries.join(
      ', \n'
    )}])`
  )

  codes.push(...enumCodes)

  return codes.join('\n')

  function genEnumProcessorName(propertyName: string) {
    return `toSharedDataStyle${capitalize(camelize(propertyName + ''))}Value`
  }

  function createCombinedValueProcessor(
    propertyName: string,
    propertyType: string[],
    propertyOptions: AppCssPropertyConfig
  ) {
    // 目前仅支持两个的联合
    if (propertyType.length === 2 && propertyOptions.values) {
      const basicType = propertyType[1]
      const enumType = propertyType[0]
      if (!(isNumberType(basicType) || isUnitType(basicType))) {
        throw new Error(`Unsupported property type: ${basicType}`)
      }
      return `createToSharedDataStyleCombinedValue([${[
        createValueProcessor(basicType)!,
        createValueProcessor(enumType) ?? genEnumProcessorName(propertyName),
      ].join(', ')}])`
    } else {
      throw new Error(`Unsupported property type: ${propertyType.join(', ')}`)
    }
  }

  function createValueProcessor(propertyType: string) {
    if (isUnitType(propertyType)) {
      return `toSharedDataStyleUnitValue`
    } else if (isColorType(propertyType)) {
      return `toSharedDataStyleColorValue`
    } else if (isNumberType(propertyType)) {
      return `toSharedDataStyleNumberValue`
    } else if (isStringType(propertyType)) {
      return `toSharedDataStyleStringValue`
    } else if (isBorderWidthType(propertyType)) {
      return `toSharedDataStyleBorderWidthValue`
    }
  }

  function genEnumCode(name: string, values: string[], defaultValue: string) {
    return `function toSharedDataStyle${capitalize(
      camelize(name + '')
    )}Value(value: string | number) {
  switch (value) {
${genEnumSwitch(values, values.indexOf(defaultValue))}
  }
}`
  }

  function genEnumSwitch(values: string[], defaultIndex: number) {
    const cases = values
      .map((value: string, index: number) => {
        return `    case '${value}':\n      return ${index}`
      })
      .join('\n')
    return `${cases}\n    default:\n      return ${defaultIndex}`
  }
}
