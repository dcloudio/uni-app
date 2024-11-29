import type { ComponentPublicInstance } from 'vue'
import { isArray, isString, remove } from '@vue/shared'
import { invokeArrayFns } from '@dcloudio/uni-shared'
import { getCurrentPageVm } from './page'
import { get$pageByPage } from './util'

export function removeHook(
  vm: ComponentPublicInstance,
  name: string,
  hook: Function & { __weh?: Function }
) {
  const hooks = (vm.$ as unknown as { [name: string]: Function[] })[
    name as string
  ]
  if (!isArray(hooks)) {
    return
  }
  if (hook.__weh) {
    remove(hooks, hook.__weh)
  }
}

export function invokeHook(name: string, args?: unknown): unknown
export function invokeHook(id: number, name: string, args?: unknown): unknown
export function invokeHook(
  vm: ComponentPublicInstance,
  name: string,
  args?: unknown
): unknown
export function invokeHook(
  vm: ComponentPublicInstance | string | number,
  name?: string | unknown,
  args?: unknown
) {
  if (isString(vm)) {
    args = name
    name = vm
    vm = getCurrentPageVm()!
  } else if (typeof vm === 'number') {
    const page = getCurrentPages().find(
      (page) => get$pageByPage(page).id === vm
    )
    if (page) {
      vm = (page as any).$vm as ComponentPublicInstance
    } else {
      vm = getCurrentPageVm() as ComponentPublicInstance
    }
  }
  if (!vm) {
    return
  }
  // 兼容 nvue
  if (__PLATFORM__ === 'app') {
    if ((vm as any).__call_hook) {
      return (vm as any).__call_hook(name, args)
    }
  }
  const hooks = (vm.$ as unknown as { [name: string]: Function[] })[
    name as string
  ]
  return hooks && invokeArrayFns(hooks, args)
}

export function hasHook(vm: ComponentPublicInstance | number, name: string) {
  if (typeof vm === 'number') {
    const page = getCurrentPages().find(
      (page) => get$pageByPage(page).id === vm
    )
    if (page) {
      vm = (page as any).$vm as ComponentPublicInstance
    } else {
      vm = getCurrentPageVm() as ComponentPublicInstance
    }
  }
  if (!vm) {
    return false
  }
  const hooks = (vm.$ as unknown as { [name: string]: Function[] })[
    name as string
  ]
  return !!(hooks && hooks.length)
}
