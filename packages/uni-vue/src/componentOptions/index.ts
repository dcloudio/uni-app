import {
  ComponentOptions,
  ComponentInternalInstance,
  ComponentPublicInstance,
} from 'vue'
// @ts-ignore
import { injectHook } from 'vue'
import { initHooks } from './hooks'
import { initRenderjs } from './renderjs'
import { initWxs } from './wxs'

export function applyOptions(
  options: ComponentOptions,
  instance: ComponentInternalInstance,
  publicThis: ComponentPublicInstance
) {
  if (__PLATFORM__ === 'app') {
    initWxs(options, instance)
    initRenderjs(options, instance)
  }
  initHooks(options, instance, publicThis)
}
