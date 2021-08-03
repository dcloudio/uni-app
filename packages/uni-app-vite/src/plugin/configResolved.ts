import { Plugin, ResolvedConfig } from 'vite'

import {
  removePlugins,
  injectAssetAndCssPlugins,
} from '@dcloudio/uni-cli-shared'

export const configResolved: Plugin['configResolved'] = (config) => {
  if (process.env.UNI_APP_CODE_SPLITING) {
    initCodeSpliting(config as ResolvedConfig)
  } else {
    // 移除 vite 内置的 css post 处理，交由 @dcloudio/uni-cli-shared 的 uniCssPlugin 实现
    removePlugins(['vite:css-post'], config)
  }
}

function initCodeSpliting(config: ResolvedConfig) {
  removePlugins('vite:import-analysis', config)
  injectAssetAndCssPlugins(config)
}
