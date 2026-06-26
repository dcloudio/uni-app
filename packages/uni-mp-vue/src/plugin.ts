import type { App } from 'vue'

import { initApp } from '@dcloudio/uni-vue'
import { pruneComponentPropsCache } from './helpers/renderProps'

export default {
  install(app: App) {
    initApp(app)

    app.config.globalProperties.pruneComponentPropsCache =
      pruneComponentPropsCache
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
  const subpackageRoot = getSubpackageRoot()
  const method =
    subpackageRoot || process.env.UNI_SUBPACKAGE
      ? 'createSubpackageApp'
      : process.env.UNI_MP_PLUGIN
      ? 'createPluginApp'
      : 'createApp'
  const createApp = getGlobalCreateApp(method)
  if (createApp && subpackageRoot && method === 'createSubpackageApp') {
    return (instance: any) => createApp(instance, subpackageRoot)
  }
  return createApp
}

function getGlobalCreateApp(method: string) {
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

function getSubpackageRoot() {
  if (typeof globalThis !== 'undefined') {
    const root = normalizeSubpackageRoot(
      (globalThis as any).__uniSubpackageRoot
    )
    if (root) {
      return root
    }
  }
  if (typeof global !== 'undefined') {
    const root = normalizeSubpackageRoot((global as any).__uniSubpackageRoot)
    if (root) {
      return root
    }
  }
  // @ts-expect-error
  if (typeof my !== 'undefined') {
    // @ts-expect-error
    return normalizeSubpackageRoot((my as any).__uniSubpackageRoot)
  }
}

function normalizeSubpackageRoot(root: unknown) {
  return typeof root === 'string' ? root.replace(/^\/+|\/+$/g, '') : undefined
}
