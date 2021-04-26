import { Plugin } from 'vite'

import { VitePluginUniResolvedOptions } from '..'

import { initEnv } from './env'
import { initOptions } from './options'
import { initPlugins } from './plugins'

export function createConfigResolved(options: VitePluginUniResolvedOptions) {
  return ((config) => {
    initEnv(config)
    initOptions(options, config)
    initPlugins(config, options)
  }) as Plugin['configResolved']
}
