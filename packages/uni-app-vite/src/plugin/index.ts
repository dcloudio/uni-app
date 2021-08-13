import { M, UniVitePlugin } from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { configResolved } from './configResolved'

export const UniAppPlugin: UniVitePlugin = {
  name: 'vite:uni-app',
  uni: uniOptions(),
  config() {
    const pkg = require('@dcloudio/vite-plugin-uni/package.json')
    console.log(
      M['app.compiler.version'].replace(
        '{version}',
        pkg['uni-app']['compilerVersion'] + '（vue3）'
      )
    )
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
