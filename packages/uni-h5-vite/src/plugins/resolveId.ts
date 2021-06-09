import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'

import { resolveBuiltIn, parseCompatConfigOnce } from '@dcloudio/uni-cli-shared'

const debugResolve = debug('vite:uni:resolve')

export function uniResolveIdPlugin(): Plugin {
  const resolveCache: Record<string, string> = {}
  return {
    name: 'vite:uni-h5-resolve-id',
    enforce: 'pre',
    configResolved() {
      const { MODE } = parseCompatConfigOnce(process.env.UNI_INPUT_DIR)
      resolveCache['@dcloudio/uni-h5'] = resolveBuiltIn(
        path.join('@dcloudio/uni-h5', 'dist/uni-h5.es.js')
      )
      resolveCache['@dcloudio/uni-h5-vue'] = resolveBuiltIn(
        path.join(
          '@dcloudio/uni-h5-vue',
          `dist/vue.runtime.${MODE === 2 ? 'compat.' : ''}esm.js`
        )
      )
    },
    resolveId(id) {
      if (id === 'vue') {
        id = '@dcloudio/uni-h5-vue'
      }
      const cache = resolveCache[id]
      if (cache) {
        debugResolve('cache', id, cache)
        return cache
      }
      if (
        id.startsWith('@dcloudio/uni-h5/style') ||
        id.startsWith('@dcloudio/uni-components/style')
      ) {
        return (resolveCache[id] = resolveBuiltIn(id))
      }
    },
  }
}
