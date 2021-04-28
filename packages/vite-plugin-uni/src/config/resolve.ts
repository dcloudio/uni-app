import path from 'path'
import { UserConfig } from 'vite'
import { EXTNAME_VUE } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'
import { BUILT_IN_MODULES } from '../utils'

export function createResolve(
  options: VitePluginUniResolvedOptions,
  config: UserConfig
): UserConfig['resolve'] {
  const name = '@dcloudio/uni-h5-vue'
  const vue = BUILT_IN_MODULES[name]
  return {
    alias: {
      '@': options.inputDir,
      '~@': options.inputDir, // src: url('~@/static/uni.ttf') format('truetype');
      vue: require.resolve(
        path.join(
          name,
          config.build && config.build.ssr ? vue['cjs'] : vue['es']
        ),
        { paths: [process.env.UNI_CLI_CONTEXT || process.cwd()] }
      ),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'].concat(
      EXTNAME_VUE
    ),
  }
}
