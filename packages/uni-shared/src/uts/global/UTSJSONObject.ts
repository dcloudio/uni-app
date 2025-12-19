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

function getRealDefaultValue<T>(defaultValue: T | undefined): T | null {
  return defaultValue === void 0 ? null : defaultValue
}

export class UTSJSONObject {
  [key: string]: any

  static keys(obj: UTSJSONObject): string[] {
    return Object.keys(obj)
  }

  static assign(
    target: UTSJSONObject,
    ...sources: UTSJSONObject[]
  ): UTSJSONObject {
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i]
      for (let key in source) {
        target[key] = source[key]
      }
    }
    return target
  }

  constructor(content: Map<string, any> | Record<string, any> = {}) {
    if (content instanceof Map) {
      content.forEach((value: any, key: string) => {
        this[key] = value
      })
    } else {
      for (const key in content) {
        if (Object.prototype.hasOwnProperty.call(content, key)) {
          this[key] = content[key]
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
  private _getValue(keyPath: string, defaultValue?: any): any {
    const keyPathArr = this._resolveKeyPath(keyPath)
    const realDefaultValue = getRealDefaultValue(defaultValue)
    if (keyPathArr.length === 0) {
      return realDefaultValue
    }
    let value = this
    for (let i = 0; i < keyPathArr.length; i++) {
      const key = keyPathArr[i]
      if (value instanceof Object) {
        if (key in value) {
          value = value[key]
        } else {
          return realDefaultValue
        }
      } else {
        return realDefaultValue
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
  getAny(key: string, defaultValue: any): any | null {
    const realDefaultValue = getRealDefaultValue(defaultValue)
    return this._getValue(key, realDefaultValue)
  }
  getString(key: string, defaultValue: string): string | null {
    const realDefaultValue = getRealDefaultValue(defaultValue)
    const value = this._getValue(key, realDefaultValue)
    if (typeof value === 'string') {
      return value
    } else {
      return realDefaultValue
    }
  }
  getNumber(key: string, defaultValue: number): number | null {
    const realDefaultValue = getRealDefaultValue(defaultValue)
    const value = this._getValue(key, realDefaultValue)
    if (typeof value === 'number') {
      return value
    } else {
      return realDefaultValue
    }
  }
  getBoolean(key: string, defaultValue: boolean): boolean | null {
    const realDefaultValue = getRealDefaultValue(defaultValue)
    const boolean = this._getValue(key, realDefaultValue)
    if (typeof boolean === 'boolean') {
      return boolean
    } else {
      return realDefaultValue
    }
  }
  getJSON(key: string, defaultValue: UTSJSONObject): UTSJSONObject | null {
    const realDefaultValue = getRealDefaultValue(defaultValue)
    let value = this._getValue(key, realDefaultValue)
    if (value instanceof Object) {
      return value
    } else {
      return realDefaultValue
    }
  }
  getArray<T = any>(key: string, defaultValue: Array<T>): Array<T> | null {
    const realDefaultValue = getRealDefaultValue(defaultValue)
    let value = this._getValue(key, realDefaultValue)
    if (value instanceof Array) {
      return value as Array<T>
    } else {
      return realDefaultValue
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
