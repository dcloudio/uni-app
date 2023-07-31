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

function stringToObject(str: string): object {
  const result: Record<string, any> = {}
  let preIndex = -1

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (char === ':') {
      const key = str.substring(preIndex + 1, i).trim()
      const { value, endIndex } = findObjectValueInString(i + 1, str)
      result[key] = value
      i = endIndex
      preIndex = endIndex
    }
  }

  return result
}

function findObjectValueInString(
  startIndex: number,
  str: string
): { value: any; endIndex: number } {
  let num = 0

  for (let i = startIndex; i < str.length; i++) {
    const char = str[i]
    if (isLeftBracket(char)) {
      num++
    } else if (isRightBracket(char)) {
      num--
    }
    if (char === ',' && num === 0) {
      const value = removeExtraQuotationMarks(
        str.substring(startIndex, i).trim()
      )
      return {
        value: isComplexExpressionString(value) ? stringToData(value) : value,
        endIndex: i,
      }
    }
    if (i === str.length - 1 && num === 0) {
      const value = removeExtraQuotationMarks(
        str.substring(startIndex, str.length).trim()
      )
      return {
        value: isComplexExpressionString(value) ? stringToData(value) : value,
        endIndex: i,
      }
    }
  }

  return { value: '', endIndex: startIndex }
}

function stringToArray(str: string): any[] {
  const result = []
  let preIndex = -1
  let num = 0

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (isLeftBracket(char)) {
      num++
    } else if (isRightBracket(char)) {
      num--
    }
    if (char === ',' && num === 0) {
      const item = removeExtraQuotationMarks(
        str.substring(preIndex + 1, i).trim()
      )
      result.push(isComplexExpressionString(item) ? stringToData(item) : item)
      preIndex = i
    }
    if (i === str.length - 1 && num === 0) {
      const item = removeExtraQuotationMarks(
        str.substring(preIndex + 1, str.length).trim()
      )
      item &&
        result.push(isComplexExpressionString(item) ? stringToData(item) : item)
    }
  }

  return result
}

function convertObjectToMapString(obj: Record<any, any>): string {
  const keys = Object.keys(obj)
  const result = keys.map((key) => getKeyValueString(key, obj[key])).join(', ')
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
    return `[${value.map((item) => getValueString(item)).join(', ')}]`
  }
  if (isObject(value)) {
    return convertObjectToMapString(value)
  }
  return value
}

function removeMapWrap(content: string): string {
  const mapPrefixLength = 29 // new Map<string, any | null>([
  return content === 'new Map<string, any | null>()'
    ? ''
    : content.substring(mapPrefixLength, content.length - 2)
}

function hasExtraQuotationMarks(str: string): boolean {
  return str.startsWith("'") || str.endsWith("'")
}

function hasExtraStartQuotationMarks(str: string): boolean {
  return /^['"].*['"]$/.test(str)
}

function removeStartAndEndChar(str: string): string {
  return str.substring(1, str.length - 1)
}

function removeExtraQuotationMarks(str: string): string {
  if (hasExtraStartQuotationMarks(str)) {
    return removeStartAndEndChar(str)
  }
  return str
}

function isComplexExpressionString(str: string): boolean {
  return /[{[]/.test(str)
}

function isBooleanString(str: string): boolean {
  return str === 'true' || str === 'false'
}

function isLeftBracket(char: string): boolean {
  return char === '[' || char === '{' || char === '('
}

function isRightBracket(char: string): boolean {
  return char === ']' || char === '}' || char === ')'
}
