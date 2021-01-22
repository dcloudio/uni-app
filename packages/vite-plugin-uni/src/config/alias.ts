import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createAlias(
  _options: VitePluginUniResolvedOptions
): UserConfig['alias'] {
  return {
    vue: '@dcloudio/uni-h5-vue',
  }
}
