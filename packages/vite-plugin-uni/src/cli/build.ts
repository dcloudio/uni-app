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
  process.env.UNI_OUTPUT_DIR = path.resolve(outputDir, 'client')
  const ssrBuildClientOptions: BuildOptions = cleanOptions(options)
  ssrBuildClientOptions.ssrManifest = true
  ssrBuildClientOptions.outDir = process.env.UNI_OUTPUT_DIR
  await buildByVite({
    root: process.env.VITE_ROOT_DIR,
    logLevel: options.logLevel,
    clearScreen: options.clearScreen,
    build: ssrBuildClientOptions,
  })
  process.env.UNI_OUTPUT_DIR = path.resolve(outputDir, 'server')
  const ssrBuildServerOptions: BuildOptions = cleanOptions(options)
  ssrBuildServerOptions.ssr = path.resolve(
    process.env.UNI_INPUT_DIR,
    'entry-server.js'
  )
  ssrBuildServerOptions.outDir = process.env.UNI_OUTPUT_DIR
  await buildByVite({
    root: process.env.VITE_ROOT_DIR,
    logLevel: options.logLevel,
    clearScreen: options.clearScreen,
    build: ssrBuildServerOptions,
  })
}
