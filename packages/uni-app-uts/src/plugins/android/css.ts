import type { Plugin, ResolvedConfig } from 'vite'
import path from 'path'
import colors from 'picocolors'

import {
  commonjsProxyRE,
  cssLangRE,
  cssPlugin,
  cssPostPlugin,
  formatAtFilename,
  genUTSClassName,
  generateCodeFrame,
  insertBeforePlugin,
  normalizeNodeModules,
  parseAssets,
  parseVueRequest,
  preUVueCss,
  removePlugins,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { parse } from '@dcloudio/uni-nvue-styler'

import {
  type ResolvedOptions,
  getDescriptor,
  getResolvedOptions,
} from './uvue/descriptorCache'
import { isVue } from './utils'

export function uniAppCssPrePlugin(): Plugin {
  const name = 'uni:app-uvue-css-pre'
  const descriptorOptions: ResolvedOptions = {
    ...getResolvedOptions(),
    sourceMap: false,
  }
  const mainPath = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  return {
    name,
    // 需要提前，因为unocss会在configResolved读取vite:css-post插件
    // 所以需要在它之前做替换
    enforce: 'pre',
    apply: 'build',
    configResolved(config) {
      removePlugins(['vite:css', 'vite:css-post'], config)
      const uvueCssPostPlugin = cssPostPlugin(config, {
        isJsCode: true,
        platform: process.env.UNI_PLATFORM,
        includeComponentCss: false,
        chunkCssFilename(id: string) {
          const { filename } = parseVueRequest(id)
          if (filename === mainPath) {
            // 合并到App
            return `App.uvue.style.uts`
          }
          if (isVue(filename)) {
            return normalizeNodeModules(
              (path.isAbsolute(filename)
                ? path.relative(process.env.UNI_INPUT_DIR, filename)
                : filename) + '.style.uts'
            )
          }
        },
        async chunkCssCode(filename, cssCode) {
          cssCode = parseAssets(config, cssCode)
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
              config.logger.error(colors.red(msg))
            }
          })
          const fileName = filename.replace('.style.uts', '')
          const className =
            process.env.UNI_COMPILE_TARGET === 'ext-api'
              ? // components/map/map.vue => UniMap
                genUTSClassName(
                  path.basename(fileName),
                  descriptorOptions.classNamePrefix
                )
              : genUTSClassName(fileName, descriptorOptions.classNamePrefix)

          return `export const ${className}Styles = ${code}`
        },
      })
      // 增加 css plugins
      // TODO 加密插件
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
  }
}

export function uniAppCssPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:app-uvue-css',
    apply: 'build',
    configResolved(config) {
      resolvedConfig = config
    },
    async transform(source, filename) {
      if (!cssLangRE.test(filename) || commonjsProxyRE.test(filename)) {
        return
      }
      if (filename.endsWith('__uno.css')) {
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
