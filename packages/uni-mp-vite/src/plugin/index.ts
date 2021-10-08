import { resolveBuiltIn, UniVitePlugin } from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { configResolved } from './configResolved'

export const UniMpPlugin: UniVitePlugin = {
  name: 'vite:uni-mp',
  uni: uniOptions(),
  config() {
    return {
      resolve: {
        alias: {
          vue: resolveBuiltIn('@dcloudio/uni-mp-vue'),
        },
      },
      build: buildOptions(),
    }
  },
  configResolved,
}
