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
  enableSourceMap,
  getWorkersRootDirs,
  hasJsonFile,
  isCSSRequest,
  isEnableConsole,
  isMiniProgramAssetFile,
  isUniAppX,
  normalizeMiniProgramFilename,
  normalizePath,
  parseIndependentSubPackages,
  parseJson,
  parseManifestJsonOnce,
  parsePagesJson,
  removeExt,
  resolveMainPathOnce,
  resolveMiniProgramComponentPackageRoot,
  resolveWorkersRootDir,
} from '@dcloudio/uni-cli-shared'
import type { GetManualChunk, GetModuleInfo, PreRenderedChunk } from 'rollup'
import {
  getSubPackageRootByFilename,
  getSubPackages,
  isUniComponentUrl,
  isUniPageUrl,
  normalizeMiniProgramComponentFilename,
  parseVirtualComponentPathInfo,
  parseVirtualPagePathInfo,
} from '../plugins/entry'
import {
  INDEPENDENT_MAIN_PREFIX,
  VUE_EXPORT_HELPER_ID,
  formatIndependentVirtualId,
  initIndependentSubPackages,
  isAppPagesJson,
  parseIndependentRoot,
  withoutIndependentRoot,
} from '../plugins/independentUtils'

import { resolveSingleSubpackage } from '../plugins/subpackageChunks'

const debugChunk = debug('uni:chunk')

interface MiniProgramBuildOptions {
  app?: {
    independentSubpackages?: boolean
  }
}

export function buildOptions(
  options: MiniProgramBuildOptions = {}
): UserConfig['build'] {
  const platform = process.env.UNI_PLATFORM
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  // 开始编译时，清空输出目录
  if (fs.existsSync(outputDir)) {
    emptyDir(outputDir, ['project.config.json', 'project.private.config.json'])
  }
  return createBuildOptions(inputDir, platform, options)
}

export function createBuildOptions(
  inputDir: string,
  platform: UniApp.PLATFORM,
  options: MiniProgramBuildOptions = {}
): BuildOptions {
  const { renderDynamicImport } = dynamicImportPolyfill()
  return {
    // TODO 待优化，不同小程序平台sourcemap处理逻辑可能不同
    // TODO 目前存在两层sourcemap，一层是vite的，一层是小程序的，目前拿不到小程序的sourcemap，导致没法还原到源码，所以暂时不默认启用
    sourcemap: isEnableConsole() && enableSourceMap(),
    // target: ['chrome53'], // 由小程序自己启用 es6 编译
    emptyOutDir: false, // 不清空输出目录，否则会影响自定义的一些文件输出，比如wxml
    lib:
      process.env.UNI_COMPILE_TARGET === 'uni_modules'
        ? false
        : {
            // 必须使用 lib 模式，否则会生成 preload 等代码
            fileName: 'app.js',
            entry: resolveMainPathOnce(inputDir),
            formats: ['cjs'],
          },
    rollupOptions: {
      input:
        process.env.UNI_COMPILE_TARGET === 'uni_modules'
          ? {}
          : parseRollupInput(inputDir, platform, options),
      output: {
        sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
          const result = sourcemapPathTransform(
            relativeSourcePath,
            sourcemapPath
          )
          if (platform === 'mp-alipay') {
            return path.basename(result)
          }
          return result
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

function sourcemapPathTransform(
  relativeSourcePath: string,
  sourcemapPath: string
) {
  const prefix = ''
  let [, modulePath] = relativeSourcePath.split('/node_modules/')
  if (modulePath) {
    return `${prefix}node_modules/${modulePath}`
  }
  let [, base64] = relativeSourcePath.split('/uniPage:/')
  if (base64) {
    return prefix + parseVirtualPagePathInfo(base64).filepath + '?type=page'
  }
  ;[, base64] = relativeSourcePath.split('/uniComponent:/')
  if (base64) {
    return (
      prefix +
      parseVirtualComponentPathInfo(base64).filepath +
      '?type=component'
    )
  }
  return (
    prefix +
    normalizePath(
      path.relative(
        process.env.UNI_INPUT_DIR,
        path.resolve(path.dirname(sourcemapPath), relativeSourcePath)
      )
    )
  )
}

// 获取子包的插件导出
function getSubpackagePluginExports(inputDir: string): Record<string, string> {
  const pagesJsonPath = path.join(inputDir, 'pages.json')
  const pluginExports: Record<string, string> = {}
  const pagesJson = parseJson(
    fs.readFileSync(pagesJsonPath, 'utf8'),
    true,
    pagesJsonPath
  ) as UniApp.PagesJson
  const subPackages = (
    pagesJson.subPackages ||
    pagesJson.subpackages ||
    []
  ).filter((pkg) => pkg.root && pkg.plugins)

  for (const pkg of subPackages) {
    const plugins = Object.values(pkg.plugins!)
    for (const plugin of plugins) {
      if (!plugin.export) {
        continue
      }
      const pluginExportFile = path.resolve(inputDir, pkg.root, plugin.export)
      if (!fs.existsSync(pluginExportFile)) {
        notFound(pluginExportFile)
      }
      pluginExports[removeExt(path.join(pkg.root, plugin.export))] =
        pluginExportFile
    }
  }
  return pluginExports
}

function parseRollupInput(
  inputDir: string,
  platform: UniApp.PLATFORM,
  options: MiniProgramBuildOptions
) {
  const inputOptions: Record<string, string> = {
    app: resolveMainPathOnce(inputDir),
  }
  if (process.env.UNI_MP_PLUGIN) {
    initIndependentSubPackages([])
    return inputOptions
  }
  // 独立分包需要原始 pages.json；normalize 会把 subPackages 合并进 pages。
  const independentPackages = options.app?.independentSubpackages
    ? parseIndependentSubPackages(parsePagesJson(inputDir, platform, false))
    : []
  initIndependentSubPackages(independentPackages)
  independentPackages.forEach(({ root }) => {
    inputOptions[`${root}/common/main`] = formatIndependentVirtualId(
      INDEPENDENT_MAIN_PREFIX,
      root
    )
  })
  if (platform === 'mp-weixin' || platform === 'mp-alipay') {
    const pluginExports = getSubpackagePluginExports(inputDir)
    Object.keys(pluginExports).forEach((exportPath) => {
      inputOptions[exportPath] = pluginExports[exportPath]
    })
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
  return id.includes(VUE_EXPORT_HELPER_ID)
}

const chunkFileNameBlackList = ['main', 'pages.json', 'manifest.json']

function resolveDataChunkType(filename: string, optimize: boolean) {
  if (DEFAULT_ASSETS_RE.test(filename)) return 'assets'
  if (optimize && filename.endsWith('.json')) return 'json'
}

// Page and component scripts must match their companion JSON filenames.
function avoidEntryFilename(name: string) {
  while (hasJsonFile(name)) name += '-helper'
  return name
}

type ManualChunkApi = Parameters<GetManualChunk>[1]

// uni-app x JSON modules can import runtime helpers (e.g. UTSJSONObject).
// Keep their vendor dependencies with the data, so loading JSON never has to
// initialize an unrelated vendor module that consumes that JSON first.
function collectJsonDependencies({
  getModuleIds,
  getModuleInfo,
}: ManualChunkApi) {
  const dependencies = new Set<string>()
  for (const id of getModuleIds()) {
    if (resolveDataChunkType(id.split('?')[0], true) !== 'json') continue
    const info = getModuleInfo(id)
    if (!info?.isIncluded) continue
    for (const imported of info.importedIds) dependencies.add(imported)
  }
  for (const id of dependencies) {
    for (const imported of getModuleInfo(id)?.importedIds || []) {
      dependencies.add(imported)
    }
  }
  return dependencies
}

function createMoveToVendorChunkFn(): GetManualChunk | undefined {
  // 云端编译时，不拆分文件
  if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
    return undefined
  }
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  const resolveVendorChunk = createResolveVendorChunkFn(inputDir)
  const jsonDependencies = new WeakMap<ManualChunkApi, Set<string>>()
  return (id, api) => {
    const { getModuleInfo } = api
    const independentRoot = parseIndependentRoot(id)
    const idWithoutIndependentRoot = independentRoot
      ? withoutIndependentRoot(id)
      : id
    const normalizedId = normalizePath(idWithoutIndependentRoot)
    const filename = normalizedId.split('?')[0]
    if (independentRoot && isAppPagesJson(filename, inputDir)) {
      const chunkName = resolveIndependentCommonChunkName(
        independentRoot,
        'vendor'
      )
      debugChunk(chunkName, normalizedId)
      return chunkName
    }
    const optimizeSubpackages =
      isUniAppX() && getSubPackages().hasOptimizationSubPackages
    // Do not force tree-shaken type-only modules into empty manual chunks.
    const moduleInfo = optimizeSubpackages ? getModuleInfo(id) : null
    if (
      moduleInfo?.isIncluded === false &&
      !moduleInfo.isEntry &&
      !moduleInfo.dynamicImporters.length
    ) {
      return
    }
    const subpackageRoot =
      !independentRoot && optimizeSubpackages
        ? resolveSingleSubpackage(id, getModuleInfo, inputDir, (importer) =>
            resolveVendorChunk(importer, getModuleInfo, true)
          )
        : undefined
    const dataChunk = resolveDataChunkType(filename, optimizeSubpackages)
    if (dataChunk) {
      const root = independentRoot || subpackageRoot
      const name = (root ? root + '/' : '') + 'common/' + dataChunk
      const chunkName = optimizeSubpackages ? avoidEntryFilename(name) : name
      debugChunk(chunkName, normalizedId)
      return chunkName
    }
    // 处理项目内的js,ts文件
    if (EXTNAME_JS_RE.test(filename)) {
      if (filename.startsWith(inputDir) && !filename.includes('node_modules')) {
        const chunkFileName = removeExt(
          normalizePath(path.relative(inputDir, filename))
        )
        // uni_modules中的workers需要合并到根目录workers目录
        const workerChunkName = resolveWorkerChunkName(chunkFileName)
        if (workerChunkName) {
          return workerChunkName
        }
        if (
          !chunkFileNameBlackList.includes(chunkFileName) &&
          !hasJsonFile(chunkFileName) // 无同名的page,component
        ) {
          let normalizedChunkFileName = independentRoot
            ? resolveIndependentCommonChunkName(independentRoot, chunkFileName)
            : subpackageRoot && !chunkFileName.startsWith(subpackageRoot + '/')
            ? `${subpackageRoot}/${chunkFileName}`
            : chunkFileName
          if (subpackageRoot && normalizedChunkFileName !== chunkFileName) {
            normalizedChunkFileName = avoidEntryFilename(
              normalizedChunkFileName
            )
          }
          debugChunk(normalizedChunkFileName, normalizedId)
          return normalizedChunkFileName
        }
        return
      }
    }
    const vendorChunk =
      independentRoot && EXTNAME_JS_RE.test(filename)
        ? 'common/vendor'
        : resolveVendorChunk(id, getModuleInfo, optimizeSubpackages)
    if (vendorChunk) {
      let chunkName = independentRoot
        ? resolveIndependentCommonChunkName(independentRoot, 'vendor')
        : vendorChunk
      if (optimizeSubpackages) {
        // Rollup supplies a fresh API for each output, including watch rebuilds.
        let dependencies = jsonDependencies.get(api)
        if (!dependencies) {
          dependencies = collectJsonDependencies(api)
          jsonDependencies.set(api, dependencies)
        }
        if (dependencies.has(id)) {
          chunkName = avoidEntryFilename(chunkName.replace(/vendor$/, 'json'))
        }
      }
      debugChunk(chunkName, id)
      return chunkName
    }
  }
}

// Share the forced vendor placement policy with dependency ownership analysis.
// A consumer that is emitted in main pins its dependencies there, regardless
// of which page originally imported that consumer.
function createResolveVendorChunkFn(inputDir: string) {
  const cache = new Map<string, boolean>()
  return (
    id: string,
    getModuleInfo: GetModuleInfo,
    optimize: boolean
  ): string | undefined => {
    const normalizedId = normalizePath(id)
    const filename = normalizedId.split('?')[0]
    if (resolveDataChunkType(filename, optimize)) return
    if (EXTNAME_JS_RE.test(filename)) {
      if (filename.startsWith(inputDir) && !filename.includes('node_modules')) {
        return
      }
      const { hasOptimizationSubPackages, subPackages } = getSubPackages()
      // Preserve the existing placement of subpackage-local npm dependencies.
      if (
        hasOptimizationSubPackages &&
        subPackages.length &&
        filename.startsWith(inputDir) &&
        filename.includes('node_modules') &&
        !filename.startsWith(inputDir + '/node_modules')
      ) {
        const moduleInfo = getModuleInfo(id)
        if (!moduleInfo || !moduleInfo.importers.length) return
        const matchSubPackages = new Set(
          subPackages.filter((subPackagePath) =>
            moduleInfo.importers.some((importer) =>
              importer.startsWith(inputDir + '/' + subPackagePath)
            )
          )
        )
        if (matchSubPackages.size === 1) {
          return `${matchSubPackages.values().next().value}common/vendor`
        }
      }
      return 'common/vendor'
    }
    if (
      isVueJs(normalizedId) ||
      (normalizedId.includes('node_modules') &&
        !isCSSRequest(normalizedId) &&
        // Keep the original ID for module graph lookups (e.g. query suffixes).
        staticImportedByEntry(id, getModuleInfo, cache))
    ) {
      return 'common/vendor'
    }
  }
}

function resolveIndependentCommonChunkName(root: string, chunkName: string) {
  const normalizedRoot = normalizePath(root).replace(/\/$/, '')
  const normalizedChunkName = normalizePath(chunkName)
  if (normalizedChunkName.startsWith(`${normalizedRoot}/common/`)) {
    return normalizedChunkName
  }
  const relativeChunkName = normalizedChunkName.startsWith(`${normalizedRoot}/`)
    ? normalizedChunkName.slice(normalizedRoot.length + 1)
    : normalizedChunkName
  return `${normalizedRoot}/common/${relativeChunkName}`
}

function resolveWorkerChunkName(chunkFileName: string) {
  if (
    chunkFileName.startsWith('uni_modules') &&
    chunkFileName.includes('/workers/') &&
    getWorkersRootDirs().some((dir) => chunkFileName.startsWith(dir))
  ) {
    const workerRootDir = resolveWorkersRootDir()
    return `${workerRootDir}/${chunkFileName}`
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
      let independentRoot = parseIndependentRoot(id)
      id = independentRoot ? withoutIndependentRoot(id) : id
      let isMiniProgramEntry = false
      let componentPackageRoot: string | undefined
      if (isUniPageUrl(id)) {
        const { filepath, root } = parseVirtualPagePathInfo(id)
        independentRoot = independentRoot || root
        id = path.resolve(process.env.UNI_INPUT_DIR, filepath)
        isMiniProgramEntry = true
      } else if (isUniComponentUrl(id)) {
        const { filepath, root, packageRoot } =
          parseVirtualComponentPathInfo(id)
        independentRoot = independentRoot || root
        id = path.resolve(process.env.UNI_INPUT_DIR, filepath)
        componentPackageRoot =
          isUniAppX() && independentRoot
            ? undefined
            : isUniAppX()
            ? resolveMiniProgramComponentPackageRoot(
                normalizeMiniProgramFilename(id, inputDir),
                packageRoot
              )
            : undefined
        isMiniProgramEntry = true
      }
      if (getWorkersRootDirs().length) {
        const normalizedId = normalizePath(id)
        const filename = normalizedId.split('?')[0]
        const chunkFileName = removeExt(
          normalizePath(path.relative(inputDir, filename))
        )
        // uni_modules中的workers需要合并到根目录workers目录
        const workerChunkName = resolveWorkerChunkName(chunkFileName)
        if (workerChunkName) {
          return workerChunkName + '.js'
        }
      }
      if (independentRoot && !isMiniProgramEntry) {
        const filename = normalizePath(id).split('?')[0]
        const chunkFileName = removeExt(
          normalizeMiniProgramFilename(filename, inputDir)
        )
        return (
          resolveIndependentCommonChunkName(independentRoot, chunkFileName) +
          '.js'
        )
      }
      // A dynamic JS facade must keep the package selected by manualChunks.
      if (
        !isMiniProgramEntry &&
        getSubPackageRootByFilename(chunk.name, inputDir)
      ) {
        return chunk.name + '.js'
      }
      if (componentPackageRoot) {
        return (
          removeExt(
            normalizeMiniProgramComponentFilename(
              id,
              inputDir,
              componentPackageRoot
            )
          ) + '.js'
        )
      }
      return removeExt(normalizeMiniProgramFilename(id, inputDir)) + '.js'
    }
    const independentRoot = findIndependentChunkRoot(chunk)
    if (independentRoot) {
      return (
        resolveIndependentCommonChunkName(independentRoot, chunk.name) + '.js'
      )
    }
    return '[name].js'
  }
}

function findIndependentChunkRoot(chunk: PreRenderedChunk) {
  return chunk.moduleIds?.map(parseIndependentRoot).find(Boolean)
}

export function notFound(filename: string): never {
  console.log()
  console.error(M['file.notfound'].replace('{file}', filename))
  console.log()
  process.exit(0)
}
