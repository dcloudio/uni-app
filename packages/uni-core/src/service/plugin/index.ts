import { App, ComponentPublicInstance } from 'vue'

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

export function invokeHook<T>(name: string, args?: T) {
  const vm = getCurrentPageVm()
  return vm && vm.$callHook(name, args)
}
