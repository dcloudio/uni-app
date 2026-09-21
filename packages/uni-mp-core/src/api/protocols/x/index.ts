import { hasOwn, isObject } from '@vue/shared'

export function parseXReturnValue(methodName: string, res: any) {
  if (isObject(res) && hasOwn(res, 'errno')) {
    res.errCode = res.errno
  }
  return res
}

export function forceReturnValueResult(methodName: string) {
  return methodName === 'getStorage' || methodName === 'getStorageSync'
}

export { createUTSJSONObjectIfNeed } from './utils'
