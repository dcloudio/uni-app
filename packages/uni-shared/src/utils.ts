import { isFunction, isPlainObject, isString } from '@vue/shared'

export function cache<T>(fn: (str: string) => T) {
  const cache: Record<string, T> = Object.create(null)
  return (str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

export function cacheStringFunction(fn: (string: string) => string) {
  return cache<string>(fn)
}

export function getLen(str = '') {
  return ('' + str).replace(/[^\x00-\xff]/g, '**').length
}

function hasLeadingSlash(str: string) {
  return str.indexOf('/') === 0
}

export function addLeadingSlash(str: string) {
  return hasLeadingSlash(str) ? str : '/' + str
}

export function removeLeadingSlash(str: string) {
  return hasLeadingSlash(str) ? str.slice(1) : str
}

export const invokeArrayFns = (fns: Function[], arg?: any) => {
  let ret
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg)
  }
  return ret
}

export function updateElementStyle(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) {
  for (const attrName in styles) {
    element.style[attrName] = styles[attrName]!
  }
}

export function once<T extends (...args: any[]) => any>(
  fn: T,
  ctx: unknown = null
): T {
  let res: any
  return ((...args: any[]) => {
    if (fn) {
      res = fn.apply(ctx, args)
      fn = null as any
    }
    return res
  }) as T
}

export const sanitise = (val: unknown) =>
  (val && JSON.parse(JSON.stringify(val))) || val

const _completeValue = (value: number) => (value > 9 ? value : '0' + value)

export function formatDateTime({ date = new Date(), mode = 'date' }) {
  if (mode === 'time') {
    return (
      _completeValue(date.getHours()) + ':' + _completeValue(date.getMinutes())
    )
  } else {
    return (
      date.getFullYear() +
      '-' +
      _completeValue(date.getMonth() + 1) +
      '-' +
      _completeValue(date.getDate())
    )
  }
}

interface Options {
  success?: (res: any) => void
  fail?: (res: any) => void
  complete?: (res: any) => void
}
export function callOptions(options: Options, errMsg: string): void
export function callOptions(
  options: Options,
  data: { [key: string]: any; errMsg: string }
): void
export function callOptions(
  options: Options,
  data: { [key: string]: any; errMsg: string } | string
): void {
  options = options || {}
  if (isString(data)) {
    data = {
      errMsg: data,
    }
  }
  if (/:ok$/.test(data.errMsg)) {
    if (isFunction(options.success)) {
      options.success(data)
    }
  } else {
    if (isFunction(options.fail)) {
      options.fail(data)
    }
  }
  if (isFunction(options.complete)) {
    options.complete(data)
  }
}

export function getValueByDataPath(obj: any, path: string): unknown {
  if (!isString(path)) {
    return
  }
  path = path.replace(/\[(\d+)\]/g, '.$1')
  const parts = path.split('.')
  let key: number | string = parts[0]
  if (!obj) {
    obj = {}
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getValueByDataPath(obj[key], parts.slice(1).join('.'))
}

export function sortObject<T extends Object>(obj: T) {
  let sortObj: T = {} as T
  if (isPlainObject(obj)) {
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        const _key = key as keyof T
        sortObj[_key] = obj[_key]
      })
  }
  return !Object.keys(sortObj) ? obj : sortObj
}

function getGlobalOnce() {
  if (typeof globalThis !== 'undefined') {
    return globalThis
  }
  // worker
  if (typeof self !== 'undefined') {
    return self
  }
  // browser
  if (typeof window !== 'undefined') {
    return window
  }
  // nodejs
  // if (typeof global !== 'undefined') {
  //   return global
  // }

  function g(this: any) {
    return this
  }

  if (typeof g() !== 'undefined') {
    return g()
  }

  return (function () {
    return new Function('return this')()
  })()
}

let g: any = undefined
export function getGlobal() {
  if (g) {
    return g
  }
  g = getGlobalOnce()
  return g
}
