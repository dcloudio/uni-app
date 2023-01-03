import { hasOwn, isFunction } from '@vue/shared'

const objectKeys = [
  'env',
  'error',
  'version',
  'lanDebug',
  'cloud',
  'serviceMarket',
  'router',
  'worklet',
]

export function initWx() {
  const WxProxyHandlers: ProxyHandler<any> = {
    get(target: object, key: string) {
      if (hasOwn(target, key)) {
        return target[key]
      }
      if (objectKeys.indexOf(key) > -1 || isFunction(__GLOBAL__[key])) {
        return __GLOBAL__[key]
      }
    },
  }
  return new Proxy({}, WxProxyHandlers)
}
