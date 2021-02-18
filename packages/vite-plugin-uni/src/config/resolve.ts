import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createResolve(
  options: VitePluginUniResolvedOptions
): UserConfig['resolve'] {
  return {
    alias: {
      '@': options.inputDir,
      vue: '@dcloudio/uni-h5-vue',
    },
  }
}
