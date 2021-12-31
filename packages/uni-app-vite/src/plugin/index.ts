import { UniVitePlugin } from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { configResolved } from './configResolved'

export function uniAppPlugin(): UniVitePlugin {
  return {
    name: 'vite:uni-app',
    uni: uniOptions(),
    config(config, env) {
      return {
        build: buildOptions(config, env),
      }
    },
    configResolved,
  }
}
