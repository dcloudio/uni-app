import type { ResolvedConfig } from 'vite'
import {
  injectH5AssetPlugin,
  injectH5CssPlugin,
  injectH5CssPostPlugin,
  UniVitePlugin,
} from '@dcloudio/uni-cli-shared'
import { createHandleHotUpdate } from './handleHotUpdate'
import { createTransformIndexHtml } from './transformIndexHtml'
import { createConfigureServer } from './configureServer'
import { createUni } from './uni'

import { createConfig } from './config'

export function uniH5PLugin(): UniVitePlugin {
  const configOptions: {
    resolvedConfig: ResolvedConfig | null
  } = {
    resolvedConfig: null,
  }
  return {
    name: 'vite:uni-h5',
    uni: createUni(),
    config: createConfig(configOptions),
    configResolved(config) {
      configOptions.resolvedConfig = config
      // TODO 禁止 optimizeDeps
      ;(config as any).cacheDir = ''

      injectH5AssetPlugin(config)
      injectH5CssPlugin(config)
      injectH5CssPostPlugin(config)
    },
    configureServer: createConfigureServer(),
    handleHotUpdate: createHandleHotUpdate(),
    transformIndexHtml: createTransformIndexHtml(),
  }
}
