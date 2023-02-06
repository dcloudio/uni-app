import path from 'path'
import fs from 'fs-extra'
import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { preCss } from '@dcloudio/uni-cli-shared'

function resolveAdditionalData(inputDir: string, config: UserConfig) {
  const uniScssFile = path.resolve(inputDir, 'uni.scss')
  const userAdditionalData =
    config.css?.preprocessorOptions?.scss?.additionalData || ''
  if (!fs.existsSync(uniScssFile)) {
    return userAdditionalData
  }
  return (
    preCss(fs.readFileSync(uniScssFile, 'utf8')) + '\n' + userAdditionalData
  )
}

export function createCss(
  options: VitePluginUniResolvedOptions,
  config: UserConfig
): UserConfig['css'] {
  return {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: resolveAdditionalData(options.inputDir, config),
      },
    },
  }
}
