import fs from 'fs-extra'
import path from 'path'
import { build as buildByVite, BuildOptions } from 'vite'
import { CliOptions } from '.'
import { cleanOptions } from './utils'

export async function build(options: CliOptions) {
  await buildByVite({
    root: process.env.VITE_ROOT_DIR,
    logLevel: options.logLevel,
    clearScreen: options.clearScreen,
    build: cleanOptions(options) as BuildOptions,
  })
}

export async function buildSSR(options: CliOptions) {
  const outputDir = process.env.UNI_OUTPUT_DIR
  const ssrClientDir = path.resolve(outputDir, 'client')
  process.env.UNI_OUTPUT_DIR = ssrClientDir
  const ssrBuildClientOptions: BuildOptions = cleanOptions(options)
  ssrBuildClientOptions.ssrManifest = true
  ssrBuildClientOptions.outDir = process.env.UNI_OUTPUT_DIR
  process.env.UNI_SSR_CLIENT = 'true'
  await buildByVite({
    root: process.env.VITE_ROOT_DIR,
    logLevel: options.logLevel,
    clearScreen: options.clearScreen,
    build: ssrBuildClientOptions,
  })
  const ssrServerDir = path.resolve(outputDir, 'server')
  process.env.UNI_OUTPUT_DIR = ssrServerDir
  const ssrBuildServerOptions: BuildOptions = cleanOptions(options)
  ssrBuildServerOptions.ssr = path.resolve(
    process.env.UNI_INPUT_DIR,
    'entry-server.js'
  )
  ssrBuildServerOptions.outDir = process.env.UNI_OUTPUT_DIR
  ssrBuildServerOptions.rollupOptions = {
    onwarn(warning, warn) {
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
        const { message } = warning
        // ignore
        if (message.includes('"resolveComponent"')) {
          return
        }
      }
      warn(warning)
    },
  }
  process.env.UNI_SSR_CLIENT = ''
  process.env.UNI_SSR_SERVER = 'true'
  await buildByVite({
    root: process.env.VITE_ROOT_DIR,
    logLevel: options.logLevel,
    clearScreen: options.clearScreen,
    build: ssrBuildServerOptions,
  })
  // copy ssr-manfiest.json to server
  const ssrManifestFile = path.join(ssrClientDir, 'ssr-manifest.json')
  if (fs.existsSync(ssrManifestFile)) {
    fs.copyFileSync(
      ssrManifestFile,
      path.join(ssrServerDir, 'ssr-manifest.json')
    )
  }
}
