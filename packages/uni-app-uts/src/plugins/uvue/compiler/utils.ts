import { CompilerOptions } from './options'
import {
  ExpressionNode,
  SimpleExpressionNode,
  ConstantTypes,
} from '@vue/compiler-core'
import { isString } from '@vue/shared'

export function genRenderFunctionDecl({
  targetLanguage,
  filename,
}: CompilerOptions): string {
  return `${
    targetLanguage === 'kotlin' ? '@Suppress("UNUSED_PARAMETER") ' : ''
  }function ${filename}Render(_ctx: ${filename}): VNode | null`
}

export function expContentToMapString(exp: ExpressionNode): string {
  return objectStringToMapString(
    (exp as SimpleExpressionNode).content,
    true,
    exp
  )
}
export const objectExp = /\{.*\}/g
export function objectStringToMapString(
  content: string,
  wrap = true,
  exp?: ExpressionNode
): string {
  const matched = content.match(objectExp)![0]
  try {
    return complexObjectStringToMapString(content, matched, wrap)
  } catch (e) {
    return simpleObjectSringToMapString(content, matched, wrap, exp)
  }
}

function complexObjectStringToMapString(
  content: string,
  matched: string,
  wrap: boolean
): string {
  const matchedObj = JSON.parse(matched.replaceAll("'", '"'))
  const mapConstructor = convertObjectToMapString(matchedObj)
  const mapPrefixLength = 29 // new Map<string, any | null>([
  return content.replace(
    matched,
    wrap
      ? mapConstructor
      : mapConstructor.substring(mapPrefixLength, mapConstructor.length - 2)
  )
}

function convertObjectToMapString(obj: any): string {
  let result = ''
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (obj.hasOwnProperty(key)) {
      result +=
        getKeyValueString(key, obj[key]) + (i === keys.length - 1 ? '' : ', ')
    }
  }
  return `new Map<string, any | null>([${result}])`
}

function getKeyValueString(key: string, value: any): string {
  return `['${key}', ${getValueString(value)}]`
}

function getValueString(value: any): string {
  if (isString(value)) {
    return `'${value}'`
  }
  if (Array.isArray(value)) {
    return getArrayString(value)
  }
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return convertObjectToMapString(value)
  }
  return value
}

function getArrayString(arr: any[]): string {
  let result = ''
  arr.forEach((item) => {
    result += getValueString(item)
  })
  return `[${result}]`
}

function simpleObjectSringToMapString(
  content: string,
  matched: string,
  wrap: boolean,
  exp?: ExpressionNode
): string {
  const keyValues = matched.replace(/\{|\}/g, '').split(',')
  let mapConstructor = ''
  keyValues.forEach((keyValue: string, index: number) => {
    const colonIndex = keyValue.indexOf(':')
    const key =
      exp && needAddQuotes(exp, keyValue)
        ? `'${keyValue.substring(0, colonIndex)}'`
        : keyValue.substring(0, colonIndex)
    const value = keyValue.substring(colonIndex + 1)
    if (key && value) {
      mapConstructor += `[${key},${value}]`
      if (index < keyValues.length - 1) {
        mapConstructor += ','
      }
    }
  })
  return content.replace(
    matched,
    wrap ? `new Map<string, any | null>([${mapConstructor}])` : mapConstructor
  )
}

function needAddQuotes(exp: ExpressionNode, keyValue: string): boolean {
  return (
    (exp as SimpleExpressionNode).constType === ConstantTypes.CAN_STRINGIFY &&
    !keyValue.startsWith("'") &&
    !keyValue.startsWith('"')
  )
}
