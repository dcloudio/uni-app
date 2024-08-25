import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'

import { resolveBuiltIn, resolveMainPathOnce } from '@dcloudio/uni-cli-shared'
import { isSSR, ownerModuleName } from '../utils'

const debugResolve = debug('uni:resolve')

export function uniResolveIdPlugin(): Plugin {
  const resolveCache: Record<string, string> = {}
  const mainPath = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  return {
    name: 'uni:h5-resolve-id',
    enforce: 'pre',
    configResolved(config) {
      resolveCache[ownerModuleName] = resolveBuiltIn(
        path.join(
          ownerModuleName,
          (process.env.UNI_APP_X === 'true' ? 'dist-x' : 'dist') +
            '/uni-h5.es.js'
        )
      )
      resolveCache['@dcloudio/uni-h5-vue'] = resolveBuiltIn(
        path.join(
          '@dcloudio/uni-h5-vue',
          (process.env.UNI_APP_X === 'true' ? 'dist-x' : 'dist') +
            `/vue.runtime.${process.env.VITEST ? 'cjs' : 'esm'}.js`
        )
      )
    },
    resolveId(id, importer, options) {
      if (id === '/main' && importer && importer.endsWith('index.html')) {
        return mainPath
      }
      if (id === 'vue') {
        id = '@dcloudio/uni-h5-vue'
      }
      if (isSSR(options)) {
        if (id === '@dcloudio/uni-h5-vue') {
          return resolveBuiltIn(
            path.join(
              '@dcloudio/uni-h5-vue',
              (process.env.UNI_APP_X === 'true' ? 'dist-x' : 'dist') +
                `/vue.runtime.cjs.js`
            )
          )
        }
      }
      const cache = resolveCache[id]
      if (cache) {
        debugResolve('cache', id, cache)
        return cache
      }
      if (id.startsWith('@dcloudio/uni-h5/style')) {
        return (resolveCache[id] = resolveBuiltIn(id))
      }
      if (id.startsWith('@dcloudio/uni-components/style')) {
        return (resolveCache[id] = resolveBuiltIn(id))
      }
    },
  }
}
