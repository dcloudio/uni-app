import { UserConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import { VitePluginUniResolvedOptions } from '..'
import { uniapp } from '../utils/postcss'

export function createCss(
  _options: VitePluginUniResolvedOptions
): UserConfig['css'] {
  return {
    postcss: {
      plugins: [uniapp(), autoprefixer()],
    },
    preprocessorOptions: {
      scss: {},
    },
  }
}
