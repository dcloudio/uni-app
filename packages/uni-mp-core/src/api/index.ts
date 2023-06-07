import { hasOwn } from '@vue/shared'
// 直接引用具体文件，避免引入其他需要额外配置的信息，比如@dcloudio/uni-platform
import { upx2px } from '@dcloudio/uni-api/src/service/base/upx2px'
import {
  addInterceptor,
  removeInterceptor,
  interceptors,
} from '@dcloudio/uni-api/src/service/base/interceptor'
import {
  $on,
  $off,
  $once,
  $emit,
} from '@dcloudio/uni-api/src/service/base/eventBus'
import {
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback,
} from '@dcloudio/uni-api/src/service/plugin/push'
import { invokeCreateVueAppHook, onCreateVueApp } from '@dcloudio/uni-shared'

import { promisify } from './promise'
import { initWrapper } from './wrapper'

import { MPProtocols, getEventChannel } from './protocols'
import { getLocale, setLocale, onLocaleChange } from './locale'

const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback,
}
export function initUni(
  api: Record<string, any>,
  protocols: MPProtocols,
  platform: any = __GLOBAL__
) {
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
      return promisify(key, wrapper(key, platform[key]))
    },
  }

  // 处理 api mp 打包后为不同js，emitter 无法共享问题
  if (__PLATFORM__ === 'mp-alipay') {
    platform.$emit = $emit
    if (!my.canIUse('getOpenerEventChannel'))
      platform.getEventChannel = getEventChannel
  }
  // 处理 api mp 打包后为不同js，getEventChannel 无法共享问题
  if (__PLATFORM__ !== 'mp-weixin' && __PLATFORM__ !== 'mp-alipay') {
    platform.getEventChannel = getEventChannel
  }

  return new Proxy({}, UniProxyHandlers)
}
