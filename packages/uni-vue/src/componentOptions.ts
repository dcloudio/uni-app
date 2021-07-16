import { invokeHook } from '@dcloudio/uni-core'
import { isFunction } from '@vue/shared'

import {
  ComponentOptions,
  ComponentInternalInstance,
  ComponentPublicInstance,
} from 'vue'
// @ts-ignore
import { injectHook } from 'vue'

export function applyOptions(
  options: ComponentOptions,
  instance: ComponentInternalInstance,
  publicThis: ComponentPublicInstance
) {
  if (!publicThis.$mpType) {
    // 仅 App,Page 类型支持 on 生命周期
    return
  }
  Object.keys(options).forEach((name) => {
    if (name.indexOf('on') === 0) {
      const hook = options[name]
      if (isFunction(hook)) {
        injectHook(name as any, hook.bind(publicThis), instance)
      }
    }
  })
  if (__PLATFORM__ === 'app' && publicThis.$mpType === 'page') {
    invokeHook(publicThis, 'onLoad', instance.attrs.__pageQuery)
    invokeHook(publicThis, 'onShow')
  }
}
