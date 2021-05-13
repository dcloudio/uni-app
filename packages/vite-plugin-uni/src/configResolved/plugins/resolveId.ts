import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'

import { resolveBuiltIn, parseCompatConfigOnce } from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '../..'
import { BuiltInModulesKey, BUILT_IN_MODULES } from '../../utils'

const debugResolve = debug('vite:uni:resolve')

function getModuleType(mode?: 2 | 3) {
  return mode === 2 ? 'es-compat' : 'es'
}
// ssr 时，服务端 vue 的映射目前由 package.json-"vue":"npm:@dcloudio/uni-h5-vue" 处理（TODO HBuilderX）

export function uniResolveIdPlugin(
  options: VitePluginUniResolvedOptions
): Plugin {
  const resolveCache: Record<string, string> = {}
  const resolvedIds = [
    {
      test(id: string) {
        return id === '@dcloudio/uni-h5-vue'
      },
      resolveId(id: string) {
        const files = BUILT_IN_MODULES[id as BuiltInModulesKey]
        const { MODE } = parseCompatConfigOnce(options.inputDir)
        return resolveBuiltIn(
          path.join(id, files[getModuleType(MODE) as keyof typeof files])
        )
      },
    },
    {
      test(id: string) {
        return BUILT_IN_MODULES[id as BuiltInModulesKey]
      },
      resolveId(id: string) {
        return resolveBuiltIn(
          path.join(id, BUILT_IN_MODULES[id as BuiltInModulesKey]['es'])
        )
      },
    },
    {
      test(id: string) {
        return (
          id.startsWith('@dcloudio/uni-h5/style') ||
          id.startsWith('@dcloudio/uni-components/style')
        )
      },
      resolveId(id: string) {
        return resolveBuiltIn(id)
      },
    },
  ]
  return {
    name: 'vite:uni-resolve-id',
    resolveId(id) {
      if (id === 'vue') {
        if (options.platform === 'h5') {
          id = '@dcloudio/uni-h5-vue'
        }
      }
      const cache = resolveCache[id]
      if (cache) {
        return cache
      }

      for (const { test, resolveId } of resolvedIds) {
        if (!test(id)) {
          continue
        }
        const file = resolveId(id)
        if (!file) {
          continue
        }
        resolveCache[id] = file
        debugResolve(id, file)
        return file
      }
    },
  }
}
