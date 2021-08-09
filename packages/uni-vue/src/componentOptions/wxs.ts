import { ComponentInternalInstance, ComponentOptions } from 'vue'
import { initModules } from './renderjs'

export function initWxs(
  { $wxs }: ComponentOptions,
  instance: ComponentInternalInstance
) {
  initModules(instance, $wxs)
}
