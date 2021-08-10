import { ComponentInternalInstance } from 'vue'
import { hyphenate } from '@vue/shared'

import { isBuiltInComponent } from './tags'

export function resolveOwnerVm(vm: ComponentInternalInstance) {
  if (!vm) {
    return
  }
  let componentName = vm.type.name
  while (componentName && isBuiltInComponent(hyphenate(componentName))) {
    // ownerInstance 内置组件需要使用父 vm
    vm = vm.parent!
    componentName = vm.type.name
  }
  return vm.proxy!
}
