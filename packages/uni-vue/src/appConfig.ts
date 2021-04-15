import { invokeHook } from '@dcloudio/uni-core'
import { ComponentPublicInstance } from 'vue'

export function errorHandler(
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) {
  if (!instance) {
    throw err
  }
  const app = getApp()
  if (!app || !app.$vm) {
    throw err
  }
  if (__PLATFORM__ !== 'h5' && __PLATFORM__ !== 'app') {
    app.$vm.$callHook('onError', err, info)
  } else {
    invokeHook(app.$vm, 'onError', err)
  }
}
