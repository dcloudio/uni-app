import path from 'path'
import {
  createTransformTag,
  dynamicImportPolyfill,
  isUniPageSfcFile,
  normalizePath,
  parseVueRequest,
  removeExt,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { PreRenderedChunk } from 'rollup'
import { Plugin } from 'vite'
import { nvueOutDir } from '../../utils'
import { transformRenderWhole } from './transforms/transformRenderWhole'
import { transformAppendAsTree } from './transforms/transformAppendAsTree'
import { transformVideo } from './transforms/transformVideo'
import { transformText } from './transforms/transformText'
import { createConfigResolved } from '../../plugin/configResolved'
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
    createTransformTag(uTags),
    transformText,
    transformVideo,
    transformRenderWhole,
    transformAppendAsTree,
  ]
}

export function uniAppNVuePlugin(): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const mainPath = resolveMainPathOnce(inputDir)
  function normalizeCssChunkFilename(id: string) {
    return removeExt(normalizePath(path.relative(inputDir, id))) + '.css'
  }
  return {
    name: 'uni:app-nvue',
    config() {
      return {
        lib: {
          // 必须使用 lib 模式，否则会生成 preload 等代码
          fileName: 'main.js',
          entry: mainPath,
          formats: ['esm'],
        },
        build: {
          outDir: nvueOutDir(),
          rollupOptions: {
            input: {
              main: mainPath,
            },
            output: {
              entryFileNames(chunk) {
                if (chunk.name === 'main') {
                  return 'app.js'
                }
                return chunk.name + '.js'
              },
              format: 'esm',
              assetFileNames: '[name][extname]',
              chunkFileNames: createChunkFileNames(inputDir),
              plugins: [dynamicImportPolyfill()],
            },
          },
        },
      }
    },
    configResolved: createConfigResolved({
      chunkCssFilename(id: string) {
        if (id === mainPath) {
          return 'app.css'
        } else if (isUniPageSfcFile(id, inputDir)) {
          return normalizeCssChunkFilename(id)
        }
      },
      chunkCssCode(filename, cssCode) {
        if (filename === 'app.css') {
          return cssCode
        }
        return cssCode
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
