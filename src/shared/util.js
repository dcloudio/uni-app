const _toString = Object.prototype.toString
const hasOwnProperty = Object.prototype.hasOwnProperty

const _completeValue = value => {
  return value > 9 ? value : ('0' + value)
}

export function isFn (fn) {
  return typeof fn === 'function'
}

export function isStr (str) {
  return typeof str === 'string'
}

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function noop () {}

export function toRawType (val) {
  return _toString.call(val).slice(8, -1)
}

/**
 * Create a cached version of a pure function.
 */
export function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

export function setProperties (item, props, propsData) {
  props.forEach(function (name) {
    if (hasOwn(propsData, name)) {
      item[name] = propsData[name]
    }
  })
}

export function getLen (str = '') {
  /* eslint-disable no-control-regex */
  return ('' + str).replace(/[^\x00-\xff]/g, '**').length
}

export function formatDateTime ({
  date = new Date(),
  mode = 'date'
}) {
  if (mode === 'time') {
    return _completeValue(date.getHours()) + ':' + _completeValue(date.getMinutes())
  } else {
    return date.getFullYear() + '-' + _completeValue(date.getMonth() + 1) + '-' + _completeValue(date.getDate())
  }
}

export function updateElementStyle (element, styles) {
  for (let attrName in styles) {
    element.style[attrName] = styles[attrName]
  }
}

export function guid () {
  return Math.floor(4294967296 * (1 + Math.random())).toString(16).slice(1)
}
