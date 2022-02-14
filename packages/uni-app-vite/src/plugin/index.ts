import { UniVitePlugin } from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'

export function uniAppPlugin(
  {
    renderer,
    appService,
  }: {
    renderer?: 'native'
    appService: boolean
  } = {
    appService: false,
  }
): UniVitePlugin {
  return {
    name: 'uni:app',
    uni: uniOptions(),
    config(config, env) {
      return {
        build: buildOptions({ renderer, appService }, config, env),
      }
    },
  }
}
