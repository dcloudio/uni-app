import { ComponentPublicInstance } from 'vue'
import { invokeArrayFns } from '@dcloudio/uni-shared'

export function set(target: any, key: string | number, val: unknown) {
  return (target[key] = val)
}

export function hasHook(this: ComponentPublicInstance, name: string) {
  const hooks = (this.$ as any)[name]
  if (hooks && hooks.length) {
    return true
  }
  return false
}

export function callHook(
  this: ComponentPublicInstance,
  name: string,
  args?: unknown
) {
  const hooks = (this.$ as any)[name]
  return hooks && invokeArrayFns(hooks, args)
}
