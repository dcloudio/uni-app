import debug from 'debug'
import { Plugin, ResolvedConfig, ViteDevServer } from 'vite'
import { Options as VueOptions } from '@vitejs/plugin-vue'
import { Options as ViteLegacyOptions } from '@vitejs/plugin-legacy'
import { VueJSXPluginOptions } from '@vue/babel-plugin-jsx'
import vuePlugin from '@vitejs/plugin-vue'
import type ViteLegacyPlugin from '@vitejs/plugin-legacy'

import {
  CopyOptions,
  initModuleAlias,
  initPreContext,
} from '@dcloudio/uni-cli-shared'

import { createConfig } from './config'
import { createConfigResolved } from './configResolved'
import { createConfigureServer } from './configureServer'
import { uniCopyPlugin } from './plugins/copy'
import { initExtraPlugins, initPluginUniOptions } from './utils'
import {
  initPluginViteLegacyOptions,
  initPluginVueJsxOptions,
  initPluginVueOptions,
} from './vue'
// import { createResolveId } from './resolveId'

const debugUni = debug('vite:uni:plugin')

const pkg = require('@dcloudio/vite-plugin-uni/package.json')

initModuleAlias()

process.env.UNI_COMPILER_VERSION = pkg['uni-app']?.['compilerVersion'] || ''

export interface VitePluginUniOptions {
  inputDir?: string
  outputDir?: string
  vueOptions?: VueOptions
  vueJsxOptions?: VueJSXPluginOptions | boolean
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

let createViteLegacyPlugin: typeof ViteLegacyPlugin | undefined
try {
  createViteLegacyPlugin = require('@vitejs/plugin-legacy')
} catch (e) {}

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

  initPreContext(options.platform)

  const plugins: Plugin[] = []

  if (createViteLegacyPlugin && options.viteLegacyOptions) {
    plugins.push(
      ...(createViteLegacyPlugin(
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
      require('../lib/plugin-vue-jsx/index')(
        initPluginVueJsxOptions(options, uniPluginOptions.compilerOptions)
      )
    )
  }

  plugins.push({
    name: 'vite:uni',
    config: createConfig(options, uniPlugins),
    // resolveId: createResolveId(options),
    configResolved: createConfigResolved(options),
    configureServer: createConfigureServer(options),
  })
  plugins.push(...uniPlugins)

  plugins.unshift(
    vuePlugin(initPluginVueOptions(options, uniPlugins, uniPluginOptions))
  )

  plugins.push(
    uniCopyPlugin({
      outputDir: process.env.UNI_OUTPUT_DIR,
      copyOptions: options.copyOptions,
    })
  )

  return plugins
}
