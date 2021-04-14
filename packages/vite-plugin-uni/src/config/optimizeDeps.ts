import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

export function createOptimizeDeps(
  _options: VitePluginUniResolvedOptions
): UserConfig['optimizeDeps'] {
  return {
    exclude: [
      'vue',
      'vue-router',
      '@dcloudio/uni-app',
      '@dcloudio/uni-components',
      '@dcloudio/uni-h5',
      '@dcloudio/uni-h5-vue',
      '@dcloudio/uni-shared',
    ],
  }
}
