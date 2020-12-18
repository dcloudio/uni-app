import path from 'path'

import { ServerPlugin } from 'vite'

import { initEasycom } from '@dcloudio/uni-cli-shared'

export const serverPluginEnv: ServerPlugin = ({ root, watcher }) => {
  const rootDir = path.resolve(root, 'src')
  const dirs = ['components'].map(dir => path.resolve(rootDir, dir))
  const easycomOptions = { dirs, rootDir: rootDir }

  initEasycom(easycomOptions)

  watcher.on('all', (eventName, path) => {
    if (!['add', 'unlink'].includes(eventName)) {
      return
    }
    if (dirs.find(dir => path.startsWith(dir))) {
      initEasycom(easycomOptions)
    }
  })
}
