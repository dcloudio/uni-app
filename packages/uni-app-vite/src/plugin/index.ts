import { UniVitePlugin } from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { configResolved } from './configResolved'

export const UniAppPlugin: UniVitePlugin = {
  name: 'vite:uni-app',
  uni: uniOptions(),
  config() {
    return {
      build: buildOptions(),
    }
  },
  configResolved,
  // resolveId(id) {
  //   if (id === 'vue') {
  //     return resolveBuiltIn('@dcloudio/uni-app-vue')
  //   }
  // },
}
