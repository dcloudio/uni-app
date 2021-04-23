import { UserConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import { VitePluginUniResolvedOptions } from '..'
import { uniapp } from '../utils'

export function createCss(
  options: VitePluginUniResolvedOptions
): UserConfig['css'] {
  return {
    postcss: {
      plugins: [
        uniapp({ page: options.platform === 'h5' ? 'uni-page-body' : 'body' }),
        autoprefixer(),
      ],
    },
    preprocessorOptions: {
      scss: {},
    },
  }
}
