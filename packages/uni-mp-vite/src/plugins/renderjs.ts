import debug from 'debug'
import type { Plugin, ResolvedConfig } from 'vite'

import {
  type MiniProgramFilterOptions,
  cleanUrl,
  genWxsCallMethodsCode,
  missingModuleName,
  parseRenderjs,
} from '@dcloudio/uni-cli-shared'

const debugRenderjs = debug('uni:mp-renderjs')

const filtersCache = new Map<ResolvedConfig, MiniProgramFilterOptions[]>()

export function getFiltersCache(resolvedConfig: ResolvedConfig) {
  return filtersCache.get(resolvedConfig) || []
}

export function uniRenderjsPlugin({ lang }: { lang?: string }): Plugin {
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:mp-renderjs',
    configResolved(config) {
      resolvedConfig = config
      filtersCache.set(resolvedConfig, [])
    },
    transform(code, id) {
      const { type, name } = parseRenderjs(id)
      if (!type) {
        return null
      }
      debugRenderjs(id)
      if (type !== lang) {
        return {
          code: 'export default {}',
          map: { mappings: '' },
        }
      }
      this.addWatchFile(cleanUrl(id))
      if (!name) {
        this.error(missingModuleName(type, code))
      } else {
        let cache = filtersCache.get(resolvedConfig)
        if (cache) {
          const index = cache.findIndex((item) => item.id === id)
          if (index > -1) {
            cache.splice(index, 1)
          }
          cache.push({
            id,
            type,
            name,
            code,
          })
        }
      }
      return {
        code: genWxsCallMethodsCode(code),
        map: { mappings: '' },
      }
    },
  }
}
