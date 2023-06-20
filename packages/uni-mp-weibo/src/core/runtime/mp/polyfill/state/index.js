import {
  SOURCE_KEY
} from '../../constants'

import {
  proxy
} from './proxy'

import {
  setData
} from './data'

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

  vm.setData = setData

  initProperties(vm, instanceData)

  Object.keys(instanceData).forEach(key => {
    proxy(vm, SOURCE_KEY, key)
  })
}
