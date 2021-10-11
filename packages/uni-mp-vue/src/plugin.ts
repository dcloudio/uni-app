import { App } from 'vue'

import { initApp } from '@dcloudio/uni-vue'

export default {
  install(app: App) {
    initApp(app)

    // TODO 旧编译器使用了$createElement 导致告警，当切换到新编译器时，移除此类代码
    app.config.globalProperties.$createElement = () => {}

    const oldMount = app.mount
    app.mount = function mount(rootContainer: any) {
      const instance = oldMount.call(app, rootContainer)
      if ((global as any).createApp) {
        ;(global as any).createApp(instance)
      } else {
        // @ts-ignore 旧编译器
        if (typeof createMiniProgramApp !== 'undefined') {
          // @ts-ignore
          createMiniProgramApp(instance)
        }
      }

      return instance
    }
  },
}
