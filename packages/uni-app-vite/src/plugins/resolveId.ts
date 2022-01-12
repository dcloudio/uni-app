import debug from 'debug'
import { Plugin } from 'vite'

import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'

const debugResolve = debug('uni:app-resolve-id')

export function uniResolveIdPlugin(): Plugin {
  const resolveCache: Record<string, string> = {}
  return {
    name: 'uni:app-resolve-id',
    enforce: 'pre',
    configResolved() {
      resolveCache['@dcloudio/uni-app-vue'] = resolveBuiltIn(
        '@dcloudio/uni-app-vue'
      )
    },
    resolveId(id) {
      if (id === 'vue') {
        id = '@dcloudio/uni-app-vue'
      }
      const cache = resolveCache[id]
      if (cache) {
        debugResolve('cache', id, cache)
        return cache
      }
    },
  }
}
