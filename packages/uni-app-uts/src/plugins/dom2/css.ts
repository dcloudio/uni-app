import type { Plugin, ResolvedConfig } from 'vite'

import {
  JS_STYLE_PLACEHOLDER_MARKER,
  JS_STYLE_PLACEHOLDER_RE,
  commonjsProxyRE,
  cssLangRE,
  cssPlugin,
  cssPostPlugin,
  insertBeforePlugin,
  normalizePath,
  onCompileLog,
  parseAssets,
  parseVueRequest,
  preUVueCss,
  removePlugins,
  requireUniHelpers,
  resolveAppVue,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import {
  type SourceMapInput,
  TraceMap,
  originalPositionFor,
  sourceContentFor,
} from '@jridgewell/trace-mapping'

import { DOM2_CSS_CACHE_MAP, isVue } from '../utils'

const CSS_FILE_ID_MAP = new Map<string, string>()

export function uniAppCssPrePlugin(): Plugin {
  const name = 'uni:app-uvue-css-pre'
  const mainPath = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  const appUVuePath = resolveAppVue(process.env.UNI_INPUT_DIR)
  const { parseCss } = require('@dcloudio/compiler-vapor-dom2')
  return {
    name,
    // 需要提前，因为unocss会在configResolved读取vite:css-post插件
    // 所以需要在它之前做替换
    enforce: 'pre',
    apply: 'build',
    configResolved(config) {
      removePlugins(['vite:css', 'vite:css-post'], config)
      // 强制启用 css source map
      config.css.devSourcemap = true
      const uvueCssPostPlugin = cssPostPlugin(config, {
        isJsCode: true,
        platform: process.env.UNI_PLATFORM,
        includeComponentCss: false,
        preserveModules: true,
        chunkCssFilename(id: string) {
          // 暂不支持多style标签
          const { filename } = parseVueRequest(id)
          if (filename === mainPath || filename === appUVuePath) {
            // 合并到App
            CSS_FILE_ID_MAP.set(`App.uvue`, id)
            return `App.uvue`
          }
          if (isVue(filename)) {
            CSS_FILE_ID_MAP.set(filename, id)
            return filename
          }
        },
        async chunkCssCode(filename, cssCode) {
          // filename
          cssCode = parseAssets(config, cssCode)
          const { code, messages, fontFaces } = await parseCss(cssCode, {
            platform: process.env.UNI_UTS_PLATFORM,
            helper: requireUniHelpers(),
          })
          const isDom2Harmony =
            process.env.UNI_APP_X_DOM2 === 'true' &&
            process.env.UNI_UTS_PLATFORM === 'app-harmony'
          if (isDom2Harmony && fontFaces) {
            const id = CSS_FILE_ID_MAP.get(filename)
            if (id) {
              const cloneFontFaces = fontFaces.reduce(
                (acc: any[], cur: any) => {
                  const clone = { ...cur }
                  if (!clone.fontFamily) {
                    clone.fontFamily = cur['font-family']
                    delete clone['font-family']
                  }
                  acc.push(clone)
                  return acc
                },
                [] as any[]
              )
              DOM2_CSS_CACHE_MAP.set(
                id,
                cloneFontFaces.length
                  ? JSON.stringify({ '@FONT-FACE': cloneFontFaces })
                  : '{}'
              )
            }
          }
          messages.forEach((message) => {
            if (message.type === 'error') {
              onCompileLog(
                'error',
                { name: 'CSSError', message: message.text },
                cssCode,
                filename,
                {
                  plugin: 'uni:app-uvue-css',
                  line: message.line,
                  column: message.column,
                }
              )
            }
          })
          return code
        },
        emitFile(filename, cssCode) {
          const { ASDSF } = requireUniHelpers()
          ASDSF(normalizePath(filename), cssCode)
        },
      })
      const uvueCssInlinePostPlugin: Plugin = {
        name: 'uni:app-uvue-css-inline-post',
        apply: 'build',
        generateBundle(_, bundle) {
          // 暂时保留此条件容错
          const isDom2Harmony =
            process.env.UNI_APP_X_DOM2 === 'true' &&
            process.env.UNI_UTS_PLATFORM === 'app-harmony'
          if (isDom2Harmony) {
            Object.entries(bundle).forEach(([file, asset]) => {
              // 不支持多style标签
              if (asset.type === 'chunk') {
                let fontFaces: string | undefined
                for (let i = 0; i < asset.moduleIds.length; i++) {
                  const moduleId = asset.moduleIds[i]
                  if (DOM2_CSS_CACHE_MAP.has(moduleId)) {
                    fontFaces = DOM2_CSS_CACHE_MAP.get(moduleId)
                    DOM2_CSS_CACHE_MAP.delete(moduleId)
                    break
                  }
                }
                if (fontFaces) {
                  asset.code = asset.code.replace(
                    JS_STYLE_PLACEHOLDER_RE,
                    fontFaces
                  )
                } else if (asset.code.includes(JS_STYLE_PLACEHOLDER_MARKER)) {
                  asset.code = asset.code.replace(JS_STYLE_PLACEHOLDER_RE, '{}')
                }
              }
            })
          }
        },
      }
      // 增加 css plugins
      // TODO 加密插件
      insertBeforePlugin(cssPlugin(config), name, config)
      const plugins = config.plugins as Plugin[]
      // 重要：必须放到 unplugin-auto-import、uni:sd 前
      const index = plugins.findIndex((p) => p.name === 'unplugin-auto-import')
      plugins.splice(index, 0, uvueCssPostPlugin)
      const isDom2Harmony =
        process.env.UNI_APP_X_DOM2 === 'true' &&
        process.env.UNI_UTS_PLATFORM === 'app-harmony'
      if (isDom2Harmony) {
        plugins.splice(index + 1, 0, uvueCssInlinePostPlugin)
      }
    },
  }
}

export function uniAppCssPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  const { parseCss } = require('@dcloudio/compiler-vapor-dom2')
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
      const { messages } = await parseCss(source, {
        platform: process.env.UNI_UTS_PLATFORM,
        helper: requireUniHelpers(),
      })
      let cssSourceMap: SourceMapInput | undefined
      if (messages.find((m) => m.type === 'warning')) {
        const moduleInfo = this.getModuleInfo(filename)
        cssSourceMap = moduleInfo?.meta.uni?.cssSourceMap
      }
      const sourceMap: TraceMap = (
        cssSourceMap ? new TraceMap(cssSourceMap) : undefined
      ) as TraceMap
      messages.forEach((message) => {
        if (message.type === 'warning') {
          // 拆分成多行，第一行输出信息（有颜色），后续输出错误代码+文件行号
          const originalPos = originalPositionFor(sourceMap, {
            line: message.line,
            column: message.column,
          })
          let code = source
          let line = message.line
          let column = message.column
          if (originalPos.source) {
            const sourceContent = sourceContentFor(
              sourceMap,
              originalPos.source
            )
            if (sourceContent) {
              code = sourceContent
              line = originalPos.line
              column = originalPos.column
            }
          }
          onCompileLog(
            'warn',
            { name: 'CSSWarning', message: message.text },
            code,
            filename,
            {
              plugin: 'uni:app-uvue-css',
              line,
              column,
            }
          )
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
