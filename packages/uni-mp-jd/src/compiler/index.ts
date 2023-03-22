import type { Plugin } from 'vite'
import { ASSETS_INLINE_LIMIT } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'
import { options } from './options'

const uniMiniProgramJdPlugin: Plugin = {
  name: 'uni:mp-jd',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
      build: {
        // 图片资源转行内base64最大size限制
        assetsInlineLimit: ASSETS_INLINE_LIMIT,
      },
    }
  },
}

export default [uniMiniProgramJdPlugin, ...initMiniProgramPlugin(options)]
