import { Plugin } from 'vite'
import { ASSETS_INLINE_LIMIT } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

import { options } from './options'

const uniMiniProgramToutiaoPlugin: Plugin = {
  name: 'uni:mp-toutiao',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: true,
      },
      build: {
        assetsInlineLimit: ASSETS_INLINE_LIMIT,
      },
    }
  },
}

export default [uniMiniProgramToutiaoPlugin, ...initMiniProgramPlugin(options)]
