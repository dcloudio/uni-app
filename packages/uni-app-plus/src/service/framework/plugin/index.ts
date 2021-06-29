import { App, ComponentInternalInstance } from 'vue'
import { extend } from '@vue/shared'
import { initApp } from '@dcloudio/uni-vue'
import { initService } from '@dcloudio/uni-core'
import { registerApp } from '../app'

interface JsRuntime {
  injectHook: (
    type: string,
    hook: Function,
    target: ComponentInternalInstance | null,
    prepend: boolean
  ) => Function | undefined
  createApp: typeof createApp
}

export default {
  install(app: App, runtime: JsRuntime) {
    // @ts-expect-error 赋值全局对象 jsRuntime
    extend(jsRuntime, runtime)

    initMount(app)
    initApp(app)
    initService(app)
  },
}

function initMount(app: App) {
  const oldMount = app.mount
  app.mount = (rootContainer) => {
    const instance = oldMount.call(app, rootContainer)
    if (rootContainer === '#app') {
      registerApp(instance)
    }
    return instance
  }
}
