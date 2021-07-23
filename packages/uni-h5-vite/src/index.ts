import { ResolvedConfig } from 'vite'
import { UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { uniCssPlugin } from './plugins/css'
import { uniCssScopedPlugin } from './plugins/cssScoped'
import { uniInjectPlugin } from './plugins/inject'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniResolveIdPlugin } from './plugins/resolveId'
import { uniSetupPlugin } from './plugins/setup'
import { uniSSRPlugin } from './plugins/ssr'

import { createDefine } from './utils'
import { createHandleHotUpdate } from './handleHotUpdate'
import { createTransformIndexHtml } from './transformIndexHtml'

function initLogger({ logger, command }: ResolvedConfig) {
  if (command !== 'serve') {
    return
  }
  const { info } = logger
  logger.info = (msg, opts) => {
    // 兼容 HBuilderX 日志输出协议（可以让 HBuilderX 读取到 server 地址，自动打开浏览器）
    if (msg && (msg.includes(' > Local:') || msg.includes(' > Network:'))) {
      msg = msg.replace('>', '-')
    }
    return info(msg, opts)
  }
}

const UniH5Plugin: UniVitePlugin = {
  name: 'vite:uni-h5',
  uni: {
    transformEvent: {
      tap: 'click',
    },
  },
  config(config, env) {
    return {
      optimizeDeps: {
        exclude: ['@dcloudio/uni-h5', '@dcloudio/uni-h5-vue'],
      },
      define: createDefine(env.command, config),
    }
  },
  configResolved(config) {
    initLogger(config)
    // TODO 禁止 optimizeDeps
    ;(config as any).cacheDir = ''
  },
  handleHotUpdate: createHandleHotUpdate(),
  transformIndexHtml: createTransformIndexHtml(),
}

export default [
  uniCssScopedPlugin(),
  uniResolveIdPlugin(),
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  uniInjectPlugin(),
  uniCssPlugin(),
  uniSSRPlugin(),
  uniSetupPlugin(),
  UniH5Plugin,
]
