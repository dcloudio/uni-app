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
