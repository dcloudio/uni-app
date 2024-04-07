import type { UserConfig } from 'vite'
import type { VitePluginUniResolvedOptions } from '..'

export function createOptimizeDeps(
  _options: VitePluginUniResolvedOptions
): UserConfig['optimizeDeps'] {
  return {
    exclude: [
      'vue',
      'vuex',
      'vue-i18n',
      'vue-router',
      '@dcloudio/uni-app',
      '@dcloudio/uni-components',
      '@dcloudio/uni-i18n',
      '@dcloudio/uni-shared',
      '@dcloudio/uni-stacktracey',
      'pinia',
    ],
  }
}
