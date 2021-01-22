import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createCss(
  _options: VitePluginUniResolvedOptions
): UserConfig['css'] {
  return {
    preprocessorOptions: {
      scss: {},
    },
  }
}
