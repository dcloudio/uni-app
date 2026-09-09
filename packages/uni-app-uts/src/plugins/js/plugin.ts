import path from 'path'
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
            rolldownOptions: {
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
                manualChunks: isESM ? manualChunks : undefined,
                codeSplitting: isESM,
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
      configResolved: (config) => {
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
      },
      generateBundle(_, bundle) {
        // 调整所有sourceMap文件
        Object.entries(bundle).forEach(([file, asset]) => {
          if (file.endsWith('.js.map') && asset.type === 'asset') {
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
          }
        })
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
