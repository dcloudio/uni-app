import fs from 'fs'
import path from 'path'
import debug from 'debug'
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite'
import type { Options as VueOptions } from '@vitejs/plugin-vue'
import type ViteLegacyPlugin from '@vitejs/plugin-legacy'
import type { VueJSXPluginOptions } from '@vue/babel-plugin-jsx'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import legacyPlugin from '@vitejs/plugin-legacy'

import {
  CopyOptions,
  InjectOptions,
  emptyDir,
  initModuleAlias,
  initPreContext,
  parseUniExtApis,
  resolveSourceMapPath,
  uniViteInjectPlugin,
} from '@dcloudio/uni-cli-shared'

import { createConfig } from './config'
import { createConfigResolved } from './configResolved'
import { uniCopyPlugin } from './plugins/copy'
import { uniMovePlugin } from './plugins/move'
import {
  initExtraPlugins,
  initFixedEsbuildInitTSConfck,
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

const debugUni = debug('uni:plugin')

const pkg = require(path.resolve(__dirname, '../package.json'))

initModuleAlias()

process.env.UNI_COMPILER_VERSION = pkg['uni-app']?.['compilerVersion'] || ''
process.env.UNI_COMPILER_VERSION_TYPE = pkg.version.includes('alpha')
  ? 'a'
  : 'r'

export interface VitePluginUniOptions {
  uvue?: boolean
  vueOptions?: VueOptions
  vueJsxOptions?: (VueJSXPluginOptions & { babelPlugins?: any[] }) | boolean
  viteLegacyOptions?: ViteLegacyOptions | false
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

  initPreContext(options.platform, process.env.UNI_CUSTOM_CONTEXT)

  return process.env.UNI_APP_X === 'true'
    ? createUVuePlugins(options)
    : createPlugins(options)
}

function createPlugins(options: VitePluginUniResolvedOptions) {
  const plugins: Plugin[] = []

  const injects = parseUniExtApis()
  if (Object.keys(injects).length) {
    plugins.push(
      uniViteInjectPlugin('uni:ext-api-inject', injects as InjectOptions)
    )
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
  debugUni(uniPlugins)

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
    // resolveId: createResolveId(options),
    configResolved: createConfigResolved(options),
  })
  plugins.push(...uniPlugins)

  plugins.push(...initFixedEsbuildInitTSConfck(process.env.UNI_INPUT_DIR))

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
      process.env.UNI_COMPILER === 'vue' ||
      (process.env.UNI_RENDERER === 'native' &&
        process.env.UNI_RENDERER_NATIVE === 'appService')
    ) {
      addCopyPlugin = true
    }
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

  rewriteCompilerSfcParse()

  return plugins
}

function createUVuePlugins(options: VitePluginUniResolvedOptions) {
  const plugins: Plugin[] = []

  options.uvue = true

  const uniPlugins = initExtraPlugins(
    process.env.UNI_CLI_CONTEXT || process.cwd(),
    (process.env.UNI_PLATFORM as UniApp.PLATFORM) || 'h5',
    options
  )
  debugUni(uniPlugins)

  const uniPluginOptions = initPluginUniOptions(uniPlugins)

  options.copyOptions = uniPluginOptions.copyOptions

  plugins.push(uniUVuePlugin(options))

  plugins.push(...uniPlugins)

  plugins.push(...initFixedEsbuildInitTSConfck(process.env.UNI_INPUT_DIR))

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

  plugins.push(
    uniCopyPlugin({
      outputDir: process.env.UNI_OUTPUT_DIR,
      copyOptions: options.copyOptions,
    })
  )

  return plugins
}
