import { Plugin } from 'vite'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

import { options } from './options'

const uniMiniProgramToutiaoPlugin: Plugin = {
  name: 'vite:uni-mp-toutiao',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: true,
      },
      build: {
        // 头条支持本地资源
        assetsInlineLimit: 0,
      },
    }
  },
}

export default [uniMiniProgramToutiaoPlugin, ...initMiniProgramPlugin(options)]
