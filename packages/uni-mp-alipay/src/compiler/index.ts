import type { Plugin } from 'vite'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

import { options } from './options'

const uniMiniProgramAlipayPlugin: Plugin = {
  name: 'uni:mp-alipay',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
      build: {
        assetsInlineLimit: 0,
        terserOptions: {
          compress: false,
          mangle: false,
        },
      },
    }
  },
}

export default [uniMiniProgramAlipayPlugin, ...initMiniProgramPlugin(options)]
