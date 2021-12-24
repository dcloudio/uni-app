import debug from 'debug'
import { Plugin, ResolvedConfig } from 'vite'

import {
  cleanUrl,
  MiniProgramFilterOptions,
  missingModuleName,
  parseRenderjs,
} from '@dcloudio/uni-cli-shared'

const debugRenderjs = debug('vite:uni:renderjs')

const filtersCache = new Map<ResolvedConfig, MiniProgramFilterOptions[]>()

export function getFiltersCache(resolvedConfig: ResolvedConfig) {
  return filtersCache.get(resolvedConfig) || []
}

const defaultCode = {
  code: 'export default {}',
}

export function uniRenderjsPlugin({ lang }: { lang?: string }): Plugin {
  let resolvedConfig: ResolvedConfig
  return {
    name: 'vite:uni-mp-renderjs',
    configResolved(config) {
      resolvedConfig = config
    },
    buildStart() {
      filtersCache.set(resolvedConfig, [])
    },
    transform(code, id) {
      const { type, name } = parseRenderjs(id)
      if (!type) {
        return
      }
      debugRenderjs(id)
      if (type !== lang) {
        return defaultCode
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
      return defaultCode
    },
  }
}
