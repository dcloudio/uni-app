import { ViteDevServer } from 'vite'

import { initEasycoms } from '../utils'

export const serveEasycom = (server: ViteDevServer) => {
  const { dirs, refresh } = initEasycoms(server.config.root)
  server.watcher.on('all', (eventName, path) => {
    if (!['add', 'unlink'].includes(eventName)) {
      return
    }
    if (dirs.find((dir) => path.startsWith(dir))) {
      refresh()
    }
  })
}
