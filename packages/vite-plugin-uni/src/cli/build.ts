import path from 'path'
import fs from 'fs-extra'
import {
  build as buildByVite,
  BuildOptions,
  InlineConfig,
  ServerOptions,
} from 'vite'
import { extend } from '@vue/shared'
import {
  initPreContext,
  normalizeAppManifestJson,
  parseManifestJsonOnce,
  parsePagesJsonOnce,
} from '@dcloudio/uni-cli-shared'
import { CliOptions } from '.'
import { addConfigFile, cleanOptions } from './utils'
import { RollupWatcher, RollupWatcherEvent } from 'rollup'

export async function build(options: CliOptions) {
  if (options.platform === 'app') {
    return buildApp(options)
  }
  return buildByVite(
    addConfigFile(
      initBuildOptions(options, cleanOptions(options) as BuildOptions)
    )
  )
}

export async function buildSSR(options: CliOptions) {
  const outputDir = process.env.UNI_OUTPUT_DIR
  const ssrClientDir = path.resolve(outputDir, 'client')
  process.env.UNI_OUTPUT_DIR = ssrClientDir
  const ssrBuildClientOptions: BuildOptions = cleanOptions(options)
  ssrBuildClientOptions.ssrManifest = true
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

function initBuildOptions(
  options: CliOptions,
  build: BuildOptions
): InlineConfig {
  return {
    root: process.env.VITE_ROOT_DIR,
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
  process.env.UNI_COMPILER_VERSION = pkg['uni-app']?.['compilerVersion'] || ''
  initPreContext(platform)

  const manifestJson = normalizeAppManifestJson(
    parseManifestJsonOnce(inputDir),
    parsePagesJsonOnce(inputDir, platform)
  )
  fs.outputFileSync(
    path.resolve(outputDir, 'manifest.json'),
    JSON.stringify(manifestJson, null, 2)
  )
}

export async function buildApp(options: CliOptions) {
  if ((options as BuildOptions).manifest) {
    return buildManifestJson()
  }
  if (process.env.UNI_RENDERER === 'native') {
    process.env.UNI_COMPILER = 'nvue'
    return buildByVite(
      addConfigFile(
        extend(
          { nvue: true },
          initBuildOptions(options, cleanOptions(options) as BuildOptions)
        )
      )
    )
  }
  // 指定为 vue 方便 App 插件初始化 vue 所需插件列表
  process.env.UNI_COMPILER = 'vue'
  const vueBuilder = await buildByVite(
    addConfigFile(
      initBuildOptions(options, cleanOptions(options) as BuildOptions)
    )
  )
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

  if ((options as ServerOptions).watch) {
    return initAppWatcher(
      vueBuilder as RollupWatcher,
      nvueBuilder as RollupWatcher
    )
  }
}

class AppWatcher {
  private _vueStart: boolean = false
  private _vueEnd: boolean = false
  private _nvueStart: boolean = false
  private _nvueEnd: boolean = false
  private _callback!: (event: RollupWatcherEvent) => void
  on(callback: (event: RollupWatcherEvent) => void) {
    this._callback = callback
  }
  _bundleVueStart(event: RollupWatcherEvent) {
    this._vueStart = true
    this._bundleStart(event)
  }
  _bundleVueEnd(event: RollupWatcherEvent) {
    this._vueEnd = true
    this._bundleEnd(event)
  }
  _bundleNVueStart(event: RollupWatcherEvent) {
    this._nvueStart = true
    this._bundleStart(event)
  }
  _bundleNVueEnd(event: RollupWatcherEvent) {
    this._nvueEnd = true
    this._bundleEnd(event)
  }
  _bundleStart(event: RollupWatcherEvent) {
    if (this._vueStart && this._nvueStart) {
      this._callback(event)
    }
  }
  _bundleEnd(event: RollupWatcherEvent) {
    if (this._vueEnd && this._nvueEnd) {
      this._callback(event)
    }
  }
}

function initAppWatcher(vueWatcher: RollupWatcher, nvueWatcher: RollupWatcher) {
  const appWatcher = new AppWatcher()
  vueWatcher.on('event', (event) => {
    if (event.code === 'BUNDLE_START') {
      appWatcher._bundleVueStart(event)
    } else if (event.code === 'BUNDLE_END') {
      appWatcher._bundleVueEnd(event)
    }
  })
  nvueWatcher.on('event', (event) => {
    if (event.code === 'BUNDLE_START') {
      appWatcher._bundleNVueStart(event)
    } else if (event.code === 'BUNDLE_END') {
      appWatcher._bundleNVueEnd(event)
    }
  })
  return {
    on(_, fn) {
      appWatcher.on(fn as (event: RollupWatcherEvent) => void)
    },
  } as RollupWatcher
}
