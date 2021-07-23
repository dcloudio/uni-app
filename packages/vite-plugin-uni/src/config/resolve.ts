import { UserConfig } from 'vite'
import { EXTNAME_VUE } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

export function createResolve(
  options: VitePluginUniResolvedOptions,
  _config: UserConfig
): UserConfig['resolve'] {
  return {
    alias: {
      '@': '',
      '~@': '', // src: url('~@/static/uni.ttf') format('truetype');
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'].concat(
      EXTNAME_VUE
    ),
  }
}
