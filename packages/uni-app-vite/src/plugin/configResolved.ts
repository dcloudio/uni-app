import { Plugin } from 'vite'

import {
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
} from '@dcloudio/uni-cli-shared'

export function createConfigResolved(options: {
  chunkCssFilename: (id: string) => string | void
  chunkCssCode: (filename: string, cssCode: string) => string
}): Plugin['configResolved'] {
  return (config) => {
    injectCssPlugin(config)
    injectCssPostPlugin(config, options)
    // 强制不inline
    config.build.assetsInlineLimit = 0
    injectAssetPlugin(config)
  }
}
