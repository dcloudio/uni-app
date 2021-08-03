import { callWithErrorHandling, ComponentPublicInstance } from 'vue'
import { isString } from '@vue/shared'
import { getCurrentPageVm } from './page'

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
    const page = getCurrentPages().find((page) => page.$page.id === vm)
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
  const hooks = vm.$[name as string]
  if (!hooks) {
    return
  }
  let ret
  for (let i = 0; i < hooks.length; i++) {
    ret = callWithErrorHandling(hooks[i], vm.$, name as any, [args])
  }
  return ret
}

export function hasHook(vm: ComponentPublicInstance | number, name: string) {
  if (typeof vm === 'number') {
    const page = getCurrentPages().find((page) => page.$page.id === vm)
    if (page) {
      vm = (page as any).$vm as ComponentPublicInstance
    } else {
      vm = getCurrentPageVm() as ComponentPublicInstance
    }
  }
  if (!vm) {
    return false
  }
  const hooks = vm.$[name]
  return !!(hooks && hooks.length)
}
