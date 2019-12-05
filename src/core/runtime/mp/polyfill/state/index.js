import {
  isFn,
  hasOwn,
  isPlainObject
} from 'uni-shared'

import {
  SOURCE_KEY
} from '../../constants'

import {
  proxy
} from './proxy'

import {
  initProperties
} from './properties'

export function initState (vm) {
  const instanceData = JSON.parse(JSON.stringify(vm.$options.mpOptions.data || {}))

  vm[SOURCE_KEY] = instanceData

  const propertyDefinition = {
    get () {
      return vm[SOURCE_KEY]
    },
    set (value) {
      vm[SOURCE_KEY] = value
    }
  }

  Object.defineProperties(vm, {
    data: propertyDefinition,
    properties: propertyDefinition
  })

  vm.setData = (data, callback) => {
    // TODO data path: array[0].text,object.text
    if (!isPlainObject(data)) {
      return
    }
    Object.keys(data).forEach(key => {
      vm.data[key] = data[key]
      if (!hasOwn(vm, key)) {
        proxy(vm, SOURCE_KEY, key)
      }
    })
    vm.$forceUpdate()
    isFn(callback) && vm.$nextTick(callback)
  }

  initProperties(vm, instanceData)

  Object.keys(instanceData).forEach(key => {
    proxy(vm, SOURCE_KEY, key)
  })
}
