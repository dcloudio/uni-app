import type { App, AppConfig, ComponentPublicInstance } from 'vue'
import { invokeHook } from '@dcloudio/uni-core'
import { ON_ERROR, UniLifecycleHooks } from '@dcloudio/uni-shared'
import { logError } from 'vue'

export function createErrorHandler(app: App) {
  const userErrorHandler = app.config.errorHandler
  return function errorHandler(
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) {
    if (userErrorHandler) {
      userErrorHandler(err, instance, info)
    }
    const appInstance = app._instance
    if (!appInstance || !appInstance.proxy) {
      throw err
    }
    if (appInstance[ON_ERROR]) {
      if (__PLATFORM__ !== 'h5' && __PLATFORM__ !== 'app') {
        appInstance.proxy.$callHook(ON_ERROR, err)
      } else {
        invokeHook(appInstance.proxy, ON_ERROR, err)
      }
    } else {
      logError(err, info, instance ? instance.$.vnode : null, false)
    }
  }
}

function mergeAsArray<T = Function>(to: T[] | T | undefined, from: T | T[]) {
  return to ? [...new Set([].concat(to as any, from as any))] : from
}

export function initOptionMergeStrategies(
  optionMergeStrategies: AppConfig['optionMergeStrategies']
) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray
  })
}
