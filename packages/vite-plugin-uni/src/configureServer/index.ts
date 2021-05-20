import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { serveEasycom } from './easycom'
import { serveStatic } from './static'

export function createConfigureServer(
  options: VitePluginUniResolvedOptions
): Plugin['configureServer'] {
  return function (server) {
    options.devServer = server
    serveEasycom(server, options)
    return () => {
      serveStatic(server, options)
    }
  }
}
