import type { App, ComponentPublicInstance } from 'vue'

import { initApp } from '@dcloudio/uni-vue'
import { initServicePlugin, initViewPlugin } from '@dcloudio/uni-core'

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
    if (__DEV__ && !__UNI_FEATURE_PAGES__) {
      console.warn(
        '\n当前项目为单页面工程，不能执行页面跳转api。\n如果需进行页面跳转， 需要在pages.json文件的pages字段中配置多个页面，然后重新运行。'
      )
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
