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
    server.httpServer!.on('listening', () => {
      process.nextTick(() => options.compiler.done())
    })
    return () => {
      serveStatic(server, options)
    }
  }
}
