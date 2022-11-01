import { Plugin } from 'vite'

import {
  // initPreContext,
  // normalizePath,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '..'
import { createCss } from './css'
import { createResolve } from './resolve'
import { createBuild } from './build'
import { createOptimizeDeps } from './optimizeDeps'
import { createDefine } from './define'

export function createConfig(
  options: VitePluginUniResolvedOptions,
  _uniPlugins: Plugin[]
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
    return {
      base: process.env.UNI_H5_BASE || base,
      root: process.env.VITE_ROOT_DIR,
      // TODO 临时设置为__static__,屏蔽警告：https://github.com/vitejs/vite/blob/824d042535033a5c3d7006978c0d05c201cd1c25/packages/vite/src/node/server/middlewares/transform.ts#L125
      publicDir: config.publicDir || '__static__',
      define: createDefine(options),
      resolve: createResolve(options, config),
      logLevel: config.logLevel || 'warn',
      optimizeDeps: createOptimizeDeps(options),
      build: createBuild(options, config),
      css: createCss(options, config),
      esbuild: {
        include: /\.(tsx?|jsx|uts)$/,
        exclude: /\.js$/,
        loader: 'ts',
      },
    }
  }
}
