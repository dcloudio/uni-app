import { isColorType } from '../color'
import { isNumberType } from '../number'
import { isStringType } from '../string'
import { camelize, capitalize, isArray } from '@vue/shared'
import { isUnitType } from '../unit'
import type { AppCssJson, AppCssPropertyConfig } from '../../types'
import { isBorderWidthType } from '../borderWidth'
import { isTransitionType } from '../transition'

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
    if (!propertyType) {
      console.warn(`Property ${propertyName} has no type`)
      entries.push(
        `['${propertyName}', [${propertyId}, toSharedDataStyleStringValue]]`
      )
      return
    }
    const isSingleType = typeof propertyType === 'string'
    const isUnionType = Array.isArray(propertyType)
    if (isSingleType) {
      processorCode = createValueProcessor(propertyType)
    } else if (
      isUnionType &&
      !isEnumAndNumberType(propertyType, propertyOptions)
    ) {
      // enum 和 number 目前无法区分，暂不支持运行时解析
      processorCode = createCombinedValueProcessor(propertyName, propertyType)
    }

    if (propertyType && shouldGenEnumCode(propertyType, propertyOptions)) {
      enumCodes.push(
        genEnumCode(
          propertyName,
          propertyOptions.values!,
          propertyOptions.defaultValue!
        )
      )
    }
    entries.push(
      `['${propertyName}', [${propertyId}, ${
        processorCode ||
        (shouldGenEnumCode(propertyType!, propertyOptions)
          ? genEnumProcessorName(propertyName)
          : `toSharedDataStyleStringValue`)
      }]]`
    )
  })

  codes.push(
    `export const UniCSSPropertyVariable = ${allProperties.indexOf('variable')}`
  )
  codes.push(
    `export const processors = new Map<string, [number, (value: string, propertyName: string) => any]>([${entries.join(
      ', \n'
    )}])`
  )

  codes.push(...enumCodes)

  return codes.join('\n')

  function genEnumProcessorName(propertyName: string) {
    return `toSharedDataStyle${capitalize(camelize(propertyName + ''))}Value`
  }

  function shouldGenEnumCode(
    propertyType: string | string[],
    propertyOptions: AppCssPropertyConfig
  ) {
    if (hasEnumType(propertyType, propertyOptions)) {
      if (isArray(propertyType)) {
        return !isEnumAndNumberType(propertyType, propertyOptions)
      }
      return true
    }
    return false
  }

  function hasEnumType(
    propertyType: string | string[],
    propertyOptions: AppCssPropertyConfig
  ) {
    if (!propertyOptions.values) {
      return false
    }
    if (typeof propertyType === 'string') {
      return true
    }
    return propertyType.some((type) => !createValueProcessor(type))
  }

  function isEnumAndNumberType(
    propertyType: string[],
    propertyOptions: AppCssPropertyConfig
  ) {
    if (hasEnumType(propertyType, propertyOptions)) {
      return propertyType.some((type) => isNumberType(type))
    }
    return false
  }

  function createCombinedValueProcessor(
    propertyName: string,
    propertyType: string[]
  ) {
    const types = new Set<string>()
    propertyType.forEach((type) => {
      types.add(
        createValueProcessor(type) ?? genEnumProcessorName(propertyName)
      )
    })
    if (types.size > 1) {
      return `createToSharedDataStyleCombinedValue([${Array.from(types).join(
        ', '
      )}])`
    }
    return Array.from(types)[0]
  }

  function createValueProcessor(propertyType: string) {
    if (isUnitType(propertyType)) {
      return `toSharedDataStyleUnitValue`
    } else if (isColorType(propertyType)) {
      return `toSharedDataStyleColorValue`
    } else if (isNumberType(propertyType)) {
      return `toSharedDataStyleNumberValue`
    } else if (isStringType(propertyType) || isTransitionType(propertyType)) {
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
