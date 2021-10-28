import { Plugin } from 'vite'

import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'
import { options } from './options'

const uniMiniProgramWeixinPlugin: Plugin = {
  name: 'vite:uni-mp-weixin',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
      build: {
        // css 中不支持引用本地资源
        assetsInlineLimit: 40 * 1024, // 40kb
      },
    }
  },
}

export default [uniMiniProgramWeixinPlugin, ...initMiniProgramPlugin(options)]
