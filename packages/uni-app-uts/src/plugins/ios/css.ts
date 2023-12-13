import type { Plugin, ResolvedConfig } from 'vite'
import colors from 'picocolors'

import {
  commonjsProxyRE,
  cssLangRE,
  formatAtFilename,
  generateCodeFrame,
  parseAssets,
  preUVueCss,
} from '@dcloudio/uni-cli-shared'
import { parse } from '@dcloudio/uni-nvue-styler'

export function uniAppCssPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig

  return {
    name: 'vite:css-post',
    configResolved(config) {
      resolvedConfig = config
    },
    buildStart() {
      // 用于覆盖原始插件方法
      // noop
    },
    async transform(source, filename) {
      if (!cssLangRE.test(filename) || commonjsProxyRE.test(filename)) {
        return
      }
      if (source.includes('#endif')) {
        source = preUVueCss(source)
      }
      source = parseAssets(resolvedConfig, source)
      // 仅做校验使用
      const { messages, code } = await parse(source, {
        filename,
        logLevel: 'WARNING',
        type: 'uvue',
        platform: process.env.UNI_UTS_PLATFORM,
      })
      messages.forEach((message) => {
        if (message.type === 'warning') {
          // 拆分成多行，第一行输出信息（有颜色），后续输出错误代码+文件行号
          resolvedConfig.logger.warn(
            colors.yellow(`[plugin:uni:app-uvue-css] ${message.text}`)
          )
          let msg = ''
          if (message.line && message.column) {
            msg += `\n${generateCodeFrame(source, {
              line: message.line,
              column: message.column,
            }).replace(/\t/g, ' ')}\n`
          }
          msg += `${formatAtFilename(filename)}`
          resolvedConfig.logger.warn(msg)
        }
      })
      return { code: `export default ${code}`, map: { mappings: '' } }
    },
    generateBundle() {
      // 用于覆盖原始插件方法
      // noop
    },
  }
}
