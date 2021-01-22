import { isFunction } from '@vue/shared'

interface PROVIDERS {
  oauth: string[]
  share: string[]
  payment: string[]
  push: string[]
}

export function initGetProvider(providers: PROVIDERS) {
  return function getProvider({
    service,
    success,
    fail,
    complete,
  }: UniApp.GetProviderOptions) {
    let res
    if (providers[service]) {
      res = {
        errMsg: 'getProvider:ok',
        service,
        provider: providers[service],
      } as UniApp.GetProviderRes
      isFunction(success) && success(res)
    } else {
      res = {
        errMsg: 'getProvider:fail:服务[' + service + ']不存在',
      }
      isFunction(fail) && fail(res)
    }
    isFunction(complete) && complete(res)
  }
}
