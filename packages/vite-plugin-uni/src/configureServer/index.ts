import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { serveEasycom } from './easycom'

export function createConfigureServer(
  options: VitePluginUniResolvedOptions
): Plugin['configureServer'] {
  return function (server) {
    options.devServer = server
    serveEasycom(server, options)
  }
}
