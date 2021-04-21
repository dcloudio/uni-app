import { isString } from '@vue/shared'
import { ComponentPublicInstance } from 'vue'
import { invokeArrayFns } from '@dcloudio/uni-shared'

export function getCurrentPage() {
  const pages = getCurrentPages()
  const len = pages.length
  if (len) {
    return pages[len - 1]
  }
}

export function getCurrentPageMeta() {
  const page = getCurrentPage()
  if (page) {
    return page.$page.meta
  }
}

export function getCurrentPageId() {
  const meta = getCurrentPageMeta()
  if (meta) {
    return meta.id
  }
  return -1
}

export function getCurrentPageVm() {
  const page = getCurrentPage()
  if (page) {
    return (page as any).$vm as ComponentPublicInstance
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
  const hooks = vm.$[name as string]
  return hooks && invokeArrayFns(hooks, args)
}
