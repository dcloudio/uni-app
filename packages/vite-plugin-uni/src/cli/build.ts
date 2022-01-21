import path from 'path'
import fs from 'fs-extra'
import { build as buildByVite, BuildOptions, InlineConfig } from 'vite'
import { extend } from '@vue/shared'
import {
  initPreContext,
  normalizeAppManifestJson,
  parseManifestJsonOnce,
  parsePagesJsonOnce,
} from '@dcloudio/uni-cli-shared'
import { CliOptions } from '.'
import { addConfigFile, cleanOptions } from './utils'

export async function build(options: CliOptions) {
  if (options.platform === 'app') {
    if ((options as BuildOptions).manifest) {
      return buildManifestJson()
    }
    if (process.env.UNI_RENDERER === 'native') {
      return buildByVite(
        addConfigFile(
          extend(
            { nvue: true },
            initBuildOptions(options, cleanOptions(options) as BuildOptions)
          )
        )
      )
    }
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
