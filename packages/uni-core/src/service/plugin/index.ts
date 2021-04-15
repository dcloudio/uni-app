import { App, ComponentPublicInstance } from 'vue'
import { isString } from '@vue/shared'
import { invokeArrayFns } from '@dcloudio/uni-shared'
import { initAppConfig } from './appConfig'

export function initService(app: App) {
  initAppConfig(app._context.config)
}

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

export function getCurrentPageVm() {
  const page = getCurrentPage()
  if (page) {
    return (page as any).$vm as ComponentPublicInstance
  }
}

export function invokeHook(name: string, args?: unknown): unknown
export function invokeHook(
  vm: ComponentPublicInstance,
  name: string,
  args?: unknown
): unknown
export function invokeHook(
  vm: ComponentPublicInstance | string,
  name?: string | unknown,
  args?: unknown
) {
  if (isString(vm)) {
    args = name
    name = vm
    vm = getCurrentPageVm()!
  }
  if (!vm) {
    return
  }
  const hooks = vm.$[name as string]
  return hooks && invokeArrayFns(hooks, args)
}
