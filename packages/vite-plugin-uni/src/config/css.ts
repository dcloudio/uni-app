import path from 'path'
import fs from 'fs-extra'
import { UserConfig } from 'vite'
// import autoprefixer from 'autoprefixer'
import { extend } from '@vue/shared'
import { parseRpx2UnitOnce } from '@dcloudio/uni-cli-shared'
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
        uniapp(
          extend(
            { page: options.platform === 'h5' ? 'uni-page-body' : 'body' },
            parseRpx2UnitOnce(options.inputDir)
          )
        ),
        // autoprefixer(),// TODO 似乎版本兼容有问题，目前报：Cannot read property 'prefix_exceptions' of undefined
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: resolveAdditionalData(options.inputDir),
      },
    },
  }
}
