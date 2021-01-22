import path from 'path'
import { Plugin, UserConfig } from 'vite'

import { VitePluginUniResolvedOptions } from '..'
import { resolvePlugins } from './plugins'

export function createConfigResolved(options: VitePluginUniResolvedOptions) {
  return ((config) => {
    options.root = config.root
    options.inputDir = path.resolve(config.root, 'src')
    resolvePlugins((config as unknown) as UserConfig, options)
  }) as Plugin['configResolved']
}
