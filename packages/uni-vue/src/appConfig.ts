import { invokeHook } from '@dcloudio/uni-core'
import { ON_ERROR } from '@dcloudio/uni-shared'
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
    app.$vm.$callHook(ON_ERROR, err, info)
  } else {
    invokeHook(app.$vm, ON_ERROR, err)
  }
}
