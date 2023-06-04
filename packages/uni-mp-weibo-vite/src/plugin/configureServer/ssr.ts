import type { ViteDevServer } from 'vite'

export const external = [
  '@dcloudio/uni-app',
  '@dcloudio/uni-app-plus',
  '@dcloudio/uni-cloud',
  '@dcloudio/uni-components',
  '@dcloudio/uni-mp-webo',
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
        external.forEach((module) => {
          if (!_ssrExternals.includes(module)) {
            _ssrExternals.push(module)
          }
        })
      }
    }
    return res
  }
}
