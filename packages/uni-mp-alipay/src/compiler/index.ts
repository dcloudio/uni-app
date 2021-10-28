import { Plugin } from 'vite'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

import { options } from './options'

const uniMiniProgramAlipayPlugin: Plugin = {
  name: 'vite:uni-mp-alipay',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
      build: {
        assetsInlineLimit: 0,
      },
    }
  },
}

export default [uniMiniProgramAlipayPlugin, ...initMiniProgramPlugin(options)]
