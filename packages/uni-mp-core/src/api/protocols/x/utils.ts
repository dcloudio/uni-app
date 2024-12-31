import { isPlainObject } from '@vue/shared'
export function createUTSJSONObjectIfNeed(obj: any) {
  if (!isPlainObject(obj) && !Array.isArray(obj)) {
    return obj
  }
  // TODO globalThis部分平台表现怪异
  return globalThis.UTS.JSON.parse(JSON.stringify(obj))
}
