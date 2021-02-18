import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '.'

const debugResolve = debug('uni:resolve')

const VUES = ['vue', 'vue.js', './vue.js', 'dist/vue.runtime.esm-bundler.js']

let pagesJsonJsPath: string

export function createResolveId(
  options: VitePluginUniResolvedOptions
): Plugin['resolveId'] {
  return function (id) {
    if (id.endsWith('pages.json.js')) {
      if (!pagesJsonJsPath) {
        pagesJsonJsPath = path.resolve(options.inputDir, 'pages.json.js')
      }
      debugResolve(id)
      return pagesJsonJsPath
    }
    if (VUES.includes(id)) {
      debugResolve(id)
      return '@dcloudio/uni-h5-vue'
    }
    // if (id.startsWith('@/')) {
    //   debugResolve(id)
    //   return path.join(options.inputDir, id.replace('@/', ''))
    // }
  }
}
