import { invokeHook } from '@dcloudio/uni-core'
import { LINEFEED, ON_LOAD, ON_SHOW } from '@dcloudio/uni-shared'
import { isArray, isFunction } from '@vue/shared'

import {
  nextTick,
  ComponentOptions,
  ComponentInternalInstance,
  ComponentPublicInstance,
} from 'vue'
// @ts-ignore
import { injectHook } from 'vue'

function injectLifecycleHook(
  name: string,
  hook: Function,
  publicThis: ComponentPublicInstance,
  instance: ComponentInternalInstance
) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance)
  }
}

export function initHooks(
  options: ComponentOptions,
  instance: ComponentInternalInstance,
  publicThis: ComponentPublicInstance
) {
  const mpType = options.mpType || publicThis.$mpType
  // 为了组件也可以监听部分生命周期，故不再判断mpType，统一添加on开头的生命周期
  Object.keys(options).forEach((name) => {
    if (name.indexOf('on') === 0) {
      const hooks = options[name]
      if (isArray(hooks)) {
        hooks.forEach((hook) =>
          injectLifecycleHook(name, hook, publicThis, instance)
        )
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance)
      }
    }
  })
  if (__PLATFORM__ === 'app' && mpType === 'page') {
    try {
      invokeHook(publicThis, ON_LOAD, instance.attrs.__pageQuery)
      nextTick(() => {
        // 延迟onShow，保证组件的onShow也可以监听到
        invokeHook(publicThis, ON_SHOW)
      })
    } catch (e: any) {
      console.error(e.message + LINEFEED + e.stack)
    }
  }
}
