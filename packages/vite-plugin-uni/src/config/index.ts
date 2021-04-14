import fs from 'fs'
import path from 'path'
import { parse } from 'jsonc-parser'

import { Plugin } from 'vite'

import { VitePluginUniResolvedOptions } from '..'
import { createCss } from './css'
import { createResolve } from './resolve'
import { createDefine } from './define'
import { createServer } from './server'
import { createBuild } from './build'
import { createOptimizeDeps } from './optimizeDeps'
function resolveBase(inputDir: string) {
  const manifest = parse(
    fs.readFileSync(path.join(inputDir, 'manifest.json'), 'utf8')
  )
  return (manifest.h5 && manifest.h5.router && manifest.h5.router.base) || '/'
}
export function createConfig(
  options: VitePluginUniResolvedOptions
): Plugin['config'] {
  return (config, env) => {
    const root = config.root || process.cwd()
    const inputDir = process.env.UNI_INPUT_DIR || path.resolve(root, 'src')
    const outputDir = process.env.UNI_OUTPUT_DIR || path.resolve(root, 'dist')
    options.root = root
    options.base = resolveBase(inputDir)
    options.inputDir = inputDir
    options.outputDir = outputDir
    options.command = env.command
    return {
      base: options.base,
      define: createDefine(options, env),
      resolve: createResolve(options),
      optimizeDeps: createOptimizeDeps(options),
      server: createServer(options),
      build: createBuild(options),
      css: createCss(options),
    }
  }
}
