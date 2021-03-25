import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createServer(
  _options: VitePluginUniResolvedOptions
): UserConfig['server'] {
  return {
    watch: {
      ignored: ['**/uniCloud**'],
    },
  }
}
