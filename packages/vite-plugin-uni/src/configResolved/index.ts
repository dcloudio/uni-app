import path from 'path'
import { Plugin } from 'vite'

import { VitePluginUniResolvedOptions } from '..'
import { resolvePlugins } from './plugins'

export function createConfigResolved(options: VitePluginUniResolvedOptions) {
  return ((config) => {
    options.root = config.root
    options.inputDir = path.resolve(config.root, 'src')
    options.assetsDir = config.build.assetsDir

    resolvePlugins(config.command, config.plugins as Plugin[], options)
  }) as Plugin['configResolved']
}
