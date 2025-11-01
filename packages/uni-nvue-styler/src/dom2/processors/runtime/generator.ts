import { isColorType } from '../color'
import { isNumberType } from '../number'
import { isStringType } from '../string'
import { camelize, capitalize } from '../../../shared'
import { isUnitType } from '../unit'
import type { AppCssJson } from '../../types'

export function genRuntimeCode() {
  // eslint-disable-next-line no-restricted-globals
  const appCssJson = require('../lib/dom2/app-css.json') as AppCssJson
  // eslint-disable-next-line no-restricted-globals
  const properties = require('../lib/dom2/properties.json')
  const allProperties = Object.keys(properties)
  const codes: string[] = [
    `import { toSharedDataStyleColorValue } from '../color'`,
    `import { toSharedDataStyleNumberValue } from '../number'`,
    `import { toSharedDataStyleStringValue } from '../string'`,
    `import { toSharedDataStyleUnitValue } from '../unit'`,
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
    if (typeof propertyType === 'string') {
      processorCode = createValueProcessor(propertyType)
    }
    if (propertyOptions.values) {
      enumCodes.push(
        genEnumCode(
          propertyName,
          propertyOptions.values,
          propertyOptions.defaultValue!
        )
      )
    }
    entries.push(
      `['${propertyName}', [${propertyId}, ${
        processorCode ||
        (propertyOptions.values
          ? `toSharedDataStyle${capitalize(camelize(propertyName + ''))}`
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

  function createValueProcessor(propertyType: string) {
    if (isUnitType(propertyType)) {
      return `toSharedDataStyleUnitValue`
    } else if (isColorType(propertyType)) {
      return `toSharedDataStyleColorValue`
    } else if (isNumberType(propertyType)) {
      return `toSharedDataStyleNumberValue`
    } else if (isStringType(propertyType)) {
      return `toSharedDataStyleStringValue`
    }
  }

  function genEnumCode(name: string, values: string[], defaultValue: string) {
    return `function toSharedDataStyle${capitalize(
      camelize(name + '')
    )}(value: string | number) {
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
