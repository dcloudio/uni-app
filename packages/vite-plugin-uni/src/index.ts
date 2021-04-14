import { Plugin, ResolvedConfig, ViteDevServer } from 'vite'

import { initEnv } from './env'
import { createConfig } from './config'
import { createResolveId } from './resolveId'
import { createConfigResolved } from './configResolved'
import { createConfigureServer } from './configureServer'
import { createHandleHotUpdate } from './handleHotUpdate'
export interface VitePluginUniOptions {
  inputDir?: string
  outputDir?: string
}
export interface VitePluginUniResolvedOptions extends VitePluginUniOptions {
  root: string
  base: string
  command: ResolvedConfig['command']
  platform: UniApp.PLATFORM
  inputDir: string
  outputDir: string
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
    base: '/',
    assetsDir: 'assets',
    inputDir: '',
    outputDir: '',
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
