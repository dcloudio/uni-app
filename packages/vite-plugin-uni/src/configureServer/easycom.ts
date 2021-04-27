import { ViteDevServer } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { initEasycoms } from '../utils'

export const serveEasycom = (
  server: ViteDevServer,
  options: VitePluginUniResolvedOptions
) => {
  const { dirs, refresh } = initEasycoms(options.inputDir)
  server.watcher.on('all', (eventName, path) => {
    if (!['add', 'unlink'].includes(eventName)) {
      return
    }
    if (dirs.find((dir) => path.startsWith(dir))) {
      refresh()
    }
  })
}
