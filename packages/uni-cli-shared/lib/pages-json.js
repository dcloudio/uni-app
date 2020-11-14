'use strict'
Object.defineProperty(exports, '__esModule', {
  value: true
})
const isArray = Array.isArray

function isPlainObject (a) {
  if (a === null) {
    return false
  }
  return typeof a === 'object'
}

function mergeWith (objects, customizer) {
  const [first, ...rest] = objects
  let ret = first
  rest.forEach(a => {
    ret = mergeTo(ret, a, customizer)
  })
  return ret
}

function mergeTo (a, b, customizer) {
  const ret = {}
  Object.keys(a)
    .concat(Object.keys(b))
    .forEach(k => {
      const v = customizer(a[k], b[k], k)
      ret[k] = typeof v === 'undefined' ? a[k] : v
    })
  return ret
}

function mergeWithRule (a, b, k, matchField) {
  if (!isArray(a)) {
    return a
  }
  const bMatchItems = []
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

function customizeArray (a, b, k) {
  if (k === 'pages' || k === 'subPackages.pages') {
    return mergeWithRule(a, b, k, 'path')
  } else if (k === 'subPackages') {
    return mergeWithRule(a, b, k, 'root')
  }
  return b
}

function customizeObject (a, b, k) {
  return mergeWith([a, b], createCustomizer(k))
}

function createCustomizer (key) {
  return function customizer (a, b, k) {
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

function merge (pagesJsons) {
  return mergeWith(pagesJsons, createCustomizer())
}
exports.default = merge
