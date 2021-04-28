import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { BUILT_IN_MODULES } from '../utils'

const debugResolve = debug('uni:resolve')

export function createResolveId(
  _options: VitePluginUniResolvedOptions
): Plugin['resolveId'] {
  return function (id, _importer, _options, ssr) {
    const files = BUILT_IN_MODULES[id as keyof typeof BUILT_IN_MODULES]
    if (files) {
      const file = require.resolve(path.join(id, files[ssr ? 'cjs' : 'es']))
      debugResolve(file)
      return file
    }
    if (
      id.startsWith('@dcloudio/uni-h5/style') ||
      id.startsWith('@dcloudio/uni-components/style')
    ) {
      debugResolve(id)
      return require.resolve(id, { paths: [process.env.UNI_CLI_CONTEXT] })
    }
  }
}
