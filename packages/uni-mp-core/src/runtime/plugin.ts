import { ComponentPublicInstance } from 'vue'
import { initAppLifecycle, parseApp, ParseAppOptions } from './app'

export function initCreatePluginApp(parseAppOptions?: ParseAppOptions) {
  return function createApp(vm: ComponentPublicInstance) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm)
    if (process.env.UNI_MP_PLUGIN) {
      __GLOBAL__.$vm = vm
    }
  }
}
