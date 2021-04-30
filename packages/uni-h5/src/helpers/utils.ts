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

interface Options {
  success?: (res: any) => void
  fail?: (res: any) => void
  complete?: (res: any) => void
}
export function callback(options: Options, errMsg: string): void
export function callback(
  options: Options,
  data: { [key: string]: any; errMsg: string }
): void
export function callback(
  options: Options,
  data: { [key: string]: any; errMsg: string } | string
): void {
  options = options || {}
  if (typeof data === 'string') {
    data = {
      errMsg: data,
    }
  }
  if (/:ok$/.test(data.errMsg)) {
    if (typeof options.success === 'function') {
      options.success(data)
    }
  } else {
    if (typeof options.fail === 'function') {
      options.fail(data)
    }
  }
  if (typeof options.complete === 'function') {
    options.complete(data)
  }
}
