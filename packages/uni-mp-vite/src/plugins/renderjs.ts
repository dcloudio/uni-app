import debug from 'debug'
import { Plugin, ResolvedConfig } from 'vite'

import {
  cleanUrl,
  MiniProgramFilterOptions,
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
    },
    buildStart() {
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
        filtersCache.get(resolvedConfig)!.push({
          id,
          type,
          name,
          code,
        })
      }
      return {
        code: 'export default {}',
        map: { mappings: '' },
      }
    },
  }
}
