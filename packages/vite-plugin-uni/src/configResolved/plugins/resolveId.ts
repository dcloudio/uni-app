import fs from 'fs'
import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import { unescape } from 'querystring'
import {
  isInHBuilderX,
  normalizePath,
  parseVueRequest,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '../..'

const debugResolve = debug('vite:uni:resolve')

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

const FS_PREFIX = `/@fs/`
const VOLUME_RE = /^[A-Z]:/i
function fsPathFromId(id: string) {
  const fsPath = normalizePath(id.slice(FS_PREFIX.length))
  return fsPath.startsWith('/') || fsPath.match(VOLUME_RE)
    ? fsPath
    : `/${fsPath}`
}

export function uniResolveIdPlugin(
  options: VitePluginUniResolvedOptions
): Plugin {
  const resolveCache: Record<string, string> = {}
  return {
    name: 'vite:uni-resolve-id',
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
      // fixed by vite 3.5.2 https://github.com/vitejs/vite/pull/4728
      if (isInHBuilderX()) {
        // 解决文件路径包含转义字符（空格）等
        // /@fs/Applications/HBuilderX%20Alpha.app/Contents/HBuilderX/plugins/uniapp-cli-vite/node_modules/vite/dist/client/env.mjs
        if (id.startsWith(FS_PREFIX) && id.includes('uniapp-cli-vite')) {
          return fsPathFromId(unescape(id))
        }
      }
    },
    load(id) {
      if (options.command === 'build') {
        const { filename, query } = parseVueRequest(id)
        if (query.mpType === 'page') {
          return fs.readFileSync(filename, 'utf8')
        }
      }
    },
  }
}
