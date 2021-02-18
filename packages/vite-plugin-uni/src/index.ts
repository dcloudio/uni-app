import path from 'path'

import { Plugin, ViteDevServer } from 'vite'

import { initEnv } from './env'
import { createLoad } from './load'
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
  inputDir: string
  assetsDir: string
  devServer?: ViteDevServer
}

export * from './vue'

export default function uniPlugin(
  rawOptions: VitePluginUniOptions = {}
): Plugin {
  const options: VitePluginUniResolvedOptions = {
    ...rawOptions,
    root: process.cwd(),
    assetsDir: 'assets',
    inputDir: rawOptions.inputDir || path.resolve(process.cwd(), 'src'),
  }
  initEnv(options)
  return {
    name: 'vite:uni',
    config: createConfig(options),
    configResolved: createConfigResolved(options),
    configureServer: createConfigureServer(options),
    resolveId: createResolveId(options),
    load: createLoad(options),
  }
}
