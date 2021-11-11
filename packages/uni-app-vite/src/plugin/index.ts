import { UniVitePlugin } from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { configResolved } from './configResolved'

export function uniAppPlugin(): UniVitePlugin {
  return {
    name: 'vite:uni-app',
    uni: uniOptions(),
    config(_, env) {
      return {
        build: buildOptions(env),
      }
    },
    configResolved,
  }
}
