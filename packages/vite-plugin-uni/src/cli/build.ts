import path from 'path'
import fs from 'fs-extra'
import type { BuildOptions, InlineConfig, ServerOptions } from 'vite'
import { extend } from '@vue/shared'
import {
  isNormalCompileTarget,
  normalizeAppManifestJson,
  parseManifestJsonOnce,
  parsePagesJsonOnce,
} from '@dcloudio/uni-cli-shared'
import type { CliOptions } from '.'
import { addConfigFile, cleanOptions } from './utils'
import type { RollupWatcher, RollupWatcherEvent } from 'rollup'

export async function buildByVite(inlineConfig: InlineConfig) {
  return import('vite').then(({ build }) => build(inlineConfig))
}

export async function build(
  options: CliOptions,
  callback?: (event: RollupWatcherEvent) => void
): Promise<void> {
  if (process.env.UNI_APP_X !== 'true' && options.platform === 'app') {
    await buildApp(options, callback)
    return
  }
  const watcher = await buildByVite(
    addConfigFile(
      initBuildOptions(options, cleanOptions(options) as BuildOptions)
    )
  )
  if (callback && typeof watcher === 'object' && 'on' in watcher) {
    watcher.on('event', callback)
  }
}

export async function buildSSR(options: CliOptions) {
  const outputDir = process.env.UNI_OUTPUT_DIR
  const ssrClientDir = path.resolve(outputDir, 'client')
  process.env.UNI_OUTPUT_DIR = ssrClientDir
  const ssrBuildClientOptions: BuildOptions = cleanOptions(options)
  ssrBuildClientOptions.ssrManifest = 'ssr-manifest.json'
  ssrBuildClientOptions.outDir = process.env.UNI_OUTPUT_DIR
  process.env.UNI_SSR_CLIENT = 'true'
  await buildByVite(
    addConfigFile(initBuildOptions(options, ssrBuildClientOptions))
  )
  const ssrServerDir = path.resolve(outputDir, 'server')
  process.env.UNI_OUTPUT_DIR = ssrServerDir
  const ssrBuildServerOptions: BuildOptions = cleanOptions(options)
  ssrBuildServerOptions.ssr = path.resolve(
    process.env.UNI_INPUT_DIR,
    'entry-server.js'
  )
  // 强制 cjs 输出
  ssrBuildServerOptions.rollupOptions = {
    output: {
      format: 'cjs',
    },
  }
  ssrBuildServerOptions.outDir = process.env.UNI_OUTPUT_DIR
  process.env.UNI_SSR_CLIENT = ''
  process.env.UNI_SSR_SERVER = 'true'
  await buildByVite(
    addConfigFile(initBuildOptions(options, ssrBuildServerOptions))
  )
  // copy ssr-manfiest.json to server
  const assets = ['ssr-manifest.json', 'index.html']
  assets.forEach((asset) => {
    const ssrManifestFile = path.join(ssrClientDir, asset)
    if (fs.existsSync(ssrManifestFile)) {
      fs.copyFileSync(ssrManifestFile, path.join(ssrServerDir, asset))
    }
  })
}

export function initBuildOptions(
  options: CliOptions,
  build: BuildOptions
): InlineConfig {
  return {
    root: process.env.VITE_ROOT_DIR,
    configFile: options.config,
    base: options.base,
    logLevel: options.logLevel,
    clearScreen: options.clearScreen,
    mode: options.mode,
    build,
  }
}

function buildManifestJson() {
  const platform = 'app'
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR

  const pkg = require(path.resolve(__dirname, '../../package.json'))
  process.env.UNI_COMPILER_VERSION =
    process.env.UNI_COMPILER_VERSION ||
    pkg['uni-app']?.['compilerVersion'] ||
    ''

  const manifestJson = normalizeAppManifestJson(
    parseManifestJsonOnce(inputDir),
    parsePagesJsonOnce(inputDir, platform)
  )
  fs.outputFileSync(
    path.resolve(outputDir, 'manifest.json'),
    JSON.stringify(manifestJson, null, 2)
  )
}

async function buildApp(
  options: CliOptions,
  callback?: (event: RollupWatcherEvent) => void
): Promise<RollupWatcher | void> {
  if ((options as BuildOptions).manifest) {
    return buildManifestJson()
  }
  let appWatcher: AppWatcher | undefined
  if ((options as ServerOptions).watch) {
    appWatcher = new AppWatcher()
    if (callback) {
      appWatcher.on('event', callback)
    }
  }
  if (process.env.UNI_RENDERER === 'native') {
    // 纯原生渲染时，main.js + App.vue 需要跟页面分开，独立编译（因为需要包含 Vuex 等共享内容）
    process.env.UNI_COMPILER = 'nvue'
    process.env.UNI_RENDERER_NATIVE = 'appService'
    const nvueAppBuilder = await buildByVite(
      addConfigFile(
        extend(
          { nvueAppService: true, nvue: true },
          initBuildOptions(options, cleanOptions(options) as BuildOptions)
        )
      )
    )
    if (appWatcher) {
      appWatcher.setFirstWatcher(nvueAppBuilder as RollupWatcher)
    }

    process.env.UNI_RENDERER_NATIVE = 'pages'
    const nvueBuilder = await buildByVite(
      addConfigFile(
        extend(
          { nvue: true },
          initBuildOptions(options, cleanOptions(options) as BuildOptions)
        )
      )
    )
    if (appWatcher) {
      appWatcher.setSecondWatcher(nvueBuilder as RollupWatcher)
      return appWatcher as unknown as RollupWatcher
    }
    return
  }
  // 指定为 vue 方便 App 插件初始化 vue 所需插件列表
  process.env.UNI_COMPILER = 'vue'
  const vueBuilder = await buildByVite(
    addConfigFile(
      initBuildOptions(options, cleanOptions(options) as BuildOptions)
    )
  )
  if (!isNormalCompileTarget()) {
    // 不需要 nvue 编译器
    return vueBuilder as RollupWatcher
  }
  if (appWatcher) {
    appWatcher.setFirstWatcher(vueBuilder as RollupWatcher)
  }
  // 临时指定为 nvue 方便 App 插件初始化 nvue 所需插件列表
  process.env.UNI_COMPILER = 'nvue'
  const nvueBuilder = await buildByVite(
    addConfigFile(
      extend(
        { nvue: true },
        initBuildOptions(options, cleanOptions(options) as BuildOptions)
      )
    )
  )
  // 还原为 vue
  process.env.UNI_COMPILER = 'vue'

  if (appWatcher) {
    appWatcher.setSecondWatcher(nvueBuilder as RollupWatcher)
    return appWatcher as unknown as RollupWatcher
  }
}

class AppWatcher {
  private _firstStart: boolean = false
  private _firstEnd: boolean = false
  private _secondStart: boolean = false
  private _secondEnd: boolean = false
  private _callback: ((event: RollupWatcherEvent) => void) | undefined
  on(_event: string, callback: (event: RollupWatcherEvent) => void) {
    this._callback = callback
  }
  setFirstWatcher(firstWatcher: RollupWatcher) {
    firstWatcher.on('event', (event) => {
      if (event.code === 'BUNDLE_START') {
        this._bundleFirstStart(event)
      } else if (event.code === 'BUNDLE_END') {
        this._bundleFirstEnd(event)
      } else if (event.code === 'ERROR') {
        this._callback?.(event)
      }
    })
  }
  setSecondWatcher(secondWatcher: RollupWatcher) {
    secondWatcher.on('event', (event) => {
      if (event.code === 'BUNDLE_START') {
        this._bundleSecondStart(event)
      } else if (event.code === 'BUNDLE_END') {
        this._bundleSecondEnd(event)
      } else {
        // 其他事件直接触发
        this._callback?.(event)
      }
    })
  }
  _bundleFirstStart(event: RollupWatcherEvent) {
    this._firstStart = true
    this._bundleStart(event)
  }
  _bundleFirstEnd(event: RollupWatcherEvent) {
    this._firstEnd = true
    this._bundleEnd(event)
  }
  _bundleSecondStart(event: RollupWatcherEvent) {
    this._secondStart = true
    this._bundleStart(event)
  }
  _bundleSecondEnd(event: RollupWatcherEvent) {
    this._secondEnd = true
    this._bundleEnd(event)
  }
  _bundleStart(event: RollupWatcherEvent) {
    if (this._firstStart && this._secondStart) {
      this._callback?.(event)
    }
  }
  _bundleEnd(event: RollupWatcherEvent) {
    if (this._firstEnd && this._secondEnd) {
      this._callback?.(event)
    }
  }
}
