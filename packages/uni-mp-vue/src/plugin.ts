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
      const createApp = getCreateApp()
      if (createApp) {
        createApp(instance)
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

function getCreateApp() {
  if (typeof global !== 'undefined') {
    return (global as any).createApp
  } else if (typeof my !== 'undefined') {
    // 支付宝小程序没有global
    return (my as any).createApp
  }
}
