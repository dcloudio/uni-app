import debug from 'debug'
import type { Plugin, ResolvedConfig } from 'vite'

import { cleanUrl } from '@dcloudio/uni-cli-shared'
import type { UniPluginFilterOptions } from '.'
import { createPublicFileFilter } from '../../utils'

const debugStatic = debug('uni:static')
/**
 * 提供static等目录静态资源加载
 * @param _options
 * @param config
 * @returns
 */
export function uniStaticPlugin(
  _options: UniPluginFilterOptions,
  config: ResolvedConfig
): Plugin {
  const filter = createPublicFileFilter()
  return {
    name: 'uni:static',
    resolveId(id) {
      if (!config.assetsInclude(cleanUrl(id))) {
        return
      }
      const publicFile = filter(id)
      if (publicFile) {
        debugStatic(id)
        return id
      }
    },
    async load(id) {
      if (!config.assetsInclude(cleanUrl(id))) {
        return
      }
      if (filter(id)) {
        return `export default ${JSON.stringify(fileToUrl(id, config))}`
      }
    },
  }
}

function fileToUrl(id: string, config: ResolvedConfig) {
  return config.base + id.slice(1)
}
