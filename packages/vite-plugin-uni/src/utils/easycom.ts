import debug from 'debug'
import type { FSWatcher } from 'chokidar'
import { debounce } from '@dcloudio/uni-shared'
import {
  chokidar,
  initEasycomsOnce,
  normalizePath,
  resolveComponentsLibDirs,
} from '@dcloudio/uni-cli-shared'

const debugEasycom = debug('uni:easycom')
export const initEasycom = (watcher?: FSWatcher) => {
  const { filter, refresh, options } = initEasycomsOnce(
    process.env.UNI_INPUT_DIR,
    {
      dirs: resolveComponentsLibDirs(),
      platform: process.env.UNI_PLATFORM,
      isX: process.env.UNI_APP_X === 'true',
    }
  )
  if (!watcher) {
    // build 模式，手动初始化 watcher
    const dirs = options.dirs!.concat([
      normalizePath(process.env.UNI_INPUT_DIR + '/uni_modules'),
    ])
    debugEasycom('initWatch', dirs)
    watcher = chokidar.watch(dirs, {
      ignored: ['**/node_modules/**', '**/.git/**'],
      ignoreInitial: true,
      ignorePermissionErrors: true,
      disableGlobbing: true,
    })
  }
  const refreshEasycom = debounce(refresh, 100, { setTimeout, clearTimeout })
  watcher.on('all', (eventName, path) => {
    if (!['add', 'unlink'].includes(eventName)) {
      return
    }
    if (filter(path)) {
      debugEasycom('watch', eventName, path)
      refreshEasycom()
    }
  })
}
