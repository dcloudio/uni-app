import type { Plugin, ResolvedConfig } from 'vite'
import fs from 'fs-extra'
import path from 'path'
import crypto from 'crypto'
import colors from 'picocolors'

import {
  SPECIAL_CHARS,
  commonjsProxyRE,
  cssLangRE,
  cssPlugin,
  cssPostPlugin,
  formatAtFilename,
  genDom2ClassName,
  generateCodeFrame,
  insertBeforePlugin,
  parseAssets,
  parseVueRequest,
  preUVueCss,
  removePlugins,
  resolveAppVue,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import {
  type DOM2_APP_PLATFORM,
  DOM2_APP_TARGET,
  parse,
} from '@dcloudio/uni-nvue-styler'

import { isVue } from '../utils'

export function uniAppCssPrePlugin(): Plugin {
  const name = 'uni:app-uvue-css-pre'
  const mainPath = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  const appUVuePath = resolveAppVue(process.env.UNI_INPUT_DIR)
  const cssCodeCache = new Map<string, string>()
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
        preserveModules: true,
        chunkCssFilename(id: string) {
          const { filename } = parseVueRequest(id)
          if (filename === mainPath || filename === appUVuePath) {
            // 合并到App
            return `GenApp.style.cpp`
          }
          if (isVue(filename)) {
            return (
              genDom2ClassName(filename, process.env.UNI_INPUT_DIR) +
              'SharedData.style.cpp'
            )
          }
        },
        async chunkCssCode(filename, cssCode) {
          cssCode = parseAssets(config, cssCode)
          const { code, messages } = await parse(cssCode, {
            dom2: {
              platform: process.env.UNI_UTS_PLATFORM as DOM2_APP_PLATFORM,
              target: DOM2_APP_TARGET.DOM_C,
            },
            filename,
            logLevel: 'WARNING',
            type: 'uvue',
            platform: process.env.UNI_UTS_PLATFORM,
          })
          messages.forEach((message) => {
            if (message.type === 'error') {
              console.error(
                SPECIAL_CHARS.ERROR_BLOCK +
                  `[plugin:uni:app-uvue-css] ${message.text}`
              )
              let msg = formatAtFilename(filename)
              if (message.line && message.column) {
                msg += `\n${generateCodeFrame(cssCode, {
                  line: message.line,
                  column: message.column,
                }).replace(/\t/g, ' ')}`
              }
              console.error(msg + SPECIAL_CHARS.ERROR_BLOCK)
            }
          })
          return code
        },
        emitFile(filename, cssCode) {
          if (filename === 'GenApp.style.cpp') {
            // TODO 暂不处理
            return
          }
          const className = filename.replace('.style.cpp', '')
          const hash = md5(cssCode)
          // 判断是否发生变化
          if (cssCodeCache.get(className) === hash) {
            return
          }
          cssCodeCache.set(className, hash)
          process.env.UNI_APP_X_DOM2_CPP_CHANGED = 'true'
          fs.outputFileSync(
            path.resolve(process.env.UNI_APP_HARMONY_DOM2_CPP_DIR!, filename),
            `#include "${className}.h"
vue::css::UniStyleSheetMap ${className}::_styleSheet = ${cssCode};`
          )
        },
      })
      // 增加 css plugins
      // TODO 加密插件
      insertBeforePlugin(cssPlugin(config), name, config)
      const plugins = config.plugins as Plugin[]
      const index = plugins.findIndex((p) => p.name === 'uni:app-uvue')
      plugins.splice(index, 0, uvueCssPostPlugin)
    },
  }
}

function md5(code: string) {
  return crypto.createHash('md5').update(code).digest('hex')
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
        source = preUVueCss(source, filename)
      }
      source = parseAssets(resolvedConfig, source)
      // 仅做校验使用
      const { messages } = await parse(source, {
        dom2: {
          platform: process.env.UNI_UTS_PLATFORM as DOM2_APP_PLATFORM,
          target: DOM2_APP_TARGET.DOM_C,
        },
        filename,
        logLevel: 'WARNING',
        type: 'uvue',
        platform: process.env.UNI_UTS_PLATFORM,
      })
      messages.forEach((message) => {
        if (message.type === 'warning') {
          // 拆分成多行，第一行输出信息（有颜色），后续输出错误代码+文件行号
          console.warn(
            SPECIAL_CHARS.WARN_BLOCK +
              colors.yellow(`[plugin:uni:app-uvue-css] ${message.text}`)
          )
          let msg = formatAtFilename(filename)
          if (message.line && message.column) {
            msg += `\n${generateCodeFrame(source, {
              line: message.line,
              column: message.column,
            }).replace(/\t/g, ' ')}\n`
          }
          console.log(msg + SPECIAL_CHARS.WARN_BLOCK)
        }
      })
      return {
        code: source,
        map: {
          mappings: '',
        },
      }
    },
  }
}
