import { ComponentPublicInstance } from '@vue/runtime-core'

export function errorHandler(
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) {
  if (!instance) {
    throw err
  }
  const appInstance = (instance.$.appContext as any).$appInstance
  if (!appInstance) {
    throw err
  }
  appInstance.$callHook('onError', err, info)
}
