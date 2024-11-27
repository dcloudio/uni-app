import * as protocols from './protocols'
import { isFunction } from '@vue/shared'
export function parseXReturnValue(methodName: string, res: any) {
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
