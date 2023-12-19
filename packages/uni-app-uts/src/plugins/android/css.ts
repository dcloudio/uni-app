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
  parseVueRequest,
  resolveMainPathOnce,
  parseAssets,
  preUVueCss,
  normalizeNodeModules,
} from '@dcloudio/uni-cli-shared'
import { parse } from '@dcloudio/uni-nvue-styler'

import { genClassName, isVue } from './utils'
import {
  ResolvedOptions,
  getDescriptor,
  getResolvedOptions,
} from './uvue/descriptorCache'

export function uniAppCssPlugin(): Plugin {
  const mainUTS = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  let resolvedConfig: ResolvedConfig
  const name = 'uni:app-uvue-css'
  const descriptorOptions: ResolvedOptions = {
    ...getResolvedOptions(),
    sourceMap: false,
  }
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
            return normalizeNodeModules(
              path.relative(process.env.UNI_INPUT_DIR, filename) + '.style.uts'
            )
          }
        },
        async chunkCssCode(filename, cssCode) {
          cssCode = parseAssets(resolvedConfig, cssCode)
          const { code, messages } = await parse(cssCode, {
            filename,
            logLevel: 'ERROR',
            mapOf: 'utsMapOf',
            chunk: 100,
            type: 'uvue',
            platform: process.env.UNI_UTS_PLATFORM,
            trim: true,
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
      insertBeforePlugin(
        cssPlugin(config, {
          isAndroidX: true,
          getDescriptor: (filename) => {
            return getDescriptor(filename, descriptorOptions, false)
          },
        }),
        name,
        config
      )
      const plugins = config.plugins as Plugin[]
      const index = plugins.findIndex((p) => p.name === 'uni:app-uvue')
      plugins.splice(index, 0, uvueCssPostPlugin)
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
      return { code: source }
    },
  }
}
