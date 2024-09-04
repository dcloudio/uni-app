import path from 'path'
import type { Plugin, UserConfig } from 'vite'

import {
  getPlatformManifestJson,
  isInHBuilderX,
  // initPreContext,
  // normalizePath,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'

import type { VitePluginUniResolvedOptions } from '..'
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
      const manifestJson = parseManifestJsonOnce(options.inputDir)
      const h5 = getPlatformManifestJson(manifestJson, 'h5')
      base = (h5 && h5.router && h5.router.base) || ''
    }
    if (!base) {
      base = '/'
    }
    options.base = base!
    const pluginConfig: UserConfig = {
      base: process.env.UNI_H5_BASE || base,
      root: process.env.VITE_ROOT_DIR,
      // TODO 临时设置为__static__,屏蔽警告：https://github.com/vitejs/vite/blob/824d042535033a5c3d7006978c0d05c201cd1c25/packages/vite/src/node/server/middlewares/transform.ts#L125
      publicDir: config.publicDir || '__static__',
      define: createDefine(options),
      resolve: createResolve(options, config),
      logLevel: config.logLevel || 'warn', // 默认使用 warn 等级，因为 info 等级vite:report 会输出文件列表等信息
      optimizeDeps: createOptimizeDeps(options),
      build: createBuild(options, config),
      css: createCss(options, config),
      esbuild: {
        include: /\.(tsx?|jsx|uts)$/,
        exclude: /\.js$/,
        loader: 'ts',
      },
    }
    if (isInHBuilderX()) {
      pluginConfig.cacheDir = path.resolve(
        process.env.UNI_OUTPUT_DIR,
        '../../cache/.vite'
      )
    }
    return pluginConfig
  }
}
