import {
  updateProperties
} from './state/properties'

export function initMethods (vm) {
  const oldEmit = vm.$emit
  vm.triggerEvent = (eventName, detail, options) => {
    const target = {
      dataset: vm.$el.dataset
    }
    oldEmit.call(vm, eventName, {
      target,
      currentTarget: target,
      detail
    })
  }
  // 主要是Vant 自己封装了 $emit,放到 methods 中会触发 Vue 的警告,索性,框架直接重写该方法
  vm.$emit = (...args) => {
    vm.triggerEvent(...args)
  }
  vm.getRelationNodes = (relationKey) => {
    /* eslint-disable  no-mixed-operators */
    return vm._$relationNodes && vm._$relationNodes[relationKey] || []
  }

  vm._$updateProperties = updateProperties
}
