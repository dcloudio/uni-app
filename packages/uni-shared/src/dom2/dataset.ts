export type UniDOMStringMapSource =
  | Record<string, any>
  | Map<string, any>
  | UniDOMStringMap

export interface UniDOMStringMapOptions {
  onSet?: (key: string, value: any) => void
  onDelete?: (key: string) => void
}

export class UniDOMStringMap extends Map<string, any> {
  [key: string]: any

  private _options?: UniDOMStringMapOptions

  constructor(options?: UniDOMStringMapOptions) {
    super()
    this._options = options
  }

  get(key: string) {
    const normalizedKey = normalizeDatasetKey(String(key))
    return super.has(normalizedKey) ? super.get(normalizedKey) : null
  }

  set(key: string, value: any) {
    const normalizedKey = normalizeDatasetKey(String(key))
    super.set(normalizedKey, value)
    this._options?.onSet?.(normalizedKey, value)
    return this
  }

  has(key: string) {
    return super.has(normalizeDatasetKey(String(key)))
  }

  delete(key: string) {
    const normalizedKey = normalizeDatasetKey(String(key))
    const deleted = super.delete(normalizedKey)
    if (deleted) {
      this._options?.onDelete?.(normalizedKey)
    }
    return deleted
  }

  clear() {
    const keys = Array.from(super.keys())
    super.clear()
    keys.forEach((key) => this._options?.onDelete?.(key))
  }
}

export function normalizeDatasetKey(key: string) {
  const normalizedKey = key.replace(/[A-Z]/g, (char) => char.toLowerCase())
  if (normalizedKey.indexOf('data-') !== 0) {
    return key
  }
  return normalizedKey
    .slice(5)
    .replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())
}

export function normalizeDatasetAttrName(key: string) {
  return (
    'data-' +
    normalizeDatasetKey(key).replace(/[A-Z]/g, (char) => {
      return '-' + char.toLowerCase()
    })
  )
}

function isReservedDatasetKey(target: UniDOMStringMap, key: string) {
  return key in target
}

function setDatasetValue(dataset: UniDOMStringMap, key: string, value: any) {
  Map.prototype.set.call(dataset, normalizeDatasetKey(String(key)), value)
}

function initDataset(dataset: UniDOMStringMap, source?: UniDOMStringMapSource) {
  if (!source) {
    return
  }
  if (source instanceof Map) {
    source.forEach((value, key) => setDatasetValue(dataset, key, value))
    return
  }
  Object.keys(source).forEach((key) =>
    setDatasetValue(dataset, key, source[key])
  )
}

export function createUniDOMStringMap(
  source?: UniDOMStringMapSource,
  options?: UniDOMStringMapOptions
): UniDOMStringMap {
  const target = new UniDOMStringMap(options)
  initDataset(target, source)

  return new Proxy(target, {
    get(target, key, receiver) {
      if (typeof key === 'string') {
        if (!isReservedDatasetKey(target, key)) {
          return target.has(key) ? target.get(key) : null
        }
      }
      const value = Reflect.get(target, key, target)
      if (typeof value === 'function') {
        return (...args: any[]) => {
          const result = value.apply(target, args)
          return result === target ? receiver : result
        }
      }
      return value
    },
    set(target, key, value, receiver) {
      if (typeof key === 'string' && !isReservedDatasetKey(target, key)) {
        target.set(key, value)
        return true
      }
      return Reflect.set(target, key, value, receiver)
    },
    deleteProperty(target, key) {
      if (
        typeof key === 'string' &&
        !isReservedDatasetKey(target, key) &&
        target.has(key)
      ) {
        return target.delete(key)
      }
      return Reflect.deleteProperty(target, key)
    },
    has(target, key) {
      if (typeof key === 'string' && target.has(key)) {
        return true
      }
      return Reflect.has(target, key)
    },
    ownKeys(target) {
      return Array.from(target.keys()).filter(
        (key) => !isReservedDatasetKey(target, key)
      )
    },
    getOwnPropertyDescriptor(target, key) {
      if (
        typeof key === 'string' &&
        !isReservedDatasetKey(target, key) &&
        target.has(key)
      ) {
        return {
          configurable: true,
          enumerable: true,
          value: target.get(key),
          writable: true,
        }
      }
      return Reflect.getOwnPropertyDescriptor(target, key)
    },
  }) as UniDOMStringMap
}
