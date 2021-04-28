import { Plugin } from 'vite'

import { VitePluginUniResolvedOptions } from '..'

import { initEnv } from './env'
import { initLogger } from './logger'
import { initOptions } from './options'
import { initPlugins } from './plugins'

export function createConfigResolved(options: VitePluginUniResolvedOptions) {
  return ((config) => {
    initEnv(config)
    initOptions(options, config)
    initPlugins(config, options)

    if (options.command === 'serve') {
      initLogger(config)
    }
  }) as Plugin['configResolved']
}
