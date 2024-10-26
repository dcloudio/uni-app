import type { Plugin } from 'vite'
import { ASSETS_INLINE_LIMIT } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'
import { options } from './options'

const uniMiniProgramHarmonyPlugin: Plugin = {
  name: 'uni:mp-harmony',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: true,
      },
      build: {
        // css 中不支持引用本地资源
        assetsInlineLimit: ASSETS_INLINE_LIMIT,
      },
    }
  },
}

export default [uniMiniProgramHarmonyPlugin, ...initMiniProgramPlugin(options)]
