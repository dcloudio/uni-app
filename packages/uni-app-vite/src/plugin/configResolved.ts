import { Plugin } from 'vite'

import {
  removePlugins,
  // injectAssetPlugin,
  // injectCssPlugin,
  // injectCssPostPlugin,
} from '@dcloudio/uni-cli-shared'

export const configResolved: Plugin['configResolved'] = (config) => {
  // 移除 vite 内置的 css post 处理，交由 @dcloudio/uni-cli-shared 的 uniCssPlugin 实现
  removePlugins(['vite:css-post'], config)

  // removePlugins('vite:import-analysis', config)
  // injectCssPlugin(config)
  // injectCssPostPlugin(config)
  // injectAssetPlugin(config)
}
