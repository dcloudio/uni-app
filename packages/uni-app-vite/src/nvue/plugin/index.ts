import type { PreRenderedChunk } from 'rollup'
import type { Plugin } from 'vite'
import path from 'path'
import colors from 'picocolors'
import { defaultNVueRpx2Unit } from '@dcloudio/uni-shared'
import {
  APP_SERVICE_FILENAME,
  commonjsProxyRE,
  createTransformTag,
  cssLangRE,
  dynamicImportPolyfill,
  generateCodeFrame,
  initPostcssPlugin,
  normalizePath,
  parseVueRequest,
  removeExt,
  resolveMainPathOnce,
  formatAtFilename,
} from '@dcloudio/uni-cli-shared'
import { parse } from '@dcloudio/uni-nvue-styler'
import { nvueOutDir } from '../../utils'
// import { transformRenderWhole } from './transforms/transformRenderWhole'
// import { transformAppendAsTree } from './transforms/transformAppendAsTree'
import { transformVideo } from './transforms/transformVideo'
import { transformText } from './transforms/transformText'
import { createConfigResolved } from '../../plugin/configResolved'
import { external, globals } from '../utils'
import { transformRootNode } from './transforms/transformRootNode'
import { transformModel } from './transforms/vModel'
import { transformShow } from './transforms/vShow'
import { transformAttrs } from './transforms/transformAttrs'
import { nvuePagesCache } from '../plugins/pagesJson'
import { transformUTSComponent } from './transforms/transformUTSComponent'

const uTags = {
  text: 'u-text',
  image: 'u-image',
  input: 'u-input',
  textarea: 'u-textarea',
  video: 'u-video',
  'web-view': 'u-web-view',
  slider: 'u-slider',
}

export function initNVueNodeTransforms() {
  // 优先级必须确保 renderWhole > appendAsTree
  return [
    transformRootNode,
    createTransformTag(uTags),
    transformAttrs,
    transformText,
    transformVideo,
    transformUTSComponent,
    // transformRenderWhole,
    // transformAppendAsTree,
  ]
}

export function initNVueDirectiveTransforms() {
  return {
    model: transformModel,
    show: transformShow,
  }
}

export function uniAppNVuePlugin({
  appService,
}: {
  appService: boolean
}): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const mainPath = resolveMainPathOnce(inputDir)
  return {
    name: 'uni:app-nvue',
    config() {
      return {
        css: {
          postcss: {
            plugins: initPostcssPlugin({
              uniApp: defaultNVueRpx2Unit,
              autoprefixer: false,
            }),
          },
        },
        build: {
          lib: {
            name: 'AppService',
            // 必须使用 lib 模式，否则会生成 preload 等代码
            fileName: appService ? 'app-service' : 'app',
            entry: mainPath,
            formats: [appService ? 'iife' : 'es'],
          },
          outDir: appService ? process.env.UNI_OUTPUT_DIR : nvueOutDir(),
          rollupOptions: {
            external: external(appService),
            output: {
              entryFileNames(chunk) {
                if (chunk.name === 'main' && chunk.isEntry) {
                  return appService ? APP_SERVICE_FILENAME : 'app.js'
                }
                return chunk.name + '.js'
              },
              chunkFileNames: createChunkFileNames(inputDir),
              plugins: [dynamicImportPolyfill(true)],
              globals: globals(appService),
            },
          },
        },
      }
    },
    configResolved: createConfigResolved({
      createCssPostPlugin(config) {
        return {
          name: 'vite:css-post',
          buildStart() {
            // 用于覆盖原始插件方法
            // noop
          },
          async transform(source, filename) {
            if (!cssLangRE.test(filename) || commonjsProxyRE.test(filename)) {
              return
            }
            const nvuePages = nvuePagesCache.get(config)
            if (!nvuePages || !Object.keys(nvuePages).length) {
              // 当前项目没有 nvue 文件
              return { code: `export default {}`, map: { mappings: '' } }
            }
            const { code, messages } = await parse(source, {
              filename,
              logLevel: 'WARNING',
            })
            messages.forEach((message) => {
              if (message.type === 'warning') {
                config.logger.warn(
                  colors.yellow(`[plugin:vite:nvue-css] ${message.text}`)
                )
                let msg = ''
                if (message.line && message.column) {
                  msg += `\n${generateCodeFrame(source, {
                    line: message.line,
                    column: message.column,
                  })}\n`
                }
                msg += `${formatAtFilename(filename)}`
                config.logger.warn(msg)
              }
            })
            return { code: `export default ${code}`, map: { mappings: '' } }
          },
          generateBundle() {
            // 用于覆盖原始插件方法
            // noop
          },
        }
      },
    }),
  }
}

function createChunkFileNames(
  inputDir: string
): (chunkInfo: PreRenderedChunk) => string {
  return function chunkFileNames(chunk) {
    if (chunk.isDynamicEntry && chunk.facadeModuleId) {
      const { filename } = parseVueRequest(chunk.facadeModuleId)
      if (filename.endsWith('.nvue')) {
        return (
          removeExt(normalizePath(path.relative(inputDir, filename))) + '.js'
        )
      }
    }
    return '[name].js'
  }
}
