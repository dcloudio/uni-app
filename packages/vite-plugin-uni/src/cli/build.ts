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

export async function buildSSR(options: CliOptions) {}
