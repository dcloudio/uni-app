import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { BUILT_IN_MODULES } from '../utils'
import { parseCompatConfigOnce } from '../../../uni-cli-shared/dist'

const debugResolve = debug('vite:uni:resolve')

function getModuleType(ssr?: boolean, mode?: 2 | 3) {
  return ssr ? 'cjs' : 'es' + (mode === 2 ? '-compat' : '')
}

export function createResolveId(
  options: VitePluginUniResolvedOptions
): Plugin['resolveId'] {
  return function (id, _importer, _options, ssr) {
    if (id === '@dcloudio/uni-h5-vue') {
      const files = BUILT_IN_MODULES[id]
      const { MODE } = parseCompatConfigOnce(options.inputDir)
      const file = require.resolve(
        path.join(id, files[getModuleType(ssr, MODE) as keyof typeof files])
      )
      debugResolve(file)
      return file
    }
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
