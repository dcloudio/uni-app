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

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
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

/**
 * Capitalize a string.
 */
export const capitalize = cached((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
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
  for (const attrName in styles) {
    element.style[attrName] = styles[attrName]
  }
}

export function guid () {
  return Math.floor(4294967296 * (1 + Math.random())).toString(16).slice(1)
}

export function debounce (fn, delay) {
  let timeout
  const newFn = function () {
    clearTimeout(timeout)
    const timerFn = () => fn.apply(this, arguments)
    timeout = setTimeout(timerFn, delay)
  }
  newFn.cancel = function () {
    clearTimeout(timeout)
  }
  return newFn
}

export function throttle (fn, wait) {
  let last = 0
  let timeout
  let waitCallback
  const newFn = function (...arg) {
    const now = Date.now()
    clearTimeout(timeout)
    waitCallback = () => {
      waitCallback = null
      last = now
      fn.apply(this, arg)
    }
    if (now - last < wait) {
      timeout = setTimeout(waitCallback, wait - (now - last))
      return
    }
    waitCallback()
  }
  newFn.cancel = function () {
    clearTimeout(timeout)
    waitCallback = null
  }
  newFn.flush = function () {
    clearTimeout(timeout)
    waitCallback && waitCallback()
  }
  return newFn
}

export function kebabCase (string) {
  return string.replace(/[A-Z]/g, str => '-' + str.toLowerCase())
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual (a, b) {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

export function deepClone (vnodes, createElement) {
  function cloneVNode (vnode) {
    var clonedChildren = vnode.children && vnode.children.map(cloneVNode)
    var cloned = createElement(vnode.tag, vnode.data, clonedChildren)
    cloned.text = vnode.text
    cloned.isComment = vnode.isComment
    cloned.componentOptions = vnode.componentOptions
    cloned.elm = vnode.elm
    cloned.context = vnode.context
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    return cloned
  }

  return vnodes.map(cloneVNode)
}

export * from './uni-id-mixin'
