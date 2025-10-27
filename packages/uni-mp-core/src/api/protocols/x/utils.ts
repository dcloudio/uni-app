import { isPlainObject } from '@vue/shared'
import { UTS } from '@dcloudio/uni-shared'

export function createUTSJSONObjectIfNeed(obj: any) {
  if (!isPlainObject(obj) && !Array.isArray(obj)) {
    return obj
  }
  // TODO globalThis部分平台表现怪异
  return UTS.JSON.parse(JSON.stringify(obj))
}
