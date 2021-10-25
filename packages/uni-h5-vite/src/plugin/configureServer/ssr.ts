import { ViteDevServer } from 'vite'

export const external = [
  '@dcloudio/uni-app',
  '@dcloudio/uni-cloud',
  '@dcloudio/uni-h5',
  '@dcloudio/uni-h5-vue',
  '@dcloudio/uni-i18n',
  '@dcloudio/uni-shared',
  '@dcloudio/uni-stat',
  '@vue/shared',
  'vue',
  'vue-i18n',
  'vue-router',
  'vuex',
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
