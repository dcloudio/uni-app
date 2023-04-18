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
  normalizePath,
  parseVueRequest,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { parse } from '@dcloudio/uni-nvue-styler'

import { genClassName, isVue } from './utils'

export function uniAppCssPlugin(): Plugin {
  const mainUTS = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:app-uvue-css',
    apply: 'build',
    configResolved(config) {
      resolvedConfig = config
      const plugins = config.plugins as Plugin[]
      // 增加 css plugins
      plugins.push(cssPlugin(config))
      const uvueCssPostPlugin = cssPostPlugin(config, {
        isJsCode: true,
        platform: process.env.UNI_PLATFORM,
        chunkCssFilename(id: string) {
          if (id === mainUTS) {
            return 'App.vue.style.uts'
          }
          const { filename } = parseVueRequest(id)
          if (isVue(filename)) {
            return normalizePath(
              path.relative(process.env.UNI_INPUT_DIR, filename) + '.style.uts'
            )
          }
        },
        chunkCssCode(filename, cssCode) {
          return (
            `export const ${genClassName(
              filename.replace('.style.uts', '')
            )}Styles = ` + cssCode
          )
        },
      })
      plugins.push(uvueCssPostPlugin)
    },
    async transform(source, filename) {
      if (!cssLangRE.test(filename) || commonjsProxyRE.test(filename)) {
        return
      }
      const { code, messages } = await parse(source, {
        filename,
        logLevel: 'WARNING',
        map: true,
        ts: true,
      })
      messages.forEach((message) => {
        if (message.type === 'warning') {
          let msg = `[plugin:uni:app-uvue-css] ${message.text}`
          if (message.line && message.column) {
            msg += `\n${generateCodeFrame(source, {
              line: message.line,
              column: message.column,
            })}`
          }
          msg += `\n${formatAtFilename(filename)}`
          resolvedConfig.logger.warn(colors.yellow(msg))
        }
      })
      return { code, map: { mappings: '' } }
    },
  }
}
