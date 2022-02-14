import { UniVitePlugin } from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'

export function uniAppPlugin({
  renderer,
}: {
  renderer?: 'native'
} = {}): UniVitePlugin {
  return {
    name: 'uni:app',
    uni: uniOptions(),
    config(config, env) {
      return {
        build: buildOptions(renderer, config, env),
      }
    },
  }
}
