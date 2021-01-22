import { Plugin } from 'vite'

import { VitePluginUniResolvedOptions } from '..'
import { createAlias } from './alias'
import { createDefine } from './define'
import { createServer } from './server'
import { createOptimizeDeps } from './optimizeDeps'
import { createCss } from './css'

export function createConfig(
  options: VitePluginUniResolvedOptions
): Plugin['config'] {
  return () => {
    return {
      define: createDefine(options),
      alias: createAlias(options),
      optimizeDeps: createOptimizeDeps(options),
      server: createServer(options),
      css: createCss(options),
    }
  }
}
