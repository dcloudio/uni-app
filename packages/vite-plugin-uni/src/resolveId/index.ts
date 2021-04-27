import debug from 'debug'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

const debugResolve = debug('uni:resolve')
const BUILT_IN_MODULES = ['vue-router', 'vuex']

export function createResolveId(
  _options: VitePluginUniResolvedOptions
): Plugin['resolveId'] {
  return function (id) {
    if (
      id.startsWith('@dcloudio/') ||
      id.startsWith('@vue/') ||
      BUILT_IN_MODULES.includes(id)
    ) {
      const path = require.resolve(id, {
        paths: [process.env.UNI_CLI_CONTEXT!],
      })
      debugResolve(path)
      return path
    }
  }
}
