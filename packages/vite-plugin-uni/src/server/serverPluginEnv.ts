import { ServerPlugin } from 'vite'

import { initEasycoms } from '../utils/easycomUtils'

export const serverPluginEnv: ServerPlugin = ({ root, watcher }) => {
  const { dirs, refresh } = initEasycoms(root)
  watcher.on('all', (eventName, path) => {
    if (!['add', 'unlink'].includes(eventName)) {
      return
    }
    if (dirs.find(dir => path.startsWith(dir))) {
      refresh()
    }
  })
}
