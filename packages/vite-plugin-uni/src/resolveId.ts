import debug from 'debug'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '.'

const debugResolve = debug('uni:resolve')

const VUES = ['vue', 'vue.js', './vue.js', 'dist/vue.runtime.esm-bundler.js']

export function createResolveId(
  options: VitePluginUniResolvedOptions
): Plugin['resolveId'] {
  return function (id) {
    if (VUES.includes(id)) {
      debugResolve(id)
      return '@dcloudio/uni-h5-vue'
    }
  }
}
