import {
  hasOwn,
  isPlainObject
} from 'uni-shared'

const PROP_DEFAULT_VALUES = {
  String: '',
  Number: 0,
  Boolean: false,
  Object: null,
  Array: [],
  null: null
}

const PROP_DEFAULT_KEYS = Object.keys(PROP_DEFAULT_VALUES)

function getDefaultVal (type) {
  return PROP_DEFAULT_KEYS
    .filter(type => new RegExp(type).test(type + ''))
    .map(type => PROP_DEFAULT_VALUES[type])[0]
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
    if (type === Boolean) {
      value = !!value
    }
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
  const propsData = vm.$options.propsData || {}

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
        value = newVal
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
        const type = getType(properties[key])
        if (type === Boolean) {
          vm[key] = !!propsData[key]
        } else {
          vm[key] = propsData[key]
        }
      }
    })
  }
}
