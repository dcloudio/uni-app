import { Plugin } from 'vite'

import {
  removePlugins,
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
} from '@dcloudio/uni-cli-shared'

export const configResolved: Plugin['configResolved'] = (config) => {
  removePlugins('vite:import-analysis', config)
  injectCssPlugin(config)
  injectCssPostPlugin(config)
  injectAssetPlugin(config)
}
