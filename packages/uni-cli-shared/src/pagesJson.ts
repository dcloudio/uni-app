type Data = Record<string, any>

interface Customizer {
  (a: unknown, b: unknown, k: string): unknown
}

const isArray = Array.isArray

function isPlainObject(a: unknown): a is Data {
  if (a === null) {
    return false
  }
  return typeof a === 'object'
}

function mergeWith(objects: Data[], customizer: Customizer) {
  const [first, ...rest] = objects
  let ret = first
  rest.forEach(a => {
    ret = mergeTo(ret, a, customizer)
  })
  return ret
}

function mergeTo(a: Data, b: Data, customizer: Customizer) {
  const ret: Data = {}
  Object.keys(a)
    .concat(Object.keys(b))
    .forEach(k => {
      const v = customizer(a[k], b[k], k)
      ret[k] = typeof v === 'undefined' ? a[k] : v
    })
  return ret
}

function mergeWithRule(a: Data[], b: Data[], k: string, matchField: string) {
  if (!isArray(a)) {
    return a
  }
  const bMatchItems: Data[] = []
  const ret = a.map(aItem => {
    if (!matchField) {
      return aItem
    }
    // 暂不考虑重复
    const bMatchItem = b.find(bItem => aItem[matchField] === bItem[matchField])
    if (bMatchItem) {
      bMatchItems.push(bMatchItem)
      return mergeWith([aItem, bMatchItem], createCustomizer(k))
    }
    return aItem
  })
  return ret.concat(b.filter(bItem => !bMatchItems.includes(bItem)))
}

function customizeArray(a: any[], b: any[], k: string) {
  if (k === 'pages' || k === 'subPackages.pages') {
    return mergeWithRule(a, b, k, 'path')
  } else if (k === 'subPackages') {
    return mergeWithRule(a, b, k, 'root')
  }
  return b
}

function customizeObject(a: Data, b: Data, k: string) {
  return mergeWith([a, b], createCustomizer(k))
}

function createCustomizer(key?: string): Customizer {
  return function customizer(a: unknown, b: unknown, k: string) {
    const newKey = key ? `${key}.${k}` : k

    if (isArray(a) && isArray(b)) {
      return customizeArray(a, b, newKey)
    }
    if (isPlainObject(a) && isPlainObject(b)) {
      return customizeObject(a, b, newKey)
    }
    return b
  }
}

export default function merge(pagesJsons: any[]) {
  return mergeWith(pagesJsons, createCustomizer())
}
