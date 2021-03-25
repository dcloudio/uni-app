import fs from 'fs'
import path from 'path'
import { parse } from 'jsonc-parser'

import { Plugin, ResolvedConfig, ViteDevServer } from 'vite'

import { initEnv } from './env'
import { createConfig } from './config'
import { createResolveId } from './resolveId'
import { createConfigResolved } from './configResolved'
import { createConfigureServer } from './configureServer'
import { createHandleHotUpdate } from './handleHotUpdate'
export interface VitePluginUniOptions {
  inputDir?: string
}
export interface VitePluginUniResolvedOptions extends VitePluginUniOptions {
  root: string
  base: string
  command: ResolvedConfig['command']
  platform: UniApp.PLATFORM
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
    command: 'serve',
    platform: 'h5',
  }
  initEnv(options)
  return {
    name: 'vite:uni',
    config: createConfig(options),
    configResolved: createConfigResolved(options),
    configureServer: createConfigureServer(options),
    resolveId: createResolveId(options),
    handleHotUpdate: createHandleHotUpdate(options),
  }
}
