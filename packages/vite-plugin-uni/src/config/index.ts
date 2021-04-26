import path from 'path'
import { Plugin, UserConfig } from 'vite'

import { normalizePath } from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '..'
import { createCss } from './css'
import { createResolve } from './resolve'
import { createServer } from './server'
import { createBuild } from './build'
import { createOptimizeDeps } from './optimizeDeps'
import { createDefine } from './define'
import { FEATURE_DEFINES } from '../utils'

function normalizeRoot(config: UserConfig) {
  return normalizePath(config.root ? path.resolve(config.root) : process.cwd())
}

function normalizeInputDir(config: UserConfig) {
  return process.env.UNI_INPUT_DIR || path.resolve(normalizeRoot(config), 'src')
}
export function createConfig(
  options: VitePluginUniResolvedOptions
): Plugin['config'] {
  return (config, env) => {
    options.command = env.command
    options.platform = (process.env.UNI_PLATFORM as UniApp.PLATFORM) || 'h5'
    options.inputDir = normalizeInputDir(config)
    const define = createDefine(options, env)
    return {
      define,
      resolve: createResolve(options),
      optimizeDeps: createOptimizeDeps(options),
      server: createServer(options),
      build: createBuild(options, define as FEATURE_DEFINES),
      css: createCss(options),
    }
  }
}
