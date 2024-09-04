import type { Plugin } from 'vite'
import {
  getPlatformManifestJson,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'

import type { VitePluginUniResolvedOptions } from '../..'
import { createDefine } from '../../config/define'
import { createResolve } from '../../config/resolve'
import { createCss } from '../../config/css'
import { initLogger } from '../../configResolved'
export function uniUVuePlugin(options: VitePluginUniResolvedOptions): Plugin {
  return {
    name: 'uni:uvue',
    config(config, env) {
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
      return {
        base: process.env.UNI_H5_BASE || base,
        root: process.env.VITE_ROOT_DIR,
        // TODO 临时设置为__static__,屏蔽警告：https://github.com/vitejs/vite/blob/824d042535033a5c3d7006978c0d05c201cd1c25/packages/vite/src/node/server/middlewares/transform.ts#L125
        publicDir: config.publicDir || '__static__',
        define: createDefine(options),
        resolve: createResolve(options, config),
        logLevel: config.logLevel || 'warn', // 默认使用 warn 等级，因为 info 等级vite:report 会输出文件列表等信息
        optimizeDeps: {
          noDiscovery: true,
          include: [],
        },
        css: createCss(options, config),
      }
    },
    configResolved(config) {
      initLogger(config)
    },
  }
}
