import path from 'path'

import { ServerPlugin } from 'vite'

import { initEasycom } from '@dcloudio/uni-cli-shared'

export const serverPluginEnv: ServerPlugin = ({ root }) => {
  if (process.env.UNI_INPUT_DIR) {
    process.env.UNI_INPUT_DIR = path.resolve(root, 'src')
  }
  initEasycom({ dirs: ['components'], rootDir: path.resolve(root, 'src') })
}
