import {
  initPostcssPlugin,
  parseRpx2UnitOnce,
  UniVitePlugin,
} from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { configResolved } from './configResolved'

export function uniAppPlugin(): UniVitePlugin {
  return {
    name: 'vite:uni-app',
    uni: uniOptions(),
    config(config, env) {
      return {
        base: '/', // app 平台强制 base
        css: {
          postcss: {
            plugins: initPostcssPlugin({
              uniApp: parseRpx2UnitOnce(
                process.env.UNI_INPUT_DIR,
                process.env.UNI_PLATFORM
              ),
            }),
          },
        },
        build: buildOptions(config, env),
      }
    },
    configResolved,
  }
}
