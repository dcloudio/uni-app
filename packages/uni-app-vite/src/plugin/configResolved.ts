import type { Plugin, ResolvedConfig } from 'vite'

import {
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
} from '@dcloudio/uni-cli-shared'

export function createConfigResolved({
  createCssPostPlugin,
}: {
  createCssPostPlugin: (config: ResolvedConfig) => Plugin
}): Plugin['configResolved'] {
  return (config) => {
    injectCssPlugin(config)
    injectCssPostPlugin(config, createCssPostPlugin(config))
    // 强制不inline
    config.build.assetsInlineLimit = 0
    injectAssetPlugin(config)
  }
}
