import type { ResolvedConfig } from 'vite'
import {
  UniVitePlugin,
  rewriteCompileScriptSetupLangOnce,
} from '@dcloudio/uni-cli-shared'
import { createHandleHotUpdate } from './handleHotUpdate'
import { createTransformIndexHtml } from './transformIndexHtml'
import { createConfigureServer } from './configureServer'
import { createUni } from './uni'

import { createConfig } from './config'

export function uniH5Plugin(): UniVitePlugin {
  const configOptions: {
    resolvedConfig: ResolvedConfig | null
  } = {
    resolvedConfig: null,
  }
  if (process.env.UNI_APP_X === 'true') {
    rewriteCompileScriptSetupLangOnce()
  }
  return {
    name: 'uni:h5',
    uni: createUni(),
    config: createConfig(configOptions),
    configResolved(config) {
      configOptions.resolvedConfig = config
    },
    configureServer: createConfigureServer(),
    handleHotUpdate: createHandleHotUpdate(),
    transformIndexHtml: createTransformIndexHtml(),
  }
}
