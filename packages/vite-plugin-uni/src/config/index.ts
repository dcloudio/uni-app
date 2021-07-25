import { Plugin } from 'vite'

import {
  // initPreContext,
  // normalizePath,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '..'
import { createCss } from './css'
import { createResolve } from './resolve'
import { createServer } from './server'
import { createBuild } from './build'
import { createOptimizeDeps } from './optimizeDeps'
import { createDefine } from './define'

import {
  initPluginViteLegacyOptions,
  initPluginVueJsxOptions,
  initPluginVueOptions,
} from '../vue'

// function normalizeRoot(config: UserConfig) {
//   return normalizePath(config.root ? path.resolve(config.root) : process.cwd())
// }

// function normalizeInputDir(config: UserConfig) {
//   return process.env.UNI_INPUT_DIR || path.resolve(normalizeRoot(config), 'src')
// }

export function createConfig(
  options: VitePluginUniResolvedOptions,
  uniPlugins: Plugin[]
): Plugin['config'] {
  return (config, env) => {
    options.command = env.command

    let base = config.base
    if (!base) {
      const { h5 } = parseManifestJsonOnce(options.inputDir)
      base = (h5 && h5.router && h5.router.base) || ''
    }
    if (!base) {
      base = '/'
    }
    options.base = base!
    // TODO 似乎没必要
    options.vueOptions = initPluginVueOptions(options, uniPlugins)
    options.vueJsxOptions = initPluginVueJsxOptions(options)
    options.viteLegacyOptions = initPluginViteLegacyOptions(options)

    return {
      base,
      root: process.env.VITE_ROOT_DIR,
      publicDir: config.publicDir || false,
      define: createDefine(options),
      resolve: createResolve(options, config),
      optimizeDeps: createOptimizeDeps(options),
      server: createServer(options),
      build: createBuild(options),
      css: createCss(options),
    }
  }
}
