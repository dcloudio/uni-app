import { ComponentPublicInstance } from 'vue'

const WINDOW_NAMES = ['VUniLeftWindow', 'VUniTopWindow', 'VUniRightWindow']

export function isInWindows(vm: ComponentPublicInstance) {
  while (vm) {
    const name = vm.$options.name
    if (name && WINDOW_NAMES.indexOf(name) !== -1) {
      return true
    }
    vm = vm.$parent!
  }
  return false
}

export function getType(val: any): string {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

export function isPlainObject(val: any): boolean {
  if (val == null || typeof val !== 'object') {
    return false
  }
  const proto = Object.getPrototypeOf(val)
  return proto === Object.prototype || proto === null
}
