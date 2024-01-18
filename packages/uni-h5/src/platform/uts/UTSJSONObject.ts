import { getType, isPlainObject } from '../../helpers/utils'

function initUTSJSONObjectProperties(obj: UTSJSONObject) {
  const propertyList = [
    '_resolveKeyPath',
    '_getValue',
    'toJSON',
    'get',
    'set',
    'getAny',
    'getString',
    'getNumber',
    'getBoolean',
    'getJSON',
    'getArray',
    'toMap',
    'forEach',
  ]
  const propertyDescriptorMap: PropertyDescriptorMap = {}
  for (let i = 0; i < propertyList.length; i++) {
    const property = propertyList[i]
    propertyDescriptorMap[property] = {
      enumerable: false,
      value: obj[property as keyof UTSJSONObject],
    }
  }
  Object.defineProperties(obj, propertyDescriptorMap)
}
export class UTSJSONObject {
  [key: string]: any
  constructor(content: Record<string, any> = {}) {
    for (const key in content) {
      if (Object.prototype.hasOwnProperty.call(content, key)) {
        const value = content[key]
        if (isPlainObject(value)) {
          this[key] = new UTSJSONObject(value)
        } else if (getType(value) === 'array') {
          this[key] = value.map((item: any) => {
            if (isPlainObject(item)) {
              return new UTSJSONObject(item)
            } else {
              return item
            }
          })
        } else {
          this[key] = value
        }
      }
    }
    initUTSJSONObjectProperties(this)
  }
  private _resolveKeyPath(keyPath: string): string[] {
    // 非法keyPath不抛出错误，直接返回空数组
    let token = ''
    const keyPathArr: string[] = []
    let inOpenParentheses = false
    for (let i = 0; i < keyPath.length; i++) {
      const word = keyPath[i]
      switch (word) {
        case '.':
          if (token.length > 0) {
            keyPathArr.push(token)
            token = ''
          }
          break
        case '[': {
          inOpenParentheses = true
          if (token.length > 0) {
            keyPathArr.push(token)
            token = ''
          }
          break
        }
        case ']':
          if (inOpenParentheses) {
            if (token.length > 0) {
              const tokenFirstChar = token[0]
              const tokenLastChar = token[token.length - 1]
              if (
                (tokenFirstChar === '"' && tokenLastChar === '"') ||
                (tokenFirstChar === "'" && tokenLastChar === "'") ||
                (tokenFirstChar === '`' && tokenLastChar === '`')
              ) {
                if (token.length > 2) {
                  token = token.slice(1, -1)
                } else {
                  return []
                }
              } else if (!/^\d+$/.test(token)) {
                return []
              }
              keyPathArr.push(token)
              token = ''
            } else {
              return []
            }
            inOpenParentheses = false
          } else {
            return []
          }
          break
        default:
          token += word
          break
      }
      if (i === keyPath.length - 1) {
        if (token.length > 0) {
          keyPathArr.push(token)
          token = ''
        }
      }
    }
    return keyPathArr
  }
  private _getValue(keyPath: string): any | null {
    const keyPathArr = this._resolveKeyPath(keyPath)
    if (keyPathArr.length === 0) {
      return null
    }
    let value = this
    for (let key of keyPathArr) {
      if (value instanceof Object) {
        value = value[key]
      } else {
        return null
      }
    }
    return value
  }
  get(key: string): any | null {
    return this._getValue(key)
  }
  set(key: string, value: any) {
    this[key] = value
  }
  getAny(key: string): any | null {
    return this._getValue(key)
  }
  getString(key: string): string | null {
    const value = this._getValue(key)
    if (typeof value === 'string') {
      return value
    } else {
      return null
    }
  }
  getNumber(key: string): number | null {
    const value = this._getValue(key)
    if (typeof value === 'number') {
      return value
    } else {
      return null
    }
  }
  getBoolean(key: string): boolean | null {
    const boolean = this._getValue(key)
    if (typeof boolean === 'boolean') {
      return boolean
    } else {
      return null
    }
  }
  getJSON(key: string): UTSJSONObject | null {
    let value = this._getValue(key)
    if (value instanceof Object) {
      return new UTSJSONObject(value)
    } else {
      return null
    }
  }
  getArray<T = any>(key: string): Array<T> | null {
    let value = this._getValue(key)
    if (value instanceof Array) {
      return value as Array<T>
    } else {
      return null
    }
  }

  toMap(): Map<string, any> {
    let map = new Map<string, any>()
    for (let key in this) {
      map.set(key, this[key] as any)
    }
    return map
  }

  forEach(callback: (value: any, key: string) => void) {
    for (let key in this) {
      callback(this[key] as any, key)
    }
  }
}
