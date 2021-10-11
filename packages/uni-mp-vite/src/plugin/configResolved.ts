import { Plugin } from 'vite'

import {
  removePlugins,
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '.'

export function createConfigResolved({
  style: { extname },
}: UniMiniProgramPluginOptions): Plugin['configResolved'] {
  return (config) => {
    removePlugins('vite:import-analysis', config)
    injectCssPlugin(config)
    injectCssPostPlugin(config, {
      extname,
      appCss: '',
    })
    injectAssetPlugin(config)
  }
}
