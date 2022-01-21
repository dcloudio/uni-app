import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '../..'

const debugResolve = debug('uni:resolve-id')

const BUILT_IN_MODULES = {
  'vue-router': 'dist/vue-router.esm-bundler.js',
  vuex: 'dist/vuex.esm-bundler.js',
  'vue-i18n': 'dist/vue-i18n.esm-bundler.js',
  '@dcloudio/uni-app': 'dist/uni-app.es.js',
  '@dcloudio/uni-stat': 'dist/uni-stat.es.js',
  '@dcloudio/uni-cloud': 'dist/uni-cloud.es.js',
  '@dcloudio/uni-i18n': 'dist/uni-i18n.es.js',
  '@dcloudio/uni-shared': 'dist/uni-shared.es.js',
}

export type BuiltInModulesKey = keyof typeof BUILT_IN_MODULES

export function uniResolveIdPlugin(
  options: VitePluginUniResolvedOptions
): Plugin {
  const resolveCache: Record<string, string> = {}
  return {
    name: 'uni:resolve-id',
    resolveId(id) {
      const cache = resolveCache[id]
      if (cache) {
        debugResolve('cache', id, cache)
        return cache
      }
      if (BUILT_IN_MODULES[id as BuiltInModulesKey]) {
        return (resolveCache[id] = resolveBuiltIn(
          path.join(id, BUILT_IN_MODULES[id as BuiltInModulesKey])
        ))
      }
    },
  }
}
