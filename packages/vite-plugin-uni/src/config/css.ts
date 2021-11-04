import path from 'path'
import fs from 'fs-extra'
import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

function resolveAdditionalData(inputDir: string) {
  const uniScssFile = path.resolve(inputDir, 'uni.scss')
  if (!fs.existsSync(uniScssFile)) {
    return ''
  }
  return fs.readFileSync(uniScssFile, 'utf8')
}

function resolvePostcssConfig(inputDir: string) {
  return [
    path.resolve(inputDir, 'postcss.config.js'),
    path.resolve(process.cwd(), 'postcss.config.js'),
  ].find((file) => fs.existsSync(file))
}

export function createCss(
  options: VitePluginUniResolvedOptions
): UserConfig['css'] {
  return {
    postcss: resolvePostcssConfig(options.inputDir),
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: resolveAdditionalData(options.inputDir),
      },
    },
  }
}
