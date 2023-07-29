import { CompilerOptions } from './options'
import { isObject, isString } from '@vue/shared'

export function genRenderFunctionDecl({
  targetLanguage,
  filename,
}: CompilerOptions): string {
  return `${
    targetLanguage === 'kotlin' ? '@Suppress("UNUSED_PARAMETER") ' : ''
  }function ${filename}Render(): VNode | null`
}

export const objectExp = /\{[\s\S]*\}/g
export function objectStringToMapString(content: string, wrap = true): string {
  content = content.replace(/\n/g, '')
  const matched = content.match(objectExp)![0]
  const matchedObj = stringToData(matched) as Record<any, any>
  const mapConstructor = convertObjectToMapString(matchedObj)
  return content.replace(
    matched,
    wrap ? mapConstructor : removeMapWrap(mapConstructor)
  )
}

function stringToData(str: string): object | any[] | string {
  str = str.trim()
  if (str.startsWith('{')) {
    return stringToObject(removeStartAndEndChar(str))
  }
  if (str.startsWith('[')) {
    return stringToArray(removeStartAndEndChar(str))
  }
  return str
}

function stringToObject(str: string) {
  let result: Record<string, any> = {}
  // split key value
  let preIndex = 0
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    // find key
    if (char === ':') {
      let key = str.substring(preIndex, i).trim()
      preIndex = i + 1
      // find value
      let num = 0
      for (let j = i + 1; j < str.length; j++) {
        let char2 = str[j]
        if (isLeftBracket(char2)) {
          num++
        } else if (isRightBracket(char2)) {
          num--
        }
        if (char2 === ',' && num === 0) {
          let value = removeExtraQuotationMarks(
            str.substring(preIndex, j).trim()
          )
          result[key] = isComplexExpressionString(value)
            ? stringToData(value)
            : value
          preIndex = j + 1
          i = j
          break
        }
        if (j === str.length - 1 && num === 0) {
          let value = removeExtraQuotationMarks(
            str.substring(preIndex, str.length).trim()
          )
          result[key] = isComplexExpressionString(value)
            ? stringToData(value)
            : value
          i = j
          break
        }
      }
    }
  }

  return result
}

function stringToArray(str: string) {
  let result = []
  // split item
  let preIndex = 0
  let num = 0
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (isLeftBracket(char)) {
      num++
    } else if (isRightBracket(char)) {
      num--
    }
    if (char === ',' && num === 0) {
      let item = removeExtraQuotationMarks(str.substring(preIndex, i).trim())
      result.push(isComplexExpressionString(item) ? stringToData(item) : item)
      preIndex = i + 1
    }
    if (i === str.length - 1 && num === 0) {
      let item = removeExtraQuotationMarks(
        str.substring(preIndex, str.length).trim()
      )
      item &&
        result.push(isComplexExpressionString(item) ? stringToData(item) : item)
    }
  }

  return result
}

function convertObjectToMapString(obj: Record<any, any>): string {
  let result = ''
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (obj.hasOwnProperty(key)) {
      result +=
        getKeyValueString(key, obj[key]) + (i === keys.length - 1 ? '' : ', ')
    }
  }
  return `new Map<string, any | null>(${result ? `[${result}]` : ''})`
}

function getKeyValueString(key: string, value: any): string {
  value = getValueString(value)
  key = hasExtraQuotationMarks(key) || isBooleanString(value) ? key : `'${key}'`
  return `[${key}, ${value}]`
}

function getValueString(value: any): string {
  if (isString(value)) {
    return hasExtraQuotationMarks(value) || isBooleanString(value)
      ? `${value}`
      : `'${value}'`
  }
  if (Array.isArray(value)) {
    return getArrayString(value)
  }
  if (isObject(value)) {
    return convertObjectToMapString(value)
  }
  return value
}

function getArrayString(arr: any[]): string {
  let result = ''
  arr.forEach((item, index) => {
    result +=
      index !== arr.length - 1
        ? `${getValueString(item)}, `
        : getValueString(item)
  })
  return `[${result}]`
}

function removeMapWrap(content: string): string {
  if (content === 'new Map<string, any | null>()') {
    return ''
  }
  const mapPrefixLength = 29 // new Map<string, any | null>([
  return content.substring(mapPrefixLength, content.length - 2)
}

function hasExtraQuotationMarks(str: string) {
  return str.startsWith("'") || str.endsWith("'")
}

function hasExtraStartQuotationMarks(str: string) {
  return str.startsWith("'") || str.startsWith('"')
}

function removeStartAndEndChar(str: string) {
  return str.substring(1, str.length - 1)
}

function removeExtraQuotationMarks(str: string) {
  if (hasExtraStartQuotationMarks(str)) {
    return removeStartAndEndChar(str)
  }
  return str
}

function isComplexExpressionString(str: string) {
  return str.includes('{') || str.includes('[')
}

function isBooleanString(str: string) {
  return str === 'true' || str === 'false'
}

function isLeftBracket(char: string) {
  return char === '[' || char === '{' || char === '('
}

function isRightBracket(char: string) {
  return char === ']' || char === '}' || char === ')'
}
