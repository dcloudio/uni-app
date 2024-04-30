import { extend } from '@vue/shared'
import { defineSyncApi } from '@dcloudio/uni-api'
import type { ComponentInternalInstance } from 'vue'

interface JsRuntime {
  injectHook: (
    type: string,
    hook: Function,
    target: ComponentInternalInstance | null,
    prepend: boolean
  ) => Function | undefined
  createApp: typeof createApp
}

export const registerRuntime = defineSyncApi<(runtime: JsRuntime) => void>(
  'registerRuntime',
  (runtime) => {
    // @ts-expect-error
    extend(jsRuntime, runtime)
  }
)
