import type { App } from 'vue'

import { initApp } from '@dcloudio/uni-vue'
import { pruneComponentPropsCache } from './helpers/renderProps'

interface MountOptions {
  independent?: boolean
  createApp?: (instance: any, root?: string) => void
}

export default {
  install(app: App) {
    initApp(app)

    app.config.globalProperties.pruneComponentPropsCache =
      pruneComponentPropsCache
    const oldMount = app.mount
    ;(app.mount as any) = function mount(
      rootContainer: any,
      subpackageRoot?: string,
      options?: MountOptions
    ) {
      const hasSubpackageRoot = typeof subpackageRoot === 'string'
      const root = hasSubpackageRoot ? subpackageRoot : undefined
      const instance = hasSubpackageRoot
        ? oldMount.call(app, rootContainer)
        : oldMount.apply(app, arguments as any)
      const createApp = getCreateApp(root, options)
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

function getCreateApp(subpackageRoot?: string, options?: MountOptions) {
  const root = normalizeSubpackageRoot(subpackageRoot)
  const method = process.env.UNI_MP_PLUGIN
    ? 'createPluginApp'
    : root && options?.independent
    ? 'createIndependentSubpackageApp'
    : root || process.env.UNI_SUBPACKAGE
    ? 'createSubpackageApp'
    : 'createApp'
  const createApp =
    method === 'createIndependentSubpackageApp' && options?.createApp
      ? options.createApp
      : getGlobalCreateApp(method)
  if (
    createApp &&
    root &&
    (method === 'createSubpackageApp' ||
      method === 'createIndependentSubpackageApp')
  ) {
    return (instance: any) => createApp(instance, root)
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

function normalizeSubpackageRoot(root: unknown) {
  return typeof root === 'string' ? root.replace(/^\/+|\/+$/g, '') : undefined
}
