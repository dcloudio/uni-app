import path from 'path'
import { createHash } from 'node:crypto'
import fs from 'fs-extra'
import type { ResolvedConfig } from 'vite'
import {
  APP_SERVICE_FILENAME,
  type UniVitePlugin,
  buildNonTreeShakingUniModules,
  buildUniExtApis,
  createEncryptCssUrlReplacer,
  emptyDir,
  getHarmonyRuntimePackageName,
  hash,
  injectCssPlugin,
  injectCssPostPlugin,
  insertBeforePlugin,
  isNormalCompileTarget,
  normalizePath,
  removeExt,
  resolveMainPathOnce,
  tscOutDir,
  uvueOutDir,
  withSourcemap,
} from '@dcloudio/uni-cli-shared'
import { configResolved, createUniOptions } from '../utils'
import { uniAppCssPlugin } from './css'
import { uniAppJsPlugin } from './js'
import { writeAppServiceSourceMapToCache } from './sourceMap'

const HARMONY_DOM2_ESBUILD_TRANSPILE_CACHE_MAX = 2048
const HARMONY_DOM2_ESBUILD_TRANSPILE_CACHE_FLAG =
  '__uni_harmony_dom2_esbuild_transpile_cache__'

// 鸿蒙 dom2 增量编译时，Rollup 每次 generate 都会让 vite:esbuild-transpile
// 对所有 chunk 重新执行 renderChunk。多数未变更 chunk 的 code、fileName、format 都相同，
// 这部分 esbuild 转译是重复开销，性能报告里它也是 generate 阶段最大的单点耗时。
//
// 这里不替换 Vite 的实现，只在鸿蒙 dom2 下包装原 renderChunk：
// 1. 命中缓存时直接复用原 renderChunk 的返回值，跳过重复 esbuild transform；
// 2. 未命中时仍调用 Vite 原逻辑，保证功能和 sourcemap 处理不变；
// 3. 缓存只放在当前 Vite 配置实例内，不跨进程、不落盘，避免引入额外失效问题。
function initHarmonyDom2EsbuildTranspileCache(config: ResolvedConfig) {
  const plugin = config.plugins.find((p) => p.name === 'vite:esbuild-transpile')
  if (
    !plugin ||
    !plugin.renderChunk ||
    (plugin as any)[HARMONY_DOM2_ESBUILD_TRANSPILE_CACHE_FLAG]
  ) {
    return
  }
  const rawRenderChunk = plugin.renderChunk as any
  const rawHandler =
    typeof rawRenderChunk === 'function'
      ? rawRenderChunk
      : rawRenderChunk.handler
  if (typeof rawHandler !== 'function') {
    return
  }

  const cache = new Map<string, Promise<any> | any>()
  const renderChunk = function (
    this: any,
    code: string,
    chunk: any,
    opts: any
  ) {
    // plugin-legacy 会通过该标记跳过 esbuild，保持原逻辑直接透传。
    if (opts?.__vite_skip_esbuild__) {
      return rawHandler.call(this, code, chunk, opts)
    }

    const cacheKey = createEsbuildTranspileCacheKey(code, chunk, opts)
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey)
      // Map 充当简单 LRU：命中后挪到末尾，避免热 chunk 被淘汰。
      cache.delete(cacheKey)
      cache.set(cacheKey, cached)
      return cached
    }

    const result = Promise.resolve(rawHandler.call(this, code, chunk, opts))
      .then((res) => {
        // 缓存原 hook 的完整结果，而不是只缓存 code，避免遗漏 map 等字段。
        cache.set(cacheKey, res)
        return res
      })
      .catch((err) => {
        // 转译失败不能污染缓存，避免后续修复代码后仍复用错误结果。
        cache.delete(cacheKey)
        throw err
      })
    cache.set(cacheKey, result)
    trimEsbuildTranspileCache(cache)
    return result
  }

  plugin.renderChunk =
    typeof rawRenderChunk === 'function'
      ? renderChunk
      : { ...rawRenderChunk, handler: renderChunk }
  // 标记已包装，避免多个插件或重复 configResolved 时二次包裹。
  ;(plugin as any)[HARMONY_DOM2_ESBUILD_TRANSPILE_CACHE_FLAG] = true
}

function createEsbuildTranspileCacheKey(
  code: string,
  chunk: { fileName?: string },
  opts: { format?: string; sourcemap?: boolean | string }
) {
  // renderChunk 的输出主要由 chunk 内容和输出参数决定：
  // - code hash/length：判断 chunk 内容是否真的没变；
  // - fileName：Vite 会作为 esbuild sourcefile，影响 sourcemap；
  // - format/sourcemap：影响 esbuild 输出格式和 map 结果。
  // 只把 hash 放入 key，避免把大段 chunk code 长期挂在 Map key 上。
  const hash = createHash('sha1').update(code).digest('hex')
  return [
    opts?.format,
    opts?.sourcemap,
    chunk?.fileName,
    code.length,
    hash,
  ].join('|')
}

function trimEsbuildTranspileCache(cache: Map<string, any>) {
  // watch 场景中 chunk 会随编辑持续产生新内容，限制上限避免缓存无限增长。
  while (cache.size > HARMONY_DOM2_ESBUILD_TRANSPILE_CACHE_MAX) {
    const firstKey = cache.keys().next().value
    if (!firstKey) {
      break
    }
    cache.delete(firstKey)
  }
}

function normalizeModuleId(id: string) {
  return normalizePath(id.split('?')[0]).replace(/\\/g, '/')
}

export function createAppServiceManualChunks(isESM: boolean, inputDir: string) {
  const normalizedInputDir = normalizeModuleId(inputDir)

  return (id: string) => {
    if (!isESM) {
      return
    }

    const chunkName = normalizeModuleId(id)
    if (chunkName.startsWith('\0plugin-vue:')) {
      return 'plugin-vue-' + chunkName.split(':')[1]
    }
    if (chunkName.includes('/@dcloudio/uni-cloud/')) {
      return '@dcloudio/uni-cloud'
    }
    if (
      chunkName.startsWith(normalizedInputDir) &&
      !chunkName.includes('/node_modules/')
    ) {
      return removeExt(
        normalizePath(path.relative(normalizedInputDir, chunkName))
      )
    }
    // 项目内外的公共运行时统一进入 vendor，虚拟模块继续交给 Rollup 处理。
    if (path.posix.isAbsolute(chunkName) || path.win32.isAbsolute(chunkName)) {
      return 'vendor'
    }
  }
}

export function initUniAppJsEngineDom1CssPlugin(config: ResolvedConfig) {
  injectCssPlugin(
    config,
    process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? {
          createUrlReplacer: createEncryptCssUrlReplacer,
        }
      : {}
  )
  injectCssPostPlugin(config, uniAppCssPlugin(config))
}

export function createUniAppJsEnginePlugin(
  platform: 'app-android' | 'app-ios' | 'app-harmony'
) {
  return function uniAppJsEnginePlugin(): UniVitePlugin {
    const isX = process.env.UNI_APP_X === 'true'
    const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'
    const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
    const outputDir = process.env.UNI_OUTPUT_DIR
    const uvueOutputDir = uvueOutDir(platform)
    const tscOutputDir = tscOutDir(platform)
    // 开始编译时，清空输出目录
    function emptyOutDir() {
      // ext-api 编译时，需要同时编译多个平台，并保留多个平台的输出目录
      if (process.env.UNI_COMPILE_TARGET === 'ext-api') {
        return
      }
      if (fs.existsSync(outputDir)) {
        emptyDir(outputDir)
      }
    }
    emptyOutDir()
    function emptyUVueDir() {
      if (fs.existsSync(uvueOutputDir)) {
        emptyDir(uvueOutputDir)
      }
    }
    emptyUVueDir()
    function emptyTscDir() {
      if (fs.existsSync(tscOutputDir)) {
        emptyDir(tscOutputDir)
      }
    }
    emptyTscDir()

    if (
      process.env.UNI_UTS_PLATFORM === 'app-harmony' &&
      isNormalCompileTarget()
    ) {
      // 拆分模式
      process.env.UNI_APP_OUTPUT_FORMAT = 'esm'
      // 动态导入
      process.env.UNI_APP_DYNAMIC_IMPORT = 'true'
    }
    const isESM = process.env.UNI_APP_OUTPUT_FORMAT === 'esm'
    const manualChunks = createAppServiceManualChunks(isESM, inputDir)

    const isAndroid = platform === 'app-android'
    const isIOS = platform === 'app-ios'
    const isHarmony = platform === 'app-harmony'
    // TODO 目前仅鸿蒙支持esm格式
    const paths: Record<string, string> =
      isESM && isHarmony
        ? {
            // vue: getHarmonyRuntimePackageName(isX, isDom2),
            '@vue/shared': getHarmonyRuntimePackageName(isX, isDom2),
          }
        : {}

    // 只缓存 sourcemap 内容 hash，不缓存完整内容，避免用空间换时间。
    const sourceMapHashCache: Map<string, string> = new Map<string, string>()
    // 仅限定鸿蒙 DOM2 开发模式，避免影响其它平台和生产构建。
    const enableSourceMapIncremental =
      process.env.NODE_ENV === 'development' && isDom2 && isHarmony
    const globals = {
      vue: 'Vue',
      '@vue/shared': 'uni.VueShared',
    }
    return {
      name: 'uni:app-uts',
      apply: 'build',
      uni: createUniOptions(platform),
      config(config) {
        const sourcemap = withSourcemap(config)
        return {
          base: '/', // 强制 base
          build: {
            sourcemap,
            emptyOutDir: false,
            assetsInlineLimit: 0,
            target: isIOS
              ? [
                  isDom2 ? 'ios14' : 'ios12',
                  'es2020',
                  'edge88',
                  'firefox78',
                  'chrome87',
                  'safari14',
                ]
              : isAndroid && isDom2
              ? ['es2022']
              : isHarmony
              ? ['es2022']
              : undefined,
            rollupOptions: {
              input: resolveMainPathOnce(inputDir),
              // import "libentry.so"
              external: ['vue', '@vue/shared', /.*\.so$/],
              output: {
                name: 'AppService',
                banner: ``,
                format: isESM ? 'esm' : 'iife',
                entryFileNames: APP_SERVICE_FILENAME,
                globals,
                paths,
                manualChunks,
                inlineDynamicImports: false,
                chunkFileNames: isESM ? 'assets/[name].js' : undefined,
                sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
                  return normalizePath(
                    path.relative(
                      process.env.UNI_INPUT_DIR,
                      path.resolve(
                        path.dirname(sourcemapPath),
                        relativeSourcePath
                      )
                    )
                  )
                },
              },
              treeshake: {
                moduleSideEffects: (id: string, external: boolean) => {
                  if (id === '@vue/shared') {
                    return false
                  }
                  return true
                },
              },
            },
          },
        }
      },
      configResolved(config) {
        configResolved(config)
        if (!isDom2) {
          initUniAppJsEngineDom1CssPlugin(config)
        }
        // DOM2 由 uni:vapor-script 统一处理 JS/TS，避免重复解析普通 JS。
        if (!isDom2) {
          insertBeforePlugin(uniAppJsPlugin(config), 'uni:app-main', config)
        }
        // 如果开启了 vapor 模式，则禁用 vue 的 devtools，让 @vitejs/plugin-vue 不管是开发还是发行，均生成发行代码
        // 理论上非 vapor 也应该禁用，但为了不引发其他问题，暂时只禁用 vapor 模式
        if (isDom2) {
          const plugin = config.plugins.find((p) => p.name === 'vite:vue')
          if (plugin?.api?.options) {
            plugin.api.options.devToolsEnabled = false
            plugin.api.options.isProduction = true
            // TODO 临时禁用，目前有bug 等待 https://github.com/vuejs/core/pull/13630 合并
            // 使用内部自己定义的 transformAssetUrls
            plugin.api.options.template.transformAssetUrls = false
          }
        }
        if (isDom2 && isHarmony) {
          // 仅鸿蒙 dom2 开启：该模式会拆出大量 ESM chunk，
          // 增量编译时未变更 chunk 也会反复走 Vite 的 esbuild renderChunk。
          // 其他平台/模式先不改，避免扩大影响面。
          initHarmonyDom2EsbuildTranspileCache(config)
        }
      },
      generateBundle(_, bundle) {
        // 调整所有sourceMap文件
        const currentSourceMapFiles = enableSourceMapIncremental
          ? new Set<string>()
          : undefined
        Object.entries(bundle).forEach(([file, asset]) => {
          if (file.endsWith('.js.map') && asset.type === 'asset') {
            currentSourceMapFiles?.add(file)
            const sourceMapHash = enableSourceMapIncremental
              ? hash(asset.source)
              : ''
            // 鸿蒙 DOM2 开发模式下，内容未变化的 sourcemap 无需重复 parse 和写入。
            if (
              enableSourceMapIncremental &&
              sourceMapHashCache.get(file) === sourceMapHash
            ) {
              return
            }
            writeAppServiceSourceMapToCache({
              file,
              sourceMap: asset.source as string,
              bundle,
              inputDir,
              outputDir,
              cacheDir: process.env.UNI_APP_X_CACHE_DIR,
              keepSourceMapInBundle: process.env.UNI_PLATFORM === 'app-harmony',
              useCacheSourceMapUrl:
                process.env.NODE_ENV === 'development' &&
                ((isAndroid && isDom2) || isIOS),
              sourceMapUrlMode: isAndroid ? 'absolute' : 'relative',
              sourceRootMode: isIOS ? 'absolute' : 'relative',
            })
            if (enableSourceMapIncremental) {
              sourceMapHashCache.set(file, sourceMapHash)
            }
          }
        })
        if (currentSourceMapFiles) {
          sourceMapHashCache.forEach((_, file) => {
            if (!currentSourceMapFiles.has(file)) {
              sourceMapHashCache.delete(file)
            }
          })
        }
      },
      async writeBundle() {
        // x 上暂时编译所有uni ext api，不管代码里是否调用了
        // 框架内部编译时，不需要
        if (process.env.UNI_COMPILE_TARGET !== 'ext-api') {
          await buildUniExtApis(process.env.UNI_UTS_PLATFORM === 'app-harmony')
          await buildNonTreeShakingUniModules()
        }
      },
    }
  }
}
