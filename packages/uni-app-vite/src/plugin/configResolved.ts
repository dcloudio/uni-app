import { Plugin, ResolvedConfig } from 'vite'

import { assetPlugin } from '../plugins/vitejs/plugins/asset'
import { cssPlugin, cssPostPlugin } from '../plugins/vitejs/plugins/css'

export const configResolved: Plugin['configResolved'] = (config) => {
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
