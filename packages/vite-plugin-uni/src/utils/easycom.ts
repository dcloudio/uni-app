import path from 'path'

import { initEasycom } from '@dcloudio/uni-cli-shared'

export function initEasycoms(root: string) {
  const rootDir = path.resolve(root, 'src')
  const dirs = ['components'].map((dir) => path.resolve(rootDir, dir))
  const easycomOptions = { dirs, rootDir: rootDir }
  initEasycom(easycomOptions)
  return {
    dirs,
    refresh() {
      initEasycom(easycomOptions)
    },
  }
}
