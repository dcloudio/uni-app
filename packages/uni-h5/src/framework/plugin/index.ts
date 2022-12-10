import { App, ComponentPublicInstance } from 'vue'

import { initApp } from '@dcloudio/uni-vue'
import { initViewPlugin, initServicePlugin } from '@dcloudio/uni-core'

import { initRouter } from './router'

export default {
  install(app: App) {
    initApp(app)
    initViewPlugin(app)
    initServicePlugin(app)

    if (!app.config.warnHandler) {
      app.config.warnHandler = warnHandler
    }

    if (__UNI_FEATURE_PAGES__) {
      initRouter(app)
    }
  },
}

function warnHandler(
  msg: string,
  instance: ComponentPublicInstance | null,
  trace: string
) {
  if (instance) {
    // ignore ssr warning
    const name = instance.$.type.name
    if ('PageMetaHead' === name) {
      return
    }
    const parent = instance.$.parent
    if (parent && parent.type.name === 'PageMeta') {
      return
    }
  }
  const warnArgs = [`[Vue warn]: ${msg}`]
  if (trace.length) {
    warnArgs.push(`\n`, trace)
  }
  console.warn(...warnArgs)
}
