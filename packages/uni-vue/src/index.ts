import { App } from '@vue/runtime-core'

import { isFunction } from '@vue/shared'

import { applyOptions } from './componentOptions'
import { set, hasHook, callHook } from './componentInstance'
import { errorHandler } from './appConfig'

export function initApp(app: App) {
  const appConfig = app._context.config
  if (isFunction((app._component as any).onError)) {
    appConfig.errorHandler = errorHandler
  }
  const globalProperties = appConfig.globalProperties
  globalProperties.$hasHook = hasHook
  globalProperties.$callHook = callHook
  if (__VUE_OPTIONS_API__) {
    globalProperties.$set = set
    globalProperties.$applyOptions = applyOptions
  }
}
