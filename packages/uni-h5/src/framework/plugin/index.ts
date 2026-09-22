import type { App, ComponentPublicInstance } from 'vue'
//#if _X_VAPOR_ && !_NODE_JS_
// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Web Vapor runtime 已导出该方法
import { setRealPathResolver } from 'vue'
import { getRealPath } from '../../platform'
//#endif

import { initApp } from '@dcloudio/uni-vue'
import { initServicePlugin, initViewPlugin } from '@dcloudio/uni-core'

import { initRouter } from './router'

export default {
  install(app: App) {
    //#if _X_VAPOR_ && !_NODE_JS_
    setRealPathResolver(getRealPath)
    //#endif

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

type VaporWarnInstance = {
  type: { name?: string }
  parent: { type: { name?: string } } | null
}

function warnHandler(
  msg: string,
  instance: ComponentPublicInstance | VaporWarnInstance | null,
  trace: string
) {
  if (instance) {
    //#if _X_VAPOR_
    // Vapor 可能直接传入内部实例，VDOM 兼容组件仍传入公开实例。
    const internalInstance = '$' in instance ? instance.$ : instance
    // @ts-expect-error name 仅在未执行条件编译的源码类型检查中重复声明
    const name = internalInstance.type.name
    //#else
    // 条件编译后与 Vapor 分支不会同时存在。
    // @ts-expect-error name 仅在未执行条件编译的源码类型检查中重复声明
    const name = (instance as ComponentPublicInstance).$.type.name
    //#endif
    if ('PageMetaHead' === name) {
      return
    }
    //#if _X_VAPOR_
    // @ts-expect-error parent 仅在未执行条件编译的源码类型检查中重复声明
    const parent = internalInstance.parent
    //#else
    // 条件编译后与 Vapor 分支不会同时存在。
    // @ts-expect-error parent 仅在未执行条件编译的源码类型检查中重复声明
    const parent = (instance as ComponentPublicInstance).$.parent
    //#endif
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
