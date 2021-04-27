import path from 'path'
import fs from 'fs-extra'
import { UserConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import { VitePluginUniResolvedOptions } from '..'
import { uniapp } from '../utils'

function resolveAdditionalData(inputDir: string) {
  const uniScssFile = path.resolve(inputDir, 'uni.scss')
  if (!fs.existsSync(uniScssFile)) {
    return ''
  }
  return fs.readFileSync(uniScssFile, 'utf8')
}

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
      scss: {
        additionalData: resolveAdditionalData(options.inputDir),
      },
    },
  }
}
