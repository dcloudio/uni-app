import { App } from 'vue'

import { initApp } from '@dcloudio/uni-vue'

export default {
  install(app: App) {
    initApp(app)
    const globalProperties = app._context.config.globalProperties
    const oldCallHook = globalProperties.$callHook
    globalProperties.$callHook = function callHook(
      name: string,
      args?: unknown
    ) {
      if (name === 'mounted') {
        oldCallHook.call(this, 'bm') // beforeMount
        this.$.isMounted = true
        name = 'm'
      }
      return oldCallHook.call(this, name, args)
    }

    const oldMount = app.mount
    app.mount = function mount(rootContainer: any) {
      const instance = oldMount.call(app, rootContainer)
      // @ts-ignore
      createMiniProgramApp(instance)
      return instance
    }
  },
}
