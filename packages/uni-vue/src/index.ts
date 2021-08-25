import { App } from 'vue'

import { isFunction } from '@vue/shared'

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
  uniIdMixin(globalProperties)
  if (__VUE_OPTIONS_API__) {
    globalProperties.$set = set
    globalProperties.$applyOptions = applyOptions
  }
}

export { traverse } from './reactivity'
