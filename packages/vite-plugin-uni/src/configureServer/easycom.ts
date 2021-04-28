import { ViteDevServer } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { debugEasycom, initEasycoms } from '../utils'

function debounce(fn: Function, wait: number) {
  let timeout = 0
  return () => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}

export const serveEasycom = (
  server: ViteDevServer,
  options: VitePluginUniResolvedOptions
) => {
  const { filter, refresh } = initEasycoms(options.inputDir)
  const refreshEasycom = debounce(refresh, 100)
  server.watcher.on('all', (eventName, path) => {
    if (!['add', 'unlink'].includes(eventName)) {
      return
    }
    debugEasycom('watch', eventName, path)
    if (filter(path)) {
      refreshEasycom()
    }
  })
}
