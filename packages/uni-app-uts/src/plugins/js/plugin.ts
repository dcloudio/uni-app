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
  injectCssPlugin,
  injectCssPostPlugin,
  insertBeforePlugin,
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

export function initUniAppJsEngineCssPlugin(config: ResolvedConfig) {
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
  platform: 'app-ios' | 'app-harmony'
) {
  return function uniAppJsEnginePlugin(): UniVitePlugin {
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

    if (process.env.UNI_UTS_PLATFORM === 'app-harmony') {
      // 拆分模式
      process.env.UNI_APP_OUTPUT_FORMAT = 'esm'
      // 动态导入
      process.env.UNI_APP_DYNAMIC_IMPORT = 'true'
    }
    const isESM = process.env.UNI_APP_OUTPUT_FORMAT === 'esm'

    const paths: Record<string, string> = isESM
      ? {
          vue: '@dcloudio/uni-app-x-runtime',
          '@vue/shared': '@dcloudio/uni-app-x-runtime',
        }
      : {}

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
            target:
              process.env.UNI_UTS_PLATFORM === 'app-ios'
                ? [
                    'ios12',
                    'es2020',
                    'edge88',
                    'firefox78',
                    'chrome87',
                    'safari14',
                  ]
                : process.env.UNI_UTS_PLATFORM === 'app-harmony'
                ? ['es2022']
                : undefined,
            rollupOptions: {
              input: resolveMainPathOnce(inputDir),
              external: ['vue', '@vue/shared'],
              output: {
                name: 'AppService',
                banner: ``,
                format: isESM ? 'esm' : 'iife',
                entryFileNames: APP_SERVICE_FILENAME,
                globals: {
                  vue: 'Vue',
                  '@vue/shared': 'uni.VueShared',
                },
                paths,
                manualChunks(id) {
                  if (isESM) {
                    const chunkName = normalizePath(id.split('?')[0])
                    if (chunkName.includes('/@dcloudio/uni-cloud/')) {
                      return '@dcloudio/uni-cloud'
                    }
                    if (chunkName.startsWith(inputDir)) {
                      return removeExt(
                        normalizePath(path.relative(inputDir, chunkName))
                      )
                    }
                  }
                },
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
            },
          },
        }
      },
      configResolved(config) {
        configResolved(config)
        initUniAppJsEngineCssPlugin(config)
        insertBeforePlugin(uniAppJsPlugin(config), 'uni:app-main', config)
        // 如果开启了 vapor 模式，则禁用 vue 的 devtools，让 @vitejs/plugin-vue 不管是开发还是发行，均生成发行代码
        // 理论上非 vapor 也应该禁用，但为了不引发其他问题，暂时只禁用 vapor 模式
        if (process.env.UNI_VUE_VAPOR === 'true') {
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
        const APP_SERVICE_FILENAME_MAP = APP_SERVICE_FILENAME + '.map'
        const appServiceMap = bundle[APP_SERVICE_FILENAME_MAP]
        if (appServiceMap && appServiceMap.type === 'asset') {
          const source = JSON.parse(appServiceMap.source as string)
          source.sourceRoot = normalizePath(inputDir)
          const newSourceMapFileName = path.resolve(
            process.env.UNI_APP_X_CACHE_DIR,
            'sourcemap',
            APP_SERVICE_FILENAME_MAP
          )
          fs.outputFileSync(newSourceMapFileName, JSON.stringify(source))
          delete bundle[APP_SERVICE_FILENAME_MAP]
          const appService = bundle[APP_SERVICE_FILENAME]
          if (appService && appService.type === 'chunk') {
            appService.code = appService.code.replace(
              `//# sourceMappingURL=app-service.js.map`,
              `//# sourceMappingURL=` +
                path.relative(process.env.UNI_OUTPUT_DIR, newSourceMapFileName)
            )
          }
        }
      },
      async writeBundle() {
        // x 上暂时编译所有uni ext api，不管代码里是否调用了
        // 框架内部编译时，不需要
        if (process.env.UNI_COMPILE_TARGET !== 'ext-api') {
          await buildUniExtApis()
          await buildNonTreeShakingUniModules()
        }
      },
    }
  }
}
