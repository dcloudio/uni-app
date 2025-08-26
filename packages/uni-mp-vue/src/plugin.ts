import type { App } from 'vue'

import { initApp } from '@dcloudio/uni-vue'
// #if _X_
import { UNI_STATUS_BAR_HEIGHT } from '@dcloudio/uni-shared'
// #endif
import { pruneComponentPropsCache } from './helpers/renderProps'

export default {
  install(app: App) {
    initApp(app)

    app.config.globalProperties.pruneComponentPropsCache =
      pruneComponentPropsCache
    // #if _X_
    app.config.globalProperties[UNI_STATUS_BAR_HEIGHT] =
      wx.getWindowInfo().statusBarHeight
    // #endif
    const oldMount = app.mount
    app.mount = function mount(rootContainer: any) {
      const instance = oldMount.call(app, rootContainer)
      const createApp = getCreateApp()
      if (createApp) {
        createApp(instance)
      } else {
        // @ts-expect-error 旧编译器
        if (typeof createMiniProgramApp !== 'undefined') {
          // @ts-expect-error
          createMiniProgramApp(instance)
        }
      }
      return instance
    }
  },
}

function getCreateApp() {
  const method = process.env.UNI_MP_PLUGIN
    ? 'createPluginApp'
    : process.env.UNI_SUBPACKAGE
    ? 'createSubpackageApp'
    : 'createApp'
  if (
    typeof global !== 'undefined' &&
    typeof (global as any)[method] !== 'undefined'
  ) {
    return (global as any)[method]
    // @ts-expect-error
  } else if (typeof my !== 'undefined') {
    // 支付宝小程序开启globalObjectMode配置后才会有global
    // @ts-expect-error
    return (my as any)[method]
  }
}
