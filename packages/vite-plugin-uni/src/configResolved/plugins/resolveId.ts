import path from 'path'
// import debug from 'debug'
import fs from 'fs-extra'
import type { Plugin } from 'vite'
import { resolveBuiltIn, resolveUTSModule } from '@dcloudio/uni-cli-shared'

import type { VitePluginUniResolvedOptions } from '../..'

// const debugResolve = debug('uni:resolve-id')

const isPiniaVersion3 =
  Number(
    fs
      .readJSONSync(resolveBuiltIn(path.join('pinia/package.json')))
      .version.split('.')[0]
  ) >= 3

const BUILT_IN_MODULES = {
  'vue-router': 'dist/vue-router.esm-bundler.js',
  vuex: 'dist/vuex.esm-bundler.js',
  'vue-i18n': 'dist/vue-i18n.esm-bundler.js',
  '@dcloudio/uni-app': 'dist/uni-app.es.js',
  '@dcloudio/uni-cloud': 'dist/uni-cloud.es.js',
  '@dcloudio/uni-i18n': 'dist/uni-i18n.es.js',
  '@dcloudio/uni-shared': 'dist/uni-shared.es.js',
  '@dcloudio/uni-stacktracey': 'dist/uni-stacktracey.es.js',
  '@vue/shared': 'dist/shared.esm-bundler.js',
  pinia: isPiniaVersion3 ? '' : 'dist/pinia.mjs',
}

export type BuiltInModulesKey = keyof typeof BUILT_IN_MODULES

export function uniResolveIdPlugin(
  options: VitePluginUniResolvedOptions
): Plugin {
  const resolveCache: Record<string, string> = {}
  if (process.env.UNI_APP_X === 'true') {
    BUILT_IN_MODULES['@dcloudio/uni-app'] = 'dist-x/uni-app.es.js'
    BUILT_IN_MODULES['@dcloudio/uni-cloud'] = 'dist/uni-cloud-x.es.js'
  }
  return {
    name: 'uni:resolve-id',
    resolveId(id, importer) {
      const cache = resolveCache[id]
      if (cache) {
        // debugResolve('cache', id, cache)
        return cache
      }
      if (BUILT_IN_MODULES[id as BuiltInModulesKey]) {
        return (resolveCache[id] = resolveBuiltIn(
          path.join(id, BUILT_IN_MODULES[id as BuiltInModulesKey])
        ))
      }
      if (process.env.UNI_PLATFORM !== 'app') {
        return resolveUTSModule(
          id,
          importer ? path.dirname(importer) : process.env.UNI_INPUT_DIR
        )
      }
    },
  }
}
