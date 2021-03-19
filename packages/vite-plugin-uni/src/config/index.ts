import path from 'path'
import { Plugin } from 'vite'

import { VitePluginUniResolvedOptions } from '..'
import { createCss } from './css'
import { createResolve } from './resolve'
import { createDefine } from './define'
import { createServer } from './server'
import { createBuild } from './build'
import { createOptimizeDeps } from './optimizeDeps'

export function createConfig(
  options: VitePluginUniResolvedOptions
): Plugin['config'] {
  return (config, env) => {
    if (config.root) {
      options.root = config.root
    }
    return {
      base: options.base,
      define: createDefine(options, env),
      resolve: createResolve(options),
      optimizeDeps: createOptimizeDeps(options),
      server: createServer(options),
      build: createBuild(options),
      css: createCss(options),
      publicDir: path.join(options.inputDir, 'static'),
    }
  }
}
