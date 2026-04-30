import * as protocols from './protocols'
import { hasOwn, isFunction, isObject } from '@vue/shared'

export function parseXReturnValue(methodName: string, res: any) {
  if (isObject(res) && hasOwn(res, 'errno')) {
    res.errCode = res.errno
  }
  const protocol = protocols[methodName]
  if (protocol && isFunction(protocol.returnValue)) {
    return protocol.returnValue(res)
  }
  return res
}

export function shouldParseXReturnValue(methodName: string) {
  return !!protocols[methodName]
}

export function shouldKeepReturnValue(methodName: string) {
  return methodName === 'getStorage' || methodName === 'getStorageSync'
}
