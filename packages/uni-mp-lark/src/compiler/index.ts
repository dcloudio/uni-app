import { Plugin } from 'vite'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

import { ASSETS_INLINE_LIMIT } from '@dcloudio/uni-cli-shared'
import { options } from '@dcloudio/uni-mp-toutiao/src/compiler/options'

const uniMiniProgramToutiaoPlugin: Plugin = {
  name: 'vite:uni-mp-lark',
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

options.template.slot.fallbackContent = false

export default [uniMiniProgramToutiaoPlugin, ...initMiniProgramPlugin(options)]
