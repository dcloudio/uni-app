import { UserConfig } from 'vite'
import { EXTNAME_VUE } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

export function createResolve(
  options: VitePluginUniResolvedOptions,
  config: UserConfig
): UserConfig['resolve'] {
  return {
    alias: {
      '@': options.inputDir,
      '~@': options.inputDir, // src: url('~@/static/uni.ttf') format('truetype');
      vue: '@dcloudio/uni-h5-vue',
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'].concat(
      EXTNAME_VUE
    ),
  }
}
