import { ComponentInternalInstance } from 'vue'
import { extend } from '@vue/shared'
interface JsRuntime {
  injectHook: (
    type: string,
    hook: Function,
    target: ComponentInternalInstance | null,
    prepend: boolean
  ) => Function | undefined
  createApp: typeof createApp
}

export function defineRuntime(runtime: JsRuntime) {
  // @ts-expect-error
  extend(jsRuntime, runtime)
}
