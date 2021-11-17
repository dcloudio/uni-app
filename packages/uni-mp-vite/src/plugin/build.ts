import fs from 'fs'
import path from 'path'
import debug from 'debug'
import { UserConfig } from 'vite'

import {
  emptyDir,
  EXTNAME_JS_RE,
  normalizePath,
  hasJsonFile,
  removeExt,
  resolveMainPathOnce,
  normalizeMiniProgramFilename,
  isCSSRequest,
} from '@dcloudio/uni-cli-shared'
import { GetManualChunk, GetModuleInfo, Plugin, PreRenderedChunk } from 'rollup'
import {
  isUniComponentUrl,
  isUniPageUrl,
  parseVirtualComponentPath,
  parseVirtualPagePath,
} from '../plugins/entry'

const debugChunk = debug('vite:uni:chunk')

export function buildOptions(): UserConfig['build'] {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // 开始编译时，清空输出目录
  if (fs.existsSync(outputDir)) {
    emptyDir(outputDir)
  }
  return {
    // sourcemap: 'inline', // TODO
    // target: ['chrome53'], // 由小程序自己启用 es6 编译
    emptyOutDir: false, // 不清空输出目录，否则会影响自定义的一些文件输出，比如wxml
    lib: {
      // 必须使用 lib 模式，否则会生成 preload 等代码
      fileName: 'app.js',
      entry: resolveMainPathOnce(inputDir),
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        format: 'cjs',
        manualChunks: createMoveToVendorChunkFn(),
        chunkFileNames: createChunkFileNames(inputDir),
        assetFileNames: '[name][extname]',
        plugins: [dynamicImportPolyfill()],
      },
    },
  }
}

function isVueJs(id: string) {
  return id.includes('plugin-vue:export-helper')
}

const chunkFileNameBlackList = ['main', 'pages.json', 'manifest.json']

function createMoveToVendorChunkFn(): GetManualChunk {
  const cache = new Map<string, boolean>()
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  return (id, { getModuleInfo }) => {
    id = normalizePath(id)
    const filename = id.split('?')[0]
    // 处理项目内的js,ts文件
    if (EXTNAME_JS_RE.test(filename)) {
      if (filename.startsWith(inputDir)) {
        const chunkFileName = removeExt(
          normalizePath(path.relative(inputDir, filename))
        )
        if (
          !chunkFileNameBlackList.includes(chunkFileName) &&
          !hasJsonFile(chunkFileName) // 无同名的page,component
        ) {
          debugChunk(chunkFileName, id)
          return chunkFileName
        }
        return
      }
      // 非项目内的 js 资源，均打包到 vendor
      debugChunk('common/vendor', id)
      return 'common/vendor'
    }
    if (
      isVueJs(id) ||
      (id.includes('node_modules') &&
        !isCSSRequest(id) &&
        staticImportedByEntry(id, getModuleInfo, cache))
    ) {
      debugChunk('common/vendor', id)
      return 'common/vendor'
    }
  }
}

function staticImportedByEntry(
  id: string,
  getModuleInfo: GetModuleInfo,
  cache: Map<string, boolean>,
  importStack: string[] = []
): boolean {
  if (cache.has(id)) {
    return cache.get(id) as boolean
  }
  if (importStack.includes(id)) {
    // circular deps!
    cache.set(id, false)
    return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false
  }

  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some((importer) =>
    staticImportedByEntry(
      importer,
      getModuleInfo,
      cache,
      importStack.concat(id)
    )
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}

function createChunkFileNames(
  inputDir: string
): (chunkInfo: PreRenderedChunk) => string {
  return function chunkFileNames(chunk) {
    if (chunk.isDynamicEntry && chunk.facadeModuleId) {
      let id = chunk.facadeModuleId
      if (isUniPageUrl(id)) {
        id = path.resolve(process.env.UNI_INPUT_DIR, parseVirtualPagePath(id))
      } else if (isUniComponentUrl(id)) {
        id = path.resolve(
          process.env.UNI_INPUT_DIR,
          parseVirtualComponentPath(id)
        )
      }
      return removeExt(normalizeMiniProgramFilename(id, inputDir)) + '.js'
    }
    return '[name].js'
  }
}

function dynamicImportPolyfill(): Plugin {
  return {
    name: 'dynamic-import-polyfill',
    renderDynamicImport() {
      return {
        left: '(',
        right: ')',
      }
    },
  }
}
