import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'

import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import { ownerModuleName } from '../utils'

const debugResolve = debug('uni:resolve')

export function uniResolveIdPlugin(): Plugin {
  const resolveCache: Record<string, string> = {}
  return {
    name: 'uni:h5-resolve-id',
    enforce: 'pre',
    config() {
      resolveCache[ownerModuleName] = resolveBuiltIn(
        path.join(ownerModuleName, 'dist/uni-mp-weibo.es.js')
      )
      resolveCache['@dcloudio/uni-h5-vue'] = resolveBuiltIn(
        path.join(
          '@dcloudio/uni-h5-vue',
          `dist/vue.runtime.${process.env.VITEST ? 'cjs' : 'esm'}.js`
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
      if (id.startsWith('@dcloudio/uni-mp-weibo/style')) {
        return (resolveCache[id] = resolveBuiltIn(id))
      }
      if (id.startsWith('@dcloudio/uni-components/style')) {
        return (resolveCache[id] = resolveBuiltIn(id))
      }
    },
  }
}
