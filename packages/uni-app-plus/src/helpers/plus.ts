import { extend } from '@vue/shared'
interface PlusResult extends Record<string, any> {
  code?: number
  message?: string
}

type PlusError = PlusResult

export function warpPlusSuccessCallback(
  resolve: (res: any) => void,
  after?: (res: any) => any
) {
  return function successCallback(data: PlusResult) {
    delete data.code
    delete data.message
    if (typeof after === 'function') {
      data = after(data)
    }
    resolve(data)
  }
}

export function warpPlusErrorCallback(
  reject: (errMsg: string, errRes?: any) => void,
  errMsg?: string
) {
  return function errorCallback(error?: PlusError) {
    error = error || {}
    // 一键登录errorCallback新增 appid、metadata、uid 参数返回
    errMsg = error.message || errMsg || ''
    delete error.message
    reject(errMsg, extend({ code: 0 }, error))
  }
}
