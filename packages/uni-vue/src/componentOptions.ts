import { isFunction } from '@vue/shared'

import {
  ComponentOptions,
  ComponentInternalInstance,
  ComponentPublicInstance
} from '@vue/runtime-core'
// @ts-ignore
import { injectHook } from 'vue'

export function applyOptions(
  options: ComponentOptions,
  instance: ComponentInternalInstance,
  publicThis: ComponentPublicInstance
) {
  Object.keys(options).forEach(name => {
    if (name.indexOf('on') === 0) {
      const hook = options[name]
      if (isFunction(hook)) {
        injectHook(name as any, hook.bind(publicThis), instance)
      }
    }
  })
}
