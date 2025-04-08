import fs from 'fs'
// import debug from 'debug'
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite'
import type { Options as VueOptions } from '@vitejs/plugin-vue'
import type ViteLegacyPlugin from '@vitejs/plugin-legacy'
import type { VueJSXPluginOptions } from '@vue/babel-plugin-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import legacyPlugin from '@vitejs/plugin-legacy'

import {
  type AutoImportOptions,
  type CopyOptions,
  type InjectOptions,
  emptyDir,
  initAutoImportOptions,
  isInHBuilderX,
  isNormalCompileTarget,
  parseUniExtApisOnce,
  resolveSourceMapPath,
  rewriteExistsSyncHasRootFile,
  rewriteScssReadFileSync,
  uniJsonPlugin,
  uniUTSExtApiReplace,
  uniViteInjectPlugin,
} from '@dcloudio/uni-cli-shared'

import { createConfig } from './config'
import { createConfigResolved } from './configResolved'
import { uniCopyPlugin } from './plugins/copy'
import { uniMovePlugin } from './plugins/move'
import {
  initExtraPlugins,
  // initFixedEsbuildInitTSConfck,
  initPluginUniOptions,
  rewriteCompilerSfcParse,
} from './utils'
import {
  createPluginVueInstance,
  initPluginViteLegacyOptions,
  initPluginVueJsxOptions,
  initPluginVueOptions,
} from './vue'
import { initEnv } from './cli/utils'
import { uniUVuePlugin } from './uvue/plugins'

export type ViteLegacyOptions = Parameters<typeof ViteLegacyPlugin>[0]

// const debugUni = debug('uni:plugin')

export interface VitePluginUniOptions {
  uvue?: boolean
  vueOptions?: VueOptions
  vueJsxOptions?: (VueJSXPluginOptions & { babelPlugins?: any[] }) | boolean
  viteLegacyOptions?: ViteLegacyOptions | false
  autoImportOptions?: AutoImportOptions
}
export interface VitePluginUniResolvedOptions extends VitePluginUniOptions {
  base: string
  command: ResolvedConfig['command']
  platform: UniApp.PLATFORM
  inputDir: string
  outputDir: string
  assetsDir: string
  devServer?: ViteDevServer
  copyOptions?: Required<CopyOptions>
}

export { runDev, runBuild } from './cli/action'

let isFirst = true

export default function uniPlugin(
  rawOptions: VitePluginUniOptions = {}
): Plugin[] {
  // 重写readFileSync，拦截.scss 等文件读取，实现条件编译，
  rewriteScssReadFileSync()

  if (isInHBuilderX()) {
    rewriteExistsSyncHasRootFile()
  }

  // 三方插件（如vitest）可能提供了自己的入口命令，需要补充 env 初始化逻辑
  initEnv('unknown', { platform: process.env.UNI_PLATFORM || 'h5' })

  const options: VitePluginUniResolvedOptions = {
    ...rawOptions,
    base: '/',
    assetsDir: 'assets',
    inputDir: '',
    outputDir: '',
    command: 'serve',
    platform: 'h5',
  }

  options.platform = (process.env.UNI_PLATFORM as UniApp.PLATFORM) || 'h5'
  options.inputDir = process.env.UNI_INPUT_DIR

  const plugins =
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_UTS_PLATFORM === 'app-android'
      ? createUVueAndroidPlugins(options)
      : createPlugins(options)

  // x 提供 auto import（非android、android自行处理）
  if (
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_UTS_PLATFORM !== 'app-android'
  ) {
    plugins.unshift(
      AutoImport(
        initAutoImportOptions(
          process.env.UNI_UTS_PLATFORM,
          options.autoImportOptions || {}
        )
      )
    )
  }
  plugins.unshift(uniJsonPlugin())
  return plugins
}

function createPlugins(options: VitePluginUniResolvedOptions) {
  const plugins: Plugin[] = []

  // 框架 ext-api 不需要 inject 本地 ext-api
  if (process.env.UNI_COMPILE_TARGET !== 'ext-api') {
    // uni x 需要插入到指定位置，此插件执行太早，又会引发 vue 文件的不支持，该插件是解析ast的，所以必须是合法的js或ts代码
    if (
      process.env.UNI_APP_X === 'true' &&
      // iOS 暂不使用该机制
      process.env.UNI_UTS_PLATFORM !== 'app-ios' &&
      // harmony 同 iOS
      process.env.UNI_UTS_PLATFORM !== 'app-harmony'
    ) {
      plugins.push(uniUTSExtApiReplace())
    } else {
      const injects = parseUniExtApisOnce(
        true,
        process.env.UNI_UTS_PLATFORM,
        process.env.UNI_UTS_TARGET_LANGUAGE
      )
      if (Object.keys(injects).length) {
        plugins.push(
          uniViteInjectPlugin('uni:ext-api-inject', injects as InjectOptions)
        )
      }
    }
  }

  // 仅限 h5
  if (options.viteLegacyOptions && options.platform === 'h5') {
    plugins.push(
      ...(legacyPlugin(
        initPluginViteLegacyOptions(options)
      ) as unknown as Plugin[])
    )
  }

  const uniPlugins = initExtraPlugins(
    process.env.UNI_CLI_CONTEXT || process.cwd(),
    (process.env.UNI_PLATFORM as UniApp.PLATFORM) || 'h5',
    options
  )
  // debugUni(uniPlugins)

  const uniPluginOptions = initPluginUniOptions(uniPlugins)

  options.copyOptions = uniPluginOptions.copyOptions

  if (options.vueJsxOptions) {
    plugins.push(
      vueJsxPlugin(
        initPluginVueJsxOptions(
          options,
          uniPluginOptions.compilerOptions,
          uniPluginOptions.jsxOptions
        )
      )
    )
  }

  plugins.push({
    name: 'uni',
    config: createConfig(options, uniPlugins),
    configResolved: createConfigResolved(options),
  })
  plugins.push(...uniPlugins)

  // plugins.push(...initFixedEsbuildInitTSConfck(process.env.UNI_INPUT_DIR))

  // 执行 build 命令时，vite 强制了 NODE_ENV
  // https://github.com/vitejs/vite/blob/main/packages/vite/src/node/build.ts#L405
  // const config = await resolveConfig(inlineConfig, 'build', 'production')
  // 在 @vitejs/plugin-vue 之前校正回来
  if (
    process.env.UNI_NODE_ENV &&
    process.env.UNI_NODE_ENV !== process.env.NODE_ENV
  ) {
    process.env.NODE_ENV = process.env.UNI_NODE_ENV
  }

  plugins.unshift(
    createPluginVueInstance(
      initPluginVueOptions(options, uniPlugins, uniPluginOptions)
    )
  )

  let addCopyPlugin = false
  if (options.platform !== 'app') {
    addCopyPlugin = true
  } else {
    // 仅在 vue 或 纯原生 App.vue 编译时做 copy
    if (
      process.env.UNI_COMPILER !== 'nvue' ||
      (process.env.UNI_RENDERER === 'native' &&
        process.env.UNI_RENDERER_NATIVE === 'appService')
    ) {
      addCopyPlugin = true
    } else if (process.env.UNI_APP_X === 'true') {
      // app-ios
      addCopyPlugin = true
    }
  }
  if (!isNormalCompileTarget()) {
    addCopyPlugin = false
  }
  if (addCopyPlugin) {
    plugins.push(
      uniCopyPlugin({
        outputDir: process.env.UNI_OUTPUT_DIR,
        copyOptions: options.copyOptions,
      })
    )
  }

  if (process.env.SOURCEMAP === 'true') {
    // 清空之前的 sourcemap 目录
    const sourceMapPath = resolveSourceMapPath()
    if (isFirst) {
      // 避免重复清空
      isFirst = false
      if (fs.existsSync(sourceMapPath)) {
        emptyDir(sourceMapPath)
      }
      plugins.push(
        uniMovePlugin({
          apply: 'build',
          enforce: 'post',
          cwd: process.env.UNI_OUTPUT_DIR,
          pattern: '**/*.js.map',
          dest: sourceMapPath,
        })
      )
    }
  }

  rewriteCompilerSfcParse()

  return plugins
}

function createUVueAndroidPlugins(options: VitePluginUniResolvedOptions) {
  const plugins: Plugin[] = []

  options.uvue = true

  const uniPlugins = initExtraPlugins(
    process.env.UNI_CLI_CONTEXT || process.cwd(),
    (process.env.UNI_PLATFORM as UniApp.PLATFORM) || 'h5',
    options
  )
  // debugUni(uniPlugins)

  const uniPluginOptions = initPluginUniOptions(uniPlugins)

  options.copyOptions = uniPluginOptions.copyOptions

  plugins.push(uniUVuePlugin(options))

  plugins.push(...uniPlugins)

  // plugins.push(...initFixedEsbuildInitTSConfck(process.env.UNI_INPUT_DIR))

  // 执行 build 命令时，vite 强制了 NODE_ENV
  // https://github.com/vitejs/vite/blob/main/packages/vite/src/node/build.ts#L405
  // const config = await resolveConfig(inlineConfig, 'build', 'production')
  // 在 @vitejs/plugin-vue 之前校正回来
  if (
    process.env.UNI_NODE_ENV &&
    process.env.UNI_NODE_ENV !== process.env.NODE_ENV
  ) {
    process.env.NODE_ENV = process.env.UNI_NODE_ENV
  }

  if (isNormalCompileTarget()) {
    plugins.push(
      uniCopyPlugin({
        outputDir: process.env.UNI_OUTPUT_DIR,
        copyOptions: options.copyOptions,
      })
    )
  }

  return plugins
}
