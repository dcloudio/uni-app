import {
  hasOwn,
  isPlainObject
} from 'uni-shared'

import {
  deepClone
} from './deep-clone'

const PROP_DEFAULT_VALUES = {
  [String]: '',
  [Number]: 0,
  [Boolean]: false,
  [Object]: null,
  [Array]: [],
  [null]: null
}

function getDefaultVal (propType) {
  return PROP_DEFAULT_VALUES[propType]
}

function getPropertyVal (options) {
  if (isPlainObject(options)) {
    if (hasOwn(options, 'value')) {
      return options.value
    }
    return getDefaultVal(options.type)
  }
  return getDefaultVal(options)
}

function getType (propOptions) {
  return isPlainObject(propOptions) ? propOptions.type : propOptions
}

function validateProp (key, propsOptions, propsData, vm) {
  let value = propsData[key]
  if (value !== undefined) {
    const propOptions = propsOptions[key]
    const type = getType(propOptions)
    value = formatVal(value, type)
    const observer = propOptions && propOptions.observer
    if (observer) {
      // 初始化时,异步触发 observer,否则 observer 中无法访问 methods 或其他
      setTimeout(function () {
        observe(observer, vm, value)
      }, 4)
    }
    return value
  }
  return getPropertyVal(propsOptions[key])
}

function formatVal (val, type) {
  if (type === Boolean) {
    return !!val
  } else if (type === String) {
    return String(val)
  }
  return val
}

function observe (observer, vm, newVal, oldVal) {
  try {
    if (typeof observer === 'function') {
      observer.call(vm, newVal, oldVal)
    } else if (typeof observer === 'string' &&
      typeof vm[observer] === 'function'
    ) {
      vm[observer](newVal, oldVal)
    }
  } catch (err) {
    console.error(`execute observer ${observer} callback fail! err: ${err}`)
  }
}

export function initProperties (vm, instanceData) {
  const properties = vm.$options.mpOptions.properties
  if (!properties) {
    return
  }

  const propsData = deepClone(vm.$options.propsData) || {}

  for (const key in properties) {
    const observer = isPlainObject(properties[key]) ? properties[key].observer : false
    let value = validateProp(key, properties, propsData, vm)
    Object.defineProperty(instanceData, key, {
      enumerable: true,
      configurable: true,
      get () {
        return value
      },
      set (newVal) {
        const oldVal = value
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        // TODO 临时方案,clone array
        value = Array.isArray(newVal) ? newVal.slice(0) : newVal
        if (observer) {
          observe(observer, vm, newVal, oldVal)
        }
        // 触发渲染
        vm.$forceUpdate()
      }
    })
  }
}

export function updateProperties (vm) {
  const properties = vm.$options.mpOptions && vm.$options.mpOptions.properties
  const propsData = vm.$options.propsData
  if (propsData && properties) {
    Object.keys(properties).forEach(key => {
      if (hasOwn(propsData, key)) {
        vm[key] = formatVal(propsData[key], getType(properties[key]))
      }
    })
  }
}
