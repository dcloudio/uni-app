import fs from 'fs'
import path from 'path'
import debug from 'debug'
import type { BuildOptions, UserConfig } from 'vite'

import {
  DEFAULT_ASSETS_RE,
  EXTNAME_JS_RE,
  M,
  dynamicImportPolyfill,
  emptyDir,
  // enableSourceMap,
  hasJsonFile,
  isCSSRequest,
  // isEnableConsole,
  isMiniProgramAssetFile,
  normalizeMiniProgramFilename,
  normalizePath,
  parseManifestJsonOnce,
  removeExt,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import type { GetManualChunk, GetModuleInfo, PreRenderedChunk } from 'rollup'
import {
  isUniComponentUrl,
  isUniPageUrl,
  parseVirtualComponentPath,
  parseVirtualPagePath,
} from '../plugins/entry'

const debugChunk = debug('uni:chunk')

export function buildOptions(): UserConfig['build'] {
  const platform = process.env.UNI_PLATFORM
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // 开始编译时，清空输出目录
  if (fs.existsSync(outputDir)) {
    emptyDir(outputDir, ['project.config.json', 'project.private.config.json'])
  }
  return createBuildOptions(inputDir, platform)
}

export function createBuildOptions(
  inputDir: string,
  platform: UniApp.PLATFORM
): BuildOptions {
  const { renderDynamicImport } = dynamicImportPolyfill()
  return {
    // TODO 待优化，不同小程序平台sourcemap处理逻辑可能不同
    // TODO 目前存在两层sourcemap，一层是vite的，一层是小程序的，目前拿不到小程序的sourcemap，导致没法还原到源码，所以暂时不默认启用
    // sourcemap: isEnableConsole() && enableSourceMap(),
    // target: ['chrome53'], // 由小程序自己启用 es6 编译
    emptyOutDir: false, // 不清空输出目录，否则会影响自定义的一些文件输出，比如wxml
    lib: {
      // 必须使用 lib 模式，否则会生成 preload 等代码
      fileName: 'app.js',
      entry: resolveMainPathOnce(inputDir),
      formats: ['cjs'],
    },
    rollupOptions: {
      input: parseRollupInput(inputDir, platform),
      output: {
        sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
          let [, modulePath] = relativeSourcePath.split('/node_modules/')
          if (modulePath) {
            return `node_modules/${modulePath}`
          }
          let [, base64] = relativeSourcePath.split('/uniPage:/')
          if (base64) {
            return parseVirtualPagePath(base64) + '?type=page'
          }
          ;[, base64] = relativeSourcePath.split('/uniComponent:/')
          if (base64) {
            return parseVirtualComponentPath(base64) + '?type=component'
          }
          return normalizePath(
            path.relative(
              process.env.UNI_INPUT_DIR,
              path.resolve(path.dirname(sourcemapPath), relativeSourcePath)
            )
          )
        },
        entryFileNames(chunk) {
          if (chunk.name === 'main') {
            return 'app.js'
          }
          return chunk.name + '.js'
        },
        format: 'cjs',
        manualChunks: createMoveToVendorChunkFn(),
        chunkFileNames: createChunkFileNames(inputDir),
        plugins: [
          {
            name: 'dynamic-import-polyfill',
            renderDynamicImport(options) {
              const { targetModuleId } = options
              if (targetModuleId && isMiniProgramAssetFile(targetModuleId)) {
                return {
                  left: 'Promise.resolve(require(',
                  right: '))',
                }
              }
              return (renderDynamicImport as Function).call(this, options)
            },
          },
        ],
      },
    },
  }
}

function parseRollupInput(inputDir: string, platform: UniApp.PLATFORM) {
  const inputOptions: Record<string, string> = {
    app: resolveMainPathOnce(inputDir),
  }
  if (process.env.UNI_MP_PLUGIN) {
    return inputOptions
  }
  const manifestJson = parseManifestJsonOnce(inputDir)
  const plugins = manifestJson[platform]?.plugins || {}
  Object.keys(plugins).forEach((name) => {
    const pluginExport = plugins[name].export
    if (!pluginExport) {
      return
    }
    const pluginExportFile = path.resolve(inputDir, pluginExport)
    if (!fs.existsSync(pluginExportFile)) {
      notFound(pluginExportFile)
    }
    inputOptions[removeExt(pluginExport)] = pluginExportFile
  })
  return inputOptions
}

function isVueJs(id: string) {
  return id.includes('\0plugin-vue:export-helper')
}

const chunkFileNameBlackList = ['main', 'pages.json', 'manifest.json']

function createMoveToVendorChunkFn(): GetManualChunk {
  const cache = new Map<string, boolean>()
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  return (id, { getModuleInfo }) => {
    const normalizedId = normalizePath(id)
    const filename = normalizedId.split('?')[0]
    // 处理资源文件
    if (DEFAULT_ASSETS_RE.test(filename)) {
      debugChunk('common/assets', normalizedId)
      return 'common/assets'
    }
    // 处理项目内的js,ts文件
    if (EXTNAME_JS_RE.test(filename)) {
      if (filename.startsWith(inputDir) && !filename.includes('node_modules')) {
        const chunkFileName = removeExt(
          normalizePath(path.relative(inputDir, filename))
        )
        if (
          !chunkFileNameBlackList.includes(chunkFileName) &&
          !hasJsonFile(chunkFileName) // 无同名的page,component
        ) {
          debugChunk(chunkFileName, normalizedId)
          return chunkFileName
        }
        return
      }
      // 非项目内的 js 资源，均打包到 vendor
      debugChunk('common/vendor', normalizedId)
      return 'common/vendor'
    }
    if (
      isVueJs(normalizedId) ||
      (normalizedId.includes('node_modules') &&
        !isCSSRequest(normalizedId) &&
        // 使用原始路径，格式化的可能找不到模块信息 https://github.com/dcloudio/uni-app/issues/3425
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

export function notFound(filename: string): never {
  console.log()
  console.error(M['file.notfound'].replace('{file}', filename))
  console.log()
  process.exit(0)
}
