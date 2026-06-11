export type UniDOMStringMapSource =
  | Record<string, any>
  | Map<string, any>
  | UniDOMStringMap

export class UniDOMStringMap extends Map<string, any> {
  [key: string]: any

  get(key: string) {
    return super.get(normalizeDatasetKey(String(key)))
  }

  set(key: string, value: any) {
    super.set(normalizeDatasetKey(String(key)), value)
    return this
  }

  has(key: string) {
    return super.has(normalizeDatasetKey(String(key)))
  }

  delete(key: string) {
    return super.delete(normalizeDatasetKey(String(key)))
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

function isReservedDatasetKey(target: UniDOMStringMap, key: string) {
  return key in target
}

function setDatasetValue(dataset: UniDOMStringMap, key: string, value: any) {
  dataset.set(key, value)
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
  source?: UniDOMStringMapSource
): UniDOMStringMap {
  const target = new UniDOMStringMap()
  initDataset(target, source)

  return new Proxy(target, {
    get(target, key, receiver) {
      if (typeof key === 'string') {
        if (!isReservedDatasetKey(target, key) && target.has(key)) {
          return target.get(key)
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
