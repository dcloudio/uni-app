export const cacheStringFunction = <T extends (str: string) => string>(
  fn: T
): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as any
}

export function getLen(str = '') {
  return ('' + str).replace(/[^\x00-\xff]/g, '**').length
}

export function removeLeadingSlash(str: string) {
  return str.indexOf('/') === 0 ? str.substr(1) : str
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
