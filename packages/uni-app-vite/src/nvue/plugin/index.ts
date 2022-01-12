import path from 'path'
import {
  dynamicImportPolyfill,
  normalizePath,
  parseVueRequest,
  removeExt,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { PreRenderedChunk } from 'rollup'
import { Plugin } from 'vite'
import { nvueOutDir } from '../../utils'
export function uniAppNVuePlugin(): Plugin {
  return {
    name: 'uni:app-nvue',
    config() {
      const inputDir = process.env.UNI_INPUT_DIR
      const mainPath = resolveMainPathOnce(inputDir)
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
