import { ResolvedConfig } from 'vite'
import { UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { uniCssPlugin } from './plugins/css'
import { uniCssScopedPlugin } from './plugins/cssScoped'
import { uniInjectPlugin } from './plugins/inject'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniResolveIdPlugin } from './plugins/resolveId'

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
  configResolved(config) {
    initLogger(config)
  },
}

export default [
  uniCssScopedPlugin(),
  uniResolveIdPlugin(),
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  uniInjectPlugin(),
  uniCssPlugin(),
  UniH5Plugin,
]
