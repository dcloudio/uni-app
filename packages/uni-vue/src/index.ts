import { App } from 'vue'

import {
  invokeCreateVueAppHook,
  invokeCreateErrorHandler,
} from '@dcloudio/uni-shared'

import { applyOptions } from './componentOptions'
import { $callMethod, set } from './componentInstance'
import { createErrorHandler, initOptionMergeStrategies } from './appConfig'
import { uniIdMixin } from './uni-id-mixin'

export function initApp(app: App) {
  const appConfig = app._context.config

  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler)
  initOptionMergeStrategies(appConfig.optionMergeStrategies)

  const globalProperties = appConfig.globalProperties
  if (__PLATFORM__ === 'h5') {
    if (__UNI_FEATURE_UNI_CLOUD__) {
      uniIdMixin(globalProperties)
    }
  } else {
    uniIdMixin(globalProperties)
  }
  if (__VUE_OPTIONS_API__) {
    globalProperties.$set = set
    globalProperties.$applyOptions = applyOptions
    globalProperties.$callMethod = $callMethod
  }
  if (__PLATFORM__ === 'app' || __PLATFORM__ === 'h5') {
    invokeCreateVueAppHook(app)
  } else {
    ;(uni as any).invokeCreateVueAppHook(app)
  }
}

export { traverse } from './reactivity'
