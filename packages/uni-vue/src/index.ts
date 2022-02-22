import { App } from 'vue'

import { isFunction } from '@vue/shared'
import { invokeCreateVueAppHook } from '@dcloudio/uni-shared'

import { applyOptions } from './componentOptions'
import { set } from './componentInstance'
import { errorHandler, initOptionMergeStrategies } from './appConfig'
import { uniIdMixin } from './uni-id-mixin'

export function initApp(app: App) {
  const appConfig = app._context.config
  if (isFunction((app._component as any).onError)) {
    appConfig.errorHandler = errorHandler
  }

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
  }
  if (__PLATFORM__ === 'app' || __PLATFORM__ === 'h5') {
    invokeCreateVueAppHook(app)
  } else {
    ;(uni as any).invokeCreateVueAppHook(app)
  }
}

export { traverse } from './reactivity'
