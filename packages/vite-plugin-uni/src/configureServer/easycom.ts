import path from 'path'
import debug from 'debug'
import { ViteDevServer } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

const { initEasycom } = require('@dcloudio/uni-cli-shared')

const debugEasycom = debug('uni:easycom')

export function initEasycoms(inputDir: string) {
  const dirs = ['components'].map((dir) => path.resolve(inputDir, dir))
  const easycomOptions = { dirs, rootDir: inputDir }
  initEasycom(easycomOptions)
  debugEasycom(easycomOptions)
  return {
    dirs,
    refresh() {
      initEasycom(easycomOptions)
    },
  }
}

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
