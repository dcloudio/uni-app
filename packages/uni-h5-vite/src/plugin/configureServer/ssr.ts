import type { ViteDevServer } from 'vite'
import { isUniAppXWebVapor } from '@dcloudio/uni-cli-shared'

export const external = [
  '@dcloudio/uni-app',
  '@dcloudio/uni-app-plus',
  '@dcloudio/uni-cloud',
  '@dcloudio/uni-components',
  '@dcloudio/uni-h5',
  '@dcloudio/uni-h5-vue',
  '@dcloudio/uni-i18n',
  '@dcloudio/uni-mp-alipay',
  '@dcloudio/uni-mp-baidu',
  '@dcloudio/uni-mp-kuaishou',
  '@dcloudio/uni-mp-lark',
  '@dcloudio/uni-mp-qq',
  '@dcloudio/uni-mp-toutiao',
  '@dcloudio/uni-mp-weixin',
  '@dcloudio/uni-quickapp-webview',
  '@dcloudio/uni-shared',
  '@dcloudio/uni-stat',
  '@dcloudio/uni-stacktracey',
  '@vue/shared',
  'vue',
  'vue-i18n',
  'vue-router',
  'vuex',
  // dev
  '@dcloudio/types',
  '@dcloudio/uni-automator',
  '@dcloudio/uni-cli-shared',
  '@dcloudio/vite-plugin-uni',
  'autoprefixer',
  'typescript',
  'vite',
]

// Web Vapor SSR 必须将共享同一 Vue runtime 的依赖打进服务端产物，
// 其他依赖仍保持原有 external 行为，避免影响开发者的 Node 依赖。
export const webVaporSsrNoExternal = [
  '@dcloudio/uni-app',
  '@dcloudio/uni-h5',
  '@dcloudio/uni-h5-vue',
  '@dcloudio/uni-shared',
  '@vue/runtime-dom',
  '@vue/server-renderer',
  '@vue/shared',
  'vue',
  'vue-i18n',
  'vue-router',
  'vuex',
]

const webVaporSsrNoExternalSet = new Set(webVaporSsrNoExternal)

export function getSsrExternalModules() {
  return isUniAppXWebVapor()
    ? external.filter((id) => id !== '@dcloudio/uni-h5')
    : external
}

export function getWebVaporSsrExternalModules() {
  return external.filter((id) => !webVaporSsrNoExternalSet.has(id))
}

export function initSSR(server: ViteDevServer) {
  const { ssrLoadModule } = server
  let added = false
  server.ssrLoadModule = (url) => {
    const res = ssrLoadModule(url)
    if (!added) {
      // HBuilderX项目，根目录可能没有package.json，导致 ssrExternals 不生效
      added = true
      if ((server as any)._ssrExternals) {
        const { _ssrExternals } = server as unknown as {
          _ssrExternals: string[]
        }
        getSsrExternalModules().forEach((module) => {
          if (!_ssrExternals.includes(module)) {
            _ssrExternals.push(module)
          }
        })
      }
    }
    return res
  }
}
