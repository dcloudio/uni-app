import { EventChannel } from '@dcloudio/uni-shared'
import {
  createApp,
  createSubpackageApp,
} from '@dcloudio/uni-mp-weixin/src/runtime'

import { initCreateComponent } from './createComponent'
import { initCreatePage } from './createPage'
import parseOptions from './parseOptions'

export const createComponent = initCreateComponent(parseOptions)
const createPage = initCreatePage(parseOptions)

// 重写 Object.getPrototypeOf、Object.prototype.hasOwnProperty 方法
// jd 会从原型链上拿值，导致后追加的属性无法被拿到
const OriginalGetPrototypeOf = Object.getPrototypeOf
Object.getPrototypeOf = function (obj: any) {
  if ('$vm' in obj) {
    return obj
  }

  return OriginalGetPrototypeOf.call(this, obj)
}
const OriginalHasOwnProperty = Object.prototype.hasOwnProperty
Object.prototype.hasOwnProperty = function (
  key: Parameters<typeof OriginalHasOwnProperty>[0]
) {
  if ('$vm' in this && key in this) {
    return true
  }
  return OriginalHasOwnProperty.call(this, key)
}
;(jd as any).EventChannel = EventChannel
;(jd as any).createApp = (global as any).createApp = createApp
;(jd as any).createPage = createPage
;(jd as any).createComponent = createComponent
;(jd as any).createSubpackageApp = (global as any).createSubpackageApp =
  createSubpackageApp
