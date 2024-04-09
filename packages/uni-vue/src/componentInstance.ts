import type { ComponentPublicInstance } from 'vue'

export function set(target: any, key: string | number, val: unknown) {
  return (target[key] = val)
}
export function $callMethod(
  this: ComponentPublicInstance,
  method: string,
  ...args: Array<any>
): any {
  const fn = (this as any)[method]
  if (fn) {
    return fn(...args)
  }
  console.error(`method ${method} not found`)
  return null
}
