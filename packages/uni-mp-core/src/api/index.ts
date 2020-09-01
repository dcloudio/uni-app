import { hasOwn } from '@vue/shared'

import {
  upx2px,
  addInterceptor,
  removeInterceptor,
  promisify
} from '@dcloudio/uni-api'

import { initWrapper } from './wrapper'
import { MPProtocols } from './protocols'

const baseApis = { upx2px, addInterceptor, removeInterceptor }

export function initUni(api: Record<string, any>, protocols: MPProtocols) {
  const wrapper = initWrapper(protocols)
  const UniProxyHandlers: ProxyHandler<any> = {
    get(target: object, key: string) {
      if (hasOwn(target, key)) {
        return target[key]
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key])
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key])
      }
      // event-api
      // provider-api?
      return promisify(key, wrapper(key, __GLOBAL__[key]))
    }
  }
  return new Proxy({}, UniProxyHandlers)
}
