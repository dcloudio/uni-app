import { hasOwn } from '@vue/shared'
// 直接引用具体文件，避免引入其他需要额外配置的信息，比如@dcloudio/uni-platform
import { upx2px } from '@dcloudio/uni-api/src/service/base/upx2px'
import {
  addInterceptor,
  removeInterceptor,
} from '@dcloudio/uni-api/src/service/base/interceptor'
import {
  $on,
  $off,
  $once,
  $emit,
} from '@dcloudio/uni-api/src/service/base/eventBus'
import { promisify } from './promise'
import { initWrapper } from './wrapper'

import { MPProtocols } from './protocols'
import { onAppLaunch } from './hook'

const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  addInterceptor,
  removeInterceptor,
  onAppLaunch,
}

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
    },
  }
  return new Proxy({}, UniProxyHandlers)
}
