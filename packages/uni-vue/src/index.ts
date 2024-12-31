import type { App } from 'vue'

import {
  invokeCreateErrorHandler,
  invokeCreateVueAppHook,
} from '@dcloudio/uni-shared'

import { applyOptions } from './componentOptions'
import { $callMethod, set } from './componentInstance'
import { createErrorHandler, initOptionMergeStrategies } from './appConfig'
import { uniIdMixin } from './uni-id-mixin'

export function initApp(app: App) {
  const appConfig = app.config

  // 该逻辑全平台会调用
  // - 需要兼容支持开发者自定义的 errorHandler
  // - nvue、vue 需要使用同一个（once） errorHandler
  // - 需要支持 uni.onError 注册监听
  //   * 目前仅部分小程序平台支持，调用uni.onError时，如果app已存在，则添加到instance的hooks中，如果不存在，则临时存储，初始化instance时添加到hooks中
  //   * 目前在 errorHandler 中，会调用 app.$callHook(ON_ERROR, err)，所以上一步需要将 uni.onError 存储到 app 的 hooks 中
  // - 部分平台（目前主要是小程序）开发阶段 uni-console 会调用 uni.onError 注册监听
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
