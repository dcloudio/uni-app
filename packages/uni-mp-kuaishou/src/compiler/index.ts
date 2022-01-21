import type { Plugin } from 'vite'
import { ASSETS_INLINE_LIMIT } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'
import { options } from './options'

const uniMiniProgramKuaishouPlugin: Plugin = {
  name: 'uni:mp-kuaishou',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
      build: {
        // css 中不支持引用本地资源
        assetsInlineLimit: ASSETS_INLINE_LIMIT,
      },
    }
  },
}

export default [uniMiniProgramKuaishouPlugin, ...initMiniProgramPlugin(options)]
