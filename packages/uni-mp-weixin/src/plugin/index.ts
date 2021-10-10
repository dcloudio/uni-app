import { Plugin } from 'vite'
import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'

const uniMiniProgramWeixinPlugin: Plugin = {
  name: 'vite:uni-mp-weixin',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: JSON.stringify('false'),
      },
    }
  },
}

export default [
  uniMiniProgramWeixinPlugin,
  ...initMiniProgramPlugin({
    global: 'wx',
    alias: {
      'uni-mp-runtime': resolveBuiltIn(
        '@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js'
      ),
    },
  }),
]
