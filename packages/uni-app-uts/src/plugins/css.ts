import type { Plugin, ResolvedConfig } from 'vite'
import path from 'path'
import colors from 'picocolors'

import {
  commonjsProxyRE,
  cssLangRE,
  cssPlugin,
  cssPostPlugin,
  formatAtFilename,
  generateCodeFrame,
  insertBeforePlugin,
  normalizePath,
  parseVueRequest,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { parse } from '@dcloudio/uni-nvue-styler'

import { genClassName, isVue } from './utils'

export function uniAppCssPlugin(): Plugin {
  const mainUTS = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  let resolvedConfig: ResolvedConfig
  const name = 'uni:app-uvue-css'
  return {
    name,
    apply: 'build',
    configResolved(config) {
      resolvedConfig = config
      const uvueCssPostPlugin = cssPostPlugin(config, {
        isJsCode: true,
        platform: process.env.UNI_PLATFORM,
        includeComponentCss: false,
        chunkCssFilename(id: string) {
          if (id === mainUTS) {
            return 'App.style.uts'
          }
          const { filename } = parseVueRequest(id)
          if (isVue(filename)) {
            return normalizePath(
              path.relative(process.env.UNI_INPUT_DIR, filename) + '.style.uts'
            )
          }
        },
        async chunkCssCode(filename, cssCode) {
          const { code, messages } = await parse(cssCode, {
            filename,
            logLevel: 'ERROR',
            map: true,
            ts: true,
            chunk: 100,
            type: 'uvue',
            platform: process.env.UNI_UTS_PLATFORM,
          })
          messages.forEach((message) => {
            if (message.type === 'error') {
              let msg = `[plugin:uni:app-uvue-css] ${message.text}`
              if (message.line && message.column) {
                msg += `\n${generateCodeFrame(cssCode, {
                  line: message.line,
                  column: message.column,
                }).replace(/\t/g, ' ')}`
              }
              msg += `\n${formatAtFilename(filename)}`
              resolvedConfig.logger.error(colors.red(msg))
            }
          })
          return `export const ${genClassName(
            filename.replace('.style.uts', '')
          )}Styles = ${code}`
        },
      })
      // 增加 css plugins
      insertBeforePlugin(cssPlugin(config), name, config)
      const plugins = config.plugins as Plugin[]
      const index = plugins.findIndex((p) => p.name === 'uni:app-uvue')
      plugins.splice(index, 0, uvueCssPostPlugin)
    },
    async transform(source, filename) {
      if (!cssLangRE.test(filename) || commonjsProxyRE.test(filename)) {
        return
      }
      // 仅做校验使用
      const { messages } = await parse(source, {
        filename,
        logLevel: 'WARNING',
        map: true,
        ts: true,
        noCode: true,
        type: 'uvue',
        platform: process.env.UNI_UTS_PLATFORM,
      })
      messages.forEach((message) => {
        if (message.type === 'warning') {
          let msg = `[plugin:uni:app-uvue-css] ${message.text}`
          if (message.line && message.column) {
            msg += `\n${generateCodeFrame(source, {
              line: message.line,
              column: message.column,
            }).replace(/\t/g, ' ')}`
          }
          msg += `\n${formatAtFilename(filename)}`
          resolvedConfig.logger.warn(colors.yellow(msg))
        }
      })
      return { code: source }
    },
  }
}
