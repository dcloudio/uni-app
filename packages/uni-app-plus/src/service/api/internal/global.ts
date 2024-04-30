import {
  newSetStatusBarStyle,
  restoreOldSetStatusBarStyle,
} from '../../statusBar'
import { extend } from '@vue/shared'

export function restoreGlobal(
  newVue: unknown,
  newWeex: unknown,
  newPlus: unknown,
  newSetTimeout: unknown,
  newClearTimeout: unknown,
  newSetInterval: unknown,
  newClearInterval: unknown
) {
  // 确保部分全局变量 是 app-service 中的
  // 若首页 nvue 初始化比 app-service 快，导致框架处于该 nvue 环境下
  // plus 如果不用 app-service，资源路径会出问题
  // 若首页 nvue 被销毁，如 redirectTo 或 reLaunch，则这些全局功能会损坏

  if (plus !== newPlus) {
    if (__DEV__) {
      console.log(`[restoreGlobal][${Date.now()}]`)
    }
    // __VUE__ 在 uni-jsframework-next 编译时会被替换为 vue
    Vue = __VUE__ = newVue
    weex = newWeex
    // @ts-expect-error
    plus = newPlus
    restoreOldSetStatusBarStyle(plus.navigator.setStatusBarStyle)
    plus.navigator.setStatusBarStyle = newSetStatusBarStyle
    /* eslint-disable no-global-assign */
    // @ts-expect-error
    setTimeout = newSetTimeout
    // @ts-expect-error
    clearTimeout = newClearTimeout
    // @ts-expect-error
    setInterval = newSetInterval
    // @ts-expect-error
    clearInterval = newClearInterval
  }
  __uniConfig.serviceReady = true
}

export function requireGlobal() {
  const list = [
    'ArrayBuffer',
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array',
  ]
  const object: Record<string, any> = {}
  for (let i = 0; i < list.length; i++) {
    const key = list[i]
    object[key] = (global as any)[key]
  }
  return object
}

export function syncDataToGlobal(data: AnyObject) {
  extend(global, data)
}
