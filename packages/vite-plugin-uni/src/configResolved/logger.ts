import { ResolvedConfig } from 'vite'

export function initLogger({ logger }: ResolvedConfig) {
  const { info } = logger
  logger.info = (msg, opts) => {
    // 兼容 HBuilderX 日志输出协议（可以让 HBuilderX 读取到 server 地址，自动打开浏览器）
    if (msg && (msg.includes(' > Local:') || msg.includes(' > Network:'))) {
      msg = msg.replace('>', '-')
    }
    return info(msg, opts)
  }
}
