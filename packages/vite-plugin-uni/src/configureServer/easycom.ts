import debug from 'debug'
import { ViteDevServer } from 'vite'
import { debounce } from '@dcloudio/uni-shared'
import { initEasycomsOnce } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

const debugEasycom = debug('vite:uni:easycom')
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
