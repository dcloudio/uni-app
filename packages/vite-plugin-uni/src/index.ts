import fs from 'fs'
import path from 'path'
import { parse } from 'jsonc-parser'

import { Plugin, ViteDevServer } from 'vite'

import { initEnv } from './env'
import { createConfig } from './config'
import { createResolveId } from './resolveId'
import { createConfigResolved } from './configResolved'
import { createConfigureServer } from './configureServer'
export interface VitePluginUniOptions {
  inputDir?: string
  feature?: {
    promise: boolean
  }
}
export interface VitePluginUniResolvedOptions extends VitePluginUniOptions {
  root: string
  base: string
  inputDir: string
  assetsDir: string
  devServer?: ViteDevServer
}

export * from './vue'

function resolveBase(inputDir: string) {
  const manifest = parse(
    fs.readFileSync(path.join(inputDir, 'manifest.json'), 'utf8')
  )
  return (manifest.h5 && manifest.h5.router && manifest.h5.router.base) || '/'
}

export default function uniPlugin(
  rawOptions: VitePluginUniOptions = {}
): Plugin {
  const inputDir = rawOptions.inputDir || path.resolve(process.cwd(), 'src')
  const options: VitePluginUniResolvedOptions = {
    ...rawOptions,
    root: process.cwd(),
    base: resolveBase(inputDir),
    assetsDir: 'assets',
    inputDir,
  }
  initEnv(options)
  return {
    name: 'vite:uni',
    config: createConfig(options),
    configResolved: createConfigResolved(options),
    configureServer: createConfigureServer(options),
    resolveId: createResolveId(options),
  }
}
