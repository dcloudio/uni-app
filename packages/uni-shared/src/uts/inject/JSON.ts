import { UTSJSONObject } from '../global/UTSJSONObject'
import { getType, isPlainObject } from '../utils/index'
import { type Constructible, UTSType, isUTSType } from './Class'
const OriginalJSON = JSON

function createUTSJSONObjectOrArray(obj: any): UTSJSONObject | UTSJSONObject[] {
  if (Array.isArray(obj)) {
    return obj.map((item: any): any => {
      return createUTSJSONObjectOrArray(item)
    })
  } else if (isPlainObject(obj)) {
    const result = new UTSJSONObject({})
    for (const key in obj) {
      const value = obj[key]
      result[key] = createUTSJSONObjectOrArray(value)
    }
    return result
  }
  return obj
}

function parseObjectOrArray(object: any, utsType?: Constructible) {
  const objectType = getType(object)
  if (object === null || (objectType !== 'object' && objectType !== 'array')) {
    return object
  }
  if (utsType && utsType !== UTSJSONObject) {
    try {
      return new utsType(object, undefined, true)
    } catch (error) {
      console.error(error)
      return null
    }
  }
  if (objectType === 'array' || objectType === 'object') {
    return createUTSJSONObjectOrArray(object)
  }
  return object
}

const UTSJSON = {
  parse: (
    text: string,
    reviver?: (this: any, key: string, value: any) => any | Constructible,
    utsType?: Constructible
  ): any | null => {
    // @ts-expect-error
    if (reviver && (isUTSType(reviver) || reviver === UTSJSONObject)) {
      utsType = reviver
      reviver = undefined
    }
    try {
      const parseResult = OriginalJSON.parse(text, reviver)
      return parseObjectOrArray(parseResult, utsType)
    } catch (error) {
      console.error(error)
      return null
    }
  },
  parseArray(text: string, utsType?: typeof UTSType): Array<any> | null {
    try {
      const parseResult = OriginalJSON.parse(text)
      if (Array.isArray(parseResult)) {
        return parseObjectOrArray(
          parseResult,
          utsType ? UTSType.withGenerics(Array, [utsType], true) : undefined
        )
      }
      return null
    } catch (error) {
      console.error(error)
      return null
    }
  },
  parseObject(text: string, utsType?: typeof UTSType): any | null {
    try {
      const parseResult = OriginalJSON.parse(text)
      if (Array.isArray(parseResult)) {
        return null
      }
      return parseObjectOrArray(parseResult, utsType)
    } catch (error) {
      console.error(error)
      return null
    }
  },
  stringify: (value: any, replacer?: any | null, space?: any | null) => {
    try {
      if (!replacer) {
        const visited = new Set()
        replacer = function (_: any, v: any) {
          if (typeof v === 'object') {
            if (visited.has(v)) {
              return null
            }
            visited.add(v)
          }
          return v
        }
      }
      return OriginalJSON.stringify(value, replacer, space)
    } catch (error) {
      console.error(error)
      return ''
    }
  },
}

export { UTSJSON }
