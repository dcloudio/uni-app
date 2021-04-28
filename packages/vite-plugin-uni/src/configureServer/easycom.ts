import { ViteDevServer } from 'vite'
import { debounce } from '@dcloudio/uni-shared'
import { VitePluginUniResolvedOptions } from '..'
import { debugEasycom, initEasycomsOnce } from '../utils'

export const serveEasycom = (
  server: ViteDevServer,
  options: VitePluginUniResolvedOptions
) => {
  const { filter, refresh } = initEasycomsOnce(
    options.inputDir,
    options.platform
  )
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
