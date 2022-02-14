import path from 'path'
import debug from 'debug'
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite'
import type { Options as VueOptions } from '@vitejs/plugin-vue'
import type { Options as ViteLegacyOptions } from '@vitejs/plugin-legacy'
import type { VueJSXPluginOptions } from '@vue/babel-plugin-jsx'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import legacyPlugin from '@vitejs/plugin-legacy'

import {
  CopyOptions,
  initModuleAlias,
  initPreContext,
} from '@dcloudio/uni-cli-shared'

import { createConfig } from './config'
import { createConfigResolved } from './configResolved'
import { uniCopyPlugin } from './plugins/copy'
import {
  initExtraPlugins,
  initPluginUniOptions,
  rewriteCompilerSfcParse,
} from './utils'
import {
  initPluginViteLegacyOptions,
  initPluginVueJsxOptions,
  initPluginVueOptions,
} from './vue'
// import { createResolveId } from './resolveId'

const debugUni = debug('uni:plugin')

const pkg = require(path.resolve(__dirname, '../package.json'))

initModuleAlias()

rewriteCompilerSfcParse()

process.env.UNI_COMPILER_VERSION = pkg['uni-app']?.['compilerVersion'] || ''
process.env.UNI_COMPILER_VERSION_TYPE = pkg.version.includes('alpha')
  ? 'a'
  : 'r'

export interface VitePluginUniOptions {
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

export default function uniPlugin(
  rawOptions: VitePluginUniOptions = {}
): Plugin[] {
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

  const plugins: Plugin[] = []
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
    vuePlugin(initPluginVueOptions(options, uniPlugins, uniPluginOptions))
  )

  // 仅在 vue 或 纯原生 App.vue 编译时做 copy
  if (
    process.env.UNI_COMPILER === 'vue' ||
    (process.env.UNI_RENDERER === 'native' &&
      process.env.UNI_COMPILER_NVUE === 'app')
  ) {
    plugins.push(
      uniCopyPlugin({
        outputDir: process.env.UNI_OUTPUT_DIR,
        copyOptions: options.copyOptions,
      })
    )
  }

  return plugins
}
