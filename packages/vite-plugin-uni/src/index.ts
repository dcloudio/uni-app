import path from 'path'

import { Plugin, ViteDevServer } from 'vite'

import { createLoad } from './load'
import { createConfig } from './config'
import { createResolveId } from './resolveId'
import { createConfigResolved } from './configResolved'
import { createConfigureServer } from './configureServer'

const { vueCompilerOptions } = require('@dcloudio/uni-cli-shared')
export interface VitePluginUniOptions {
  inputDir?: string
}
export interface VitePluginUniResolvedOptions extends VitePluginUniOptions {
  root: string
  inputDir: string
  devServer?: ViteDevServer
}

export const uniVueCompilerOptions = vueCompilerOptions

export default function uniPlugin(
  rawOptions: VitePluginUniOptions = {}
): Plugin {
  const options: VitePluginUniResolvedOptions = {
    ...rawOptions,
    root: process.cwd(),
    inputDir: rawOptions.inputDir || path.resolve(process.cwd(), 'src'),
  }
  return {
    name: 'vite:uni',
    config: createConfig(options),
    configResolved: createConfigResolved(options),
    configureServer: createConfigureServer(options),
    resolveId: createResolveId(options),
    load: createLoad(options),
  }
}
