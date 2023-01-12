import { isObject } from '@vue/shared'
import { JSON_PROTOCOL } from '@dcloudio/uni-shared'

export function wxsProp(prop: unknown) {
  if (isObject(prop)) {
    return JSON_PROTOCOL + JSON.stringify(prop)
  }
  return prop
}
