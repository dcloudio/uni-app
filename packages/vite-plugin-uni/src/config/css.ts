import path from 'path'
import fs from 'fs-extra'
import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

function resolveAdditionalData(inputDir: string, config: UserConfig) {
  const uniScssFile = path.resolve(inputDir, 'uni.scss')
  const userAdditionalData =
    config.css?.preprocessorOptions?.scss?.additionalData || ''
  if (!fs.existsSync(uniScssFile)) {
    return userAdditionalData
  }
  return fs.readFileSync(uniScssFile, 'utf8') + '\n' + userAdditionalData
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
