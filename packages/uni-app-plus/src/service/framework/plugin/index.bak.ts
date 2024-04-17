import type { App } from 'vue'
import { initApp } from '@dcloudio/uni-vue'
import { initServicePlugin } from '@dcloudio/uni-core'
import { registerApp } from '../app'

export default {
  install(app: App) {
    initMount(app)
    initApp(app)
    initServicePlugin(app)
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
