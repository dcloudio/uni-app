import { WXS_MODULES } from '@dcloudio/uni-shared'
import { ComponentInternalInstance, ComponentOptions } from 'vue'
import { initModules } from './renderjs'

export function initWxs(
  options: ComponentOptions,
  instance: ComponentInternalInstance
) {
  initModules(instance, options.$wxs, options['$' + WXS_MODULES])
}
