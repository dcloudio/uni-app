import { Plugin, ResolvedConfig } from 'vite'
import {
  parseManifestJsonOnce,
  getNVueCompiler,
  getNVueStyleCompiler,
} from '@dcloudio/uni-cli-shared'

import { assetPlugin } from '../plugins/vitejs/plugins/asset'
import { cssPlugin, cssPostPlugin } from '../plugins/vitejs/plugins/css'

export const configResolved: Plugin['configResolved'] = (config) => {
  const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  if (getNVueCompiler(manifestJson) === 'uni-app') {
    process.env.UNI_USING_NVUE_COMPILER = 'uni-app'
  }
  if (getNVueStyleCompiler(manifestJson) === 'uni-app') {
    process.env.UNI_USING_NVUE_STYLE_COMPILER = 'uni-app'
  }
  if (process.env.UNI_APP_CODE_SPLITING) {
    initCodeSpliting(config as ResolvedConfig)
  } else {
    // 移除 vite 内置的 css post 处理，交由 @dcloudio/uni-cli-shared 的 uniCssPlugin 实现
    const index = config.plugins.findIndex((p) => p.name === 'vite:css-post')
    if (index > -1) {
      ;(config.plugins as Plugin[]).splice(index, 1)
    }
  }
}

function initCodeSpliting(config: ResolvedConfig) {
  // 替换内置插件
  const replacedPlugins = [
    assetPlugin(config),
    cssPlugin(config),
    cssPostPlugin(config),
  ]
  replacedPlugins.forEach((plugin) => {
    const index = (config.plugins as Plugin[]).findIndex(
      (p) => p.name === plugin.name
    )
    if (index > -1) {
      ;(config.plugins as Plugin[]).splice(index, 1, plugin)
    }
  })
  const removedPlugins = ['vite:import-analysis']
  removedPlugins.forEach((name) => {
    const index = config.plugins.findIndex((p) => p.name === name)
    if (index > -1) {
      ;(config.plugins as Plugin[]).splice(index, 1)
    }
  })
}
