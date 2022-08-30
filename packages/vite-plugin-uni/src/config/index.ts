import fs from 'fs'
import path from 'path'
import { Plugin, PluginOption } from 'vite'

import {
  isInHBuilderX,
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
      worker: {
        plugins: initFixedEsbuildInitTSConfck(process.env.UNI_INPUT_DIR),
      },
      plugins: initFixedEsbuildInitTSConfck(process.env.UNI_NODE_ENV),
    }
  }
}
/**
 * 解决 HBuilderX 项目未包含 package.json 时，initTSConfck 可能导致查找过慢，或递归目录时权限不足报错
 * 即：未包含 package.json 时，直接移除 initTSConfck 相关逻辑
 * @param inputDir
 * @returns
 */
function initFixedEsbuildInitTSConfck(inputDir: string): PluginOption[] {
  if (!isInHBuilderX()) {
    return []
  }
  if (fs.existsSync(path.resolve(inputDir, 'package.json'))) {
    return []
  }
  const initTSConfckPlugins = ['vite:esbuild', 'vite:esbuild-transpile']
  return [
    {
      name: 'fixed-esbuild-initTSConfck',
      enforce: 'pre',
      configResolved(config) {
        initTSConfckPlugins.forEach((name) => {
          const plugin = config.worker.plugins.find((p) => p.name === name)
          if (plugin) {
            delete plugin.configResolved
          }
        })
      },
    },
  ]
}
